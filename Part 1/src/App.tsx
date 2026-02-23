import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '@/lib/cart-context'
import { Navigation } from '@/components/Navigation'
import { Landing } from '@/components/Landing'
import { Products } from '@/components/Products'
import { ProductDetail } from '@/components/ProductDetail'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
          <Toaster />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App