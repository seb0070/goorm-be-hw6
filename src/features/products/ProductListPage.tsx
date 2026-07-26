import type { SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { addItem } from '../cart/cartSlice'
import { useGetProductsQuery } from './productsApi'
import { mockProducts } from './mockProducts'

const PLACEHOLDER_IMAGE = '/placeholder-product.svg'

function handleImageError(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget
  if (img.src.endsWith(PLACEHOLDER_IMAGE)) return
  img.src = PLACEHOLDER_IMAGE
}

export default function ProductListPage() {
  const dispatch = useAppDispatch()
  const { data, isLoading, isError, isSuccess } = useGetProductsQuery()

  if (isLoading) {
    return <p>상품을 불러오는 중...</p>
  }

  const products = isError ? mockProducts : (data ?? [])
  const isEmpty = isSuccess && products.length === 0

  if (isEmpty) {
    return <p>표시할 상품이 없습니다.</p>
  }

  return (
    <>
      {isError && (
        <p role="status">일시적으로 예시 데이터를 표시하고 있습니다.</p>
      )}
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-list__item">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                width={80}
                onError={handleImageError}
              />
              <span>{product.name}</span>
              <span>{product.category}</span>
              <span>${product.price.toFixed(2)}</span>
            </Link>
            <button
              type="button"
              onClick={() => dispatch(addItem({ productId: product.id }))}
            >
              담기
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
