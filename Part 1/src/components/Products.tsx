import { products } from '@/lib/products'
import { ProductCard } from '@/components/ProductCard'

export function Products() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Shop Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our curated selection of premium t-shirts. Each piece is crafted with care and designed for lasting style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
