'use server'

import { createHash, randomInt } from 'crypto'
import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'
import { normalizeNigerianPhone, sendSms } from '../../lib/termii'
import { verifyCac, verifyNin } from '../../lib/identity-verification'

const OTP_TTL_MINUTES = 10
const MAX_OTP_ATTEMPTS = 5

function hashCode(code: string) {
  return createHash('sha256').update(code).digest('hex')
}

async function getMerchant() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: merchant, error } = await supabase
    .from('merchants')
    .select('id, verification_status, phone, phone_verified_at')
    .eq('user_id', user.id)
    .single()

  if (error || !merchant) redirect('/login')
  return { supabase, merchant }
}

export async function requestPhoneOtp(prevState: { error?: string; sent?: boolean } | undefined, formData: FormData) {
  const { supabase, merchant } = await getMerchant()

  const rawPhone = formData.get('phone') as string
  let phone: string
  try {
    phone = normalizeNigerianPhone(rawPhone)
  } catch {
    return { error: 'Enter a valid Nigerian phone number.' }
  }

  const code = randomInt(100000, 999999).toString()
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000).toISOString()

  const { error: insertError } = await supabase.from('merchant_otps').insert({
    merchant_id: merchant.id,
    phone,
    code_hash: hashCode(code),
    expires_at: expiresAt,
  })

  if (insertError) {
    return { error: 'Could not start verification. Try again.' }
  }

  // Keep phone on the merchant row so the UI can prefill it, but not verified yet.
  await supabase.from('merchants').update({ phone }).eq('id', merchant.id)

  try {
    await sendSms(phone, `Your Bitvora Storefront verification code is ${code}. It expires in ${OTP_TTL_MINUTES} minutes.`)
  } catch {
    return { error: 'Could not send SMS right now. Try again in a moment.' }
  }

  return { sent: true }
}

export async function confirmPhoneOtp(prevState: { error?: string; verified?: boolean } | undefined, formData: FormData) {
  const { supabase, merchant } = await getMerchant()

  const code = (formData.get('code') as string || '').trim()
  if (!code) return { error: 'Enter the code we sent you.' }

  const { data: otpRow } = await supabase
    .from('merchant_otps')
    .select('*')
    .eq('merchant_id', merchant.id)
    .is('consumed_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!otpRow) return { error: 'No pending code found. Request a new one.' }

  if (new Date(otpRow.expires_at).getTime() < Date.now()) {
    return { error: 'That code expired. Request a new one.' }
  }

  if (otpRow.attempts >= MAX_OTP_ATTEMPTS) {
    return { error: 'Too many attempts. Request a new code.' }
  }

  if (hashCode(code) !== otpRow.code_hash) {
    await supabase.from('merchant_otps').update({ attempts: otpRow.attempts + 1 }).eq('id', otpRow.id)
    return { error: 'Incorrect code. Try again.' }
  }

  await supabase.from('merchant_otps').update({ consumed_at: new Date().toISOString() }).eq('id', otpRow.id)
  await supabase.from('merchants').update({ phone_verified_at: new Date().toISOString() }).eq('id', merchant.id)

  return { verified: true }
}

export async function submitIdentityVerification(
  prevState: { error?: string; result?: 'verified' | 'failed' } | undefined,
  formData: FormData
) {
  const { supabase, merchant } = await getMerchant()

  const type = formData.get('type') as 'nin' | 'cac'
  const reference = (formData.get('reference') as string || '').trim()
  const firstName = (formData.get('firstName') as string || '').trim()
  const lastName = (formData.get('lastName') as string || '').trim()
  const companyName = (formData.get('companyName') as string || '').trim()

  if (!reference) {
    return { error: type === 'nin' ? 'Enter your NIN.' : 'Enter your CAC (RC) number.' }
  }

  await supabase.from('merchants').update({
    verification_status: 'pending',
    verification_type: type,
    verification_reference: reference,
  }).eq('id', merchant.id)

  try {
    const result = type === 'nin'
      ? await verifyNin(reference, firstName, lastName)
      : await verifyCac(reference, companyName)

    await supabase.from('merchant_verifications').insert({
      merchant_id: merchant.id,
      type,
      reference,
      provider: 'qoreid',
      status: result.status,
      provider_response: result.providerResponse,
    })

    await supabase.from('merchants').update({
      verification_status: result.status,
      verified_at: result.status === 'verified' ? new Date().toISOString() : null,
    }).eq('id', merchant.id)

    if (result.status === 'failed') {
      return { error: 'We could not verify those details. Double-check them and try again.' }
    }

    return { result: 'verified' as const }
  } catch {
    await supabase.from('merchants').update({ verification_status: 'failed' }).eq('id', merchant.id)
    return { error: 'Verification service is unavailable right now. Try again shortly.' }
  }
}
