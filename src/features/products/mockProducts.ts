import type { Product } from './types'

/** API 호출 실패 시 대체용. 이미 내부 Product 형태로 작성되어 별도 변환이 필요 없음. */
export const mockProducts: Product[] = [
  {
    id: -1,
    name: '(예시) 백팩',
    price: 109.95,
    imageUrl: '/placeholder-product.svg',
    category: "men's clothing",
    description: '실시간 데이터를 불러오지 못해 표시되는 예시 상품입니다.',
  },
  {
    id: -2,
    name: '(예시) 티셔츠',
    price: 22.3,
    imageUrl: '/placeholder-product.svg',
    category: "men's clothing",
    description: '실시간 데이터를 불러오지 못해 표시되는 예시 상품입니다.',
  },
  {
    id: -3,
    name: '(예시) 목걸이',
    price: 695,
    imageUrl: '/placeholder-product.svg',
    category: 'jewelery',
    description: '실시간 데이터를 불러오지 못해 표시되는 예시 상품입니다.',
  },
  {
    id: -4,
    name: '(예시) 모니터',
    price: 599.99,
    imageUrl: '/placeholder-product.svg',
    category: 'electronics',
    description: '실시간 데이터를 불러오지 못해 표시되는 예시 상품입니다.',
  },
]
