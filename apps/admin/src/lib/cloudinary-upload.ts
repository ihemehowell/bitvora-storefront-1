export async function uploadToCloudinary(file: File): Promise<string> {
  const sigRes = await fetch('/api/cloudinary-signature', { method: 'POST' })
  const { signature, timestamp, cloudName, apiKey, folder } = await sigRes.json()

  const formData = new FormData()
  formData.append('file', file)
  formData.append('signature', signature)
  formData.append('timestamp', timestamp)
  formData.append('api_key', apiKey)
  formData.append('folder', folder)

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  )

  if (!uploadRes.ok) {
    throw new Error('Image upload failed')
  }

  const data = await uploadRes.json()
  return data.secure_url as string
}