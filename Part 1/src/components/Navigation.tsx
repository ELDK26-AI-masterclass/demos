import { Link } from 'react-router-dom'
import { ShoppingCart } from '@phosphor-icons/react'
import { useCart } from '@/lib/cart-context'
import { Badge } from '@/components/ui/badge'

export function Navigation() {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">Threadly</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              to="/products" 
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Shop
            </Link>
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <ShoppingCart size={24} className="text-foreground" />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
