import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProductById(id) : undefined
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Product not found</h2>
          <Link to="/products">
            <Button variant="outline">
              <ArrowLeft className="mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Please select a size')
      return
    }

    setIsAdding(true)
    
    setTimeout(() => {
      addToCart(product, selectedSize)
      toast.success(
        <div className="flex items-center gap-2">
          <Check weight="bold" size={20} />
          <span>Added to cart!</span>
        </div>,
        {
          description: `${product.name} - Size ${selectedSize}`
        }
      )
      setIsAdding(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 lg:px-8 py-8 lg:py-12">
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted ring-1 ring-border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg bg-muted ring-1 ring-border opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Select Size
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="Choose your size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size} className="text-base">
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base h-14"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>

            <div className="border-t border-border pt-8 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">🚚</span>
                <div>
                  <div className="font-semibold text-foreground">Free Shipping</div>
                  <div className="text-sm text-muted-foreground">On orders over $50</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">↩️</span>
                <div>
                  <div className="font-semibold text-foreground">Easy Returns</div>
                  <div className="text-sm text-muted-foreground">30-day return policy</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">✨</span>
                <div>
                  <div className="font-semibold text-foreground">Premium Quality</div>
                  <div className="text-sm text-muted-foreground">100% organic cotton</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
