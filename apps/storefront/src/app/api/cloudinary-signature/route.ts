import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { getClientIp, rateLimit } from '../../../lib/rate-limit'

export async function POST() {
  const rl = await rateLimit('cloudinary-sig', await getClientIp(), 10, '1 m')
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    )
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  const timestamp = Math.round(Date.now() / 1000)
  const folder = 'bitvora-storefront/payment-proofs'

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!
  )

  return NextResponse.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder,
  })
}