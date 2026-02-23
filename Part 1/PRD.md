# Planning Guide

A modern, minimal e-commerce storefront for browsing and purchasing custom t-shirts with a clean shopping experience from landing to cart confirmation.

**Experience Qualities**: 
1. **Effortless** - Navigation feels intuitive with clear pathways from discovery to purchase
2. **Contemporary** - Design feels fresh and current with subtle motion and refined typography
3. **Trustworthy** - Product presentation and interactions inspire confidence in the shopping experience

**Complexity Level**: Light Application (multiple features with basic state)
This is a multi-page browsing and shopping experience with product catalog, detail views, and cart state management. It requires routing between views and maintaining cart state, but doesn't involve backend integration or complex workflows.

## Essential Features

### Landing Page Hero
- **Functionality**: Eye-catching hero section with brand messaging and primary CTA button
- **Purpose**: Create immediate visual impact and guide users into the shopping experience
- **Trigger**: User arrives at root URL
- **Progression**: View hero content → Read value proposition → Click "Shop Now" CTA → Navigate to product list
- **Success criteria**: Clear visual hierarchy, compelling CTA that drives clicks to product catalog

### Product Catalog
- **Functionality**: Grid display of 3-5 t-shirt products showing image, name, and price
- **Purpose**: Allow users to browse available products and make informed selection
- **Trigger**: User clicks "Shop Now" from landing or navigates to /products
- **Progression**: View product grid → Hover to see interaction state → Click product card → Navigate to detail page
- **Success criteria**: Products display in responsive grid, images load properly, prices are clearly visible

### Product Detail View
- **Functionality**: Full product information with large image, description, size selector, and add to cart button
- **Purpose**: Provide detailed product information to support purchase decision
- **Trigger**: User clicks on product from catalog
- **Progression**: View large product image → Read description → Select size from dropdown → Click "Add to Cart" → See confirmation toast
- **Success criteria**: Size selection works, cart button triggers feedback, navigation preserves context

### Add to Cart Interaction
- **Functionality**: Button interaction that adds selected product/size to cart and shows toast confirmation
- **Purpose**: Provide immediate feedback that action was successful
- **Trigger**: User clicks "Add to Cart" with size selected
- **Progression**: Click button → Button shows loading/success state → Toast notification appears → Cart state updates
- **Success criteria**: Visual feedback is immediate, toast message is clear, state persists during session

### Navigation System
- **Functionality**: Clean header navigation with brand logo and cart indicator
- **Purpose**: Provide consistent navigation and show cart status
- **Trigger**: Present on all pages
- **Progression**: Click logo → Return to home | Click cart icon → View cart count
- **Success criteria**: Navigation is always accessible, cart count updates in real-time

## Edge Case Handling

- **No size selected**: Disable add to cart button or show validation message when user attempts to add without selecting size
- **Empty cart navigation**: Show empty state if user clicks cart with no items
- **Direct URL access**: Handle direct navigation to product detail URLs gracefully
- **Missing product data**: Show fallback if product ID doesn't exist
- **Rapid clicking**: Prevent duplicate cart additions with button disabled state during add operation

## Design Direction

The design should evoke confidence and contemporary retail sophistication - feels like shopping at a modern direct-to-consumer brand with polished presentation and effortless interactions.

## Color Selection

A bold, energetic palette anchored by vibrant orange accents against clean neutrals, creating an inviting and contemporary shopping experience.

- **Primary Color**: Deep Navy `oklch(0.25 0.05 255)` - Conveys trust and professionalism for headers and key text
- **Secondary Colors**: Warm Light Gray `oklch(0.96 0.005 90)` for backgrounds and Soft Gray `oklch(0.85 0.01 90)` for borders and subtle elements
- **Accent Color**: Vibrant Orange `oklch(0.68 0.19 45)` - Eye-catching for CTAs, hover states, and important actions
- **Foreground/Background Pairings**: 
  - Primary (Navy #2A3A52): White text (#FFFFFF) - Ratio 8.2:1 ✓
  - Accent (Vibrant Orange #E8743B): White text (#FFFFFF) - Ratio 3.5:1 ✓ (large text)
  - Background (Light Gray #F7F7F6): Navy text (#2A3A52) - Ratio 8.2:1 ✓
  - Card backgrounds: White (#FFFFFF) on light gray with subtle shadow for depth

## Font Selection

Typography should feel approachable yet refined, balancing modern geometric structure with warm readability appropriate for a lifestyle brand.

- **Primary Font**: Space Grotesk for headings and brand - geometric and distinctive with technical edge
- **Secondary Font**: Inter for body text and UI - clean, highly legible, professional
- **Typographic Hierarchy**: 
  - H1 (Hero Title): Space Grotesk Bold / 56px / tight letter spacing (-0.02em)
  - H2 (Section Headings): Space Grotesk SemiBold / 36px / normal spacing
  - H3 (Product Names): Space Grotesk Medium / 24px / tight spacing
  - Body (Descriptions): Inter Regular / 16px / relaxed line height (1.6)
  - Price: Inter SemiBold / 20px / normal spacing
  - Button Labels: Inter SemiBold / 16px / slight letter spacing (0.01em)
  - Small (Metadata): Inter Regular / 14px / normal spacing

## Animations

Animations should feel responsive and purposeful - subtle feedback that confirms actions without calling attention to the motion itself. Use micro-interactions for hover states (scale 1.02, 200ms), smooth page transitions (fade + slight vertical movement, 300ms), and celebratory cart confirmations (toast slide-in with soft bounce).

## Component Selection

- **Components**: 
  - Button (shadcn) for CTAs and actions with size variants (default for primary CTA, lg for hero)
  - Card (shadcn) for product grid items with custom hover effects
  - Select (shadcn) for size picker dropdown
  - Toast/Sonner for add-to-cart confirmations
  - Badge for potential "New" or sale indicators
  
- **Customizations**: 
  - Custom ProductCard component wrapping Card with image, overlay effects on hover
  - Custom HeroSection with full-width background treatment
  - Custom ProductGrid layout component
  - Navigation header component with cart icon and count badge
  
- **States**: 
  - Buttons: default (orange bg), hover (darker orange + scale), active (pressed state), disabled (muted gray)
  - Cards: default (white with shadow), hover (elevated shadow + subtle scale + border accent)
  - Inputs/Select: default (gray border), focus (orange ring), filled (subtle background)
  - Links: default (navy), hover (orange)
  
- **Icon Selection**: 
  - ShoppingCart (Phosphor) for cart/navigation
  - CaretDown (Phosphor) for select dropdowns
  - Check (Phosphor) for confirmation states
  - X (Phosphor) for close/dismiss actions
  
- **Spacing**: 
  - Container padding: px-6 lg:px-8
  - Section spacing: py-12 lg:py-20
  - Card padding: p-6
  - Grid gap: gap-6 lg:gap-8
  - Button padding: px-6 py-3 (default), px-8 py-4 (lg)
  
- **Mobile**: 
  - Hero: stack text and reduce font sizes, maintain full-width CTA
  - Product grid: single column on mobile (< 640px), 2 columns on tablet (640-1024px), 3 columns desktop (> 1024px)
  - Navigation: simplified header with hamburger menu if needed (though with only 2-3 nav items, can remain inline)
  - Product detail: stack image above content on mobile, side-by-side on desktop
  - Touch targets: minimum 44px for all interactive elements on mobile
