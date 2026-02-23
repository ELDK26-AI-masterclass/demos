import { createContext, useContext, ReactNode } from 'react'
import { useKV } from '@github/spark/hooks'
import { CartItem, Product } from '@/lib/types'

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, size: string) => void
  removeFromCart: (productId: string, size: string) => void
  clearCart: () => void
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useKV<CartItem[]>('cart-items', [])

  const addToCart = (product: Product, size: string) => {
    setItems((currentItems) => {
      const safeItems = currentItems || []
      const existingItem = safeItems.find(
        item => item.product.id === product.id && item.size === size
      )

      if (existingItem) {
        return safeItems.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...safeItems, { product, size, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string, size: string) => {
    setItems((currentItems) => {
      const safeItems = currentItems || []
      return safeItems.filter(
        item => !(item.product.id === productId && item.size === size)
      )
    })
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return (items || []).reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{ items: items || [], addToCart, removeFromCart, clearCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
