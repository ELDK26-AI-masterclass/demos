import { Product } from './types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic White Tee',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    description: 'A timeless essential. Our classic white tee is crafted from premium 100% organic cotton with a relaxed fit. Perfect for everyday wear, it features a ribbed crew neck and reinforced seams for lasting quality.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '2',
    name: 'Midnight Black Premium',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    description: 'Elevate your wardrobe with our premium black tee. Made from luxurious combed cotton blend with a modern slim fit. The deep black color stays vibrant wash after wash.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '3',
    name: 'Ocean Blue Comfort',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80',
    description: 'Dive into comfort with our ocean blue tee. Features moisture-wicking fabric and a soft, breathable weave. The versatile blue shade pairs perfectly with any outfit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '4',
    name: 'Vintage Gray Essential',
    price: 31.99,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    description: 'A versatile wardrobe staple in heather gray. Pre-washed for ultimate softness with a lived-in feel from day one. The perfect layering piece or standalone essential.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '5',
    name: 'Forest Green Heritage',
    price: 33.99,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
    description: 'Stand out in our rich forest green tee. Eco-friendly dyes and sustainable materials make this both stylish and responsible. Features a slightly relaxed fit with drop shoulders.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }
]

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id)
}
