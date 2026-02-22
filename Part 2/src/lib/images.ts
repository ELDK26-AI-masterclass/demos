/**
 * Image URL helpers for Threadly product images.
 * All product images live in /public/images/products/<slug>-<n>.webp
 */

export function getProductImageUrl(imageSlug: string): string {
  return `/images/products/${imageSlug}.png`;
}

export function getProductImageSet(imageSlugs: string[]): string[] {
  return imageSlugs.map(getProductImageUrl);
}
