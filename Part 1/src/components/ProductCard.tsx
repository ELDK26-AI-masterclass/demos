import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-6 space-y-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Card>
    </Link>
  )
}
