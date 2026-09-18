// Server-only. Never import this from a client component.
// Requires TERMII_API_KEY and TERMII_SENDER_ID in the environment (Vercel + .env.local).

const TERMII_BASE_URL = 'https://v3.api.termii.com/api'

function assertServerSide() {
  if (typeof window !== 'undefined') {
    throw new Error('termii.ts must only be called from server code')
  }
}

/**
 * Sends an SMS via Termii. Used for OTP delivery to Nigerian phone numbers.
 * Expects phone in international format, e.g. 2348012345678.
 */
export async function sendSms(phone: string, message: string) {
  assertServerSide()

  const apiKey = process.env.TERMII_API_KEY
  const senderId = process.env.TERMII_SENDER_ID

  if (!apiKey || !senderId) {
    throw new Error('Termii is not configured — set TERMII_API_KEY and TERMII_SENDER_ID')
  }

  const res = await fetch(`${TERMII_BASE_URL}/sms/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: phone,
      from: senderId,
      sms: message,
      type: 'plain',
      channel: 'generic',
      api_key: apiKey,
    }),
  })

  const data = await res.json()

  if (!res.ok || data?.code === 'error') {
    throw new Error(data?.message || 'Failed to send SMS via Termii')
  }

  return data
}

/**
 * Normalizes a Nigerian phone number to international format without the plus sign.
 * Accepts 080..., +234..., 234..., or 0234... inputs.
 */
export function normalizeNigerianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')

  if (digits.startsWith('234')) return digits
  if (digits.startsWith('0')) return `234${digits.slice(1)}`
  if (digits.length === 10) return `234${digits}`

  throw new Error('Enter a valid Nigerian phone number')
}
