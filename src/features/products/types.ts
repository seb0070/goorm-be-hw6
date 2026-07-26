export interface FakeStoreApiProductRating {
  rate: number
  count: number
}

/** GET https://fakestoreapi.com/products 원본 응답 형태 */
export interface FakeStoreApiProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: FakeStoreApiProductRating
}

/** 화면에서 쓰는 내부 상품 도메인 타입 (API 형태에 종속되지 않음) */
export interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  category: string
  description: string
}
