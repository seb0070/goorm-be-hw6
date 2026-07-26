import type { FakeStoreApiProduct, Product } from './types'

/** raw API 응답 한 건을 내부 Product로 변환. price가 숫자로 변환 불가능하면 null. */
export function mapToProduct(raw: FakeStoreApiProduct): Product | null {
  const price = Number(raw.price)
  if (Number.isNaN(price)) {
    return null
  }

  return {
    id: raw.id,
    name: raw.title,
    price,
    imageUrl: raw.image,
    category: raw.category,
    description: raw.description,
  }
}

/** price 변환에 실패한 항목은 제외하고 매핑 */
export function mapToProducts(raws: FakeStoreApiProduct[]): Product[] {
  return raws.reduce<Product[]>((acc, raw) => {
    const product = mapToProduct(raw)
    if (product) acc.push(product)
    return acc
  }, [])
}
