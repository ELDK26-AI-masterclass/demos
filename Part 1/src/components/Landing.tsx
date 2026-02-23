import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight } from '@phosphor-icons/react'

export function Landing() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="relative overflow-hidden bg-gradient-to-br from-muted via-background to-muted">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
                  Custom Tees,
                  <br />
                  <span className="text-accent">Powered by Style</span>
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
                  Shop unique, smartly designed T-shirts. Premium quality, modern fits, and timeless style for every occasion.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-base group"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 font-semibold px-8 py-6 text-base hover:border-accent hover:text-accent"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex gap-8 pt-8">
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">4.9★</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Organic Cotton</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
                  alt="Premium T-Shirt"
                  className="relative w-full h-full object-cover rounded-2xl shadow-2xl ring-1 ring-border"
                />
                <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-lg ring-1 ring-border">
                  <div className="text-sm font-medium text-muted-foreground">Starting at</div>
                  <div className="text-3xl font-bold text-foreground">$29.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Sustainable</h3>
              <p className="text-muted-foreground">100% organic cotton, ethically sourced and produced</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Fast Shipping</h3>
              <p className="text-muted-foreground">Free delivery on orders over $50, arrives in 3-5 days</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Quality Promise</h3>
              <p className="text-muted-foreground">30-day returns, lifetime guarantee on craftsmanship</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
