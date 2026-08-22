'use client'

import { useState } from 'react'
import { uploadToCloudinary } from '../../../../lib/cloudinary-upload'


export function ImageUploader({ initialImages = [] }: { initialImages?: string[] }) {
  const [images, setImages] = useState<string[]>(initialImages)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError(null)

    try {
      const uploaded: string[] = []
      for (const file of Array.from(files)) {
        const url = await uploadToCloudinary(file)
        uploaded.push(url)
      }
      setImages((prev) => [...prev, ...uploaded])
    } catch {
      setError('Upload failed. Try again.')
    } finally {
      setUploading(false)
    }
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((img) => img !== url))
  }

  return (
    <div>
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      <label className="block text-sm font-medium mb-1">Product images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        disabled={uploading}
        className="w-full border rounded-md p-2 text-sm"
      />
      {uploading && <p className="text-sm text-gray-400 mt-1">Uploading...</p>}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-3">
          {images.map((url) => (
            <div key={url} className="relative">
              <img src={url} alt="" className="w-full h-20 object-cover rounded-md" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}