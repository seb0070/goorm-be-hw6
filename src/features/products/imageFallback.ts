import type { SyntheticEvent } from 'react'

export const PLACEHOLDER_IMAGE = '/placeholder-product.svg'

export function handleImageError(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget
  if (img.src.endsWith(PLACEHOLDER_IMAGE)) return
  img.src = PLACEHOLDER_IMAGE
}
