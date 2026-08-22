import { ProductForm } from "./ProductForm"


export default async function NewProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: storeId } = await params
  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-display mb-6">Add product</h1>
      <ProductForm storeId={storeId} />
    </div>
  )
}