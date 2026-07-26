import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { addItem } from '../cart/cartSlice'
import { useGetProductsQuery } from './productsApi'
import { mockProducts } from './mockProducts'
import { handleImageError } from './imageFallback'

const ADDED_LABEL_MS = 1200
const TOAST_MS = 2000

export default function ProductListPage() {
  const dispatch = useAppDispatch()
  const { data, isLoading, isError, isSuccess } = useGetProductsQuery()
  const [justAddedId, setJustAddedId] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), TOAST_MS)
    return () => window.clearTimeout(timer)
  }, [toast])

  function handleAddToCart(productId: number) {
    dispatch(addItem({ productId }))
    setJustAddedId(productId)
    setToast('장바구니에 추가되었습니다!')
    window.setTimeout(() => {
      setJustAddedId((current) => (current === productId ? null : current))
    }, ADDED_LABEL_MS)
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <p>상품을 불러오는 중...</p>
      </div>
    )
  }

  const products = isError ? mockProducts : (data ?? [])
  const isEmpty = isSuccess && products.length === 0

  if (isEmpty) {
    return <p className="empty-state">표시할 상품이 없습니다.</p>
  }

  return (
    <>
      {isError && (
        <p className="status-banner status-banner--error" role="status">
          일시적으로 예시 데이터를 표시하고 있습니다.
        </p>
      )}
      <ul className="product-grid">
        {products.map((product) => (
          <li key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-card__link">
              <div className="product-card__image-wrap">
                <img
                  className="product-card__image"
                  src={product.imageUrl}
                  alt={product.name}
                  onError={handleImageError}
                />
              </div>
              <div className="product-card__body">
                <span className="category-tag">{product.category}</span>
                <h3 className="product-card__title">{product.name}</h3>
                <span className="product-card__price">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </Link>
            <div className="product-card__footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleAddToCart(product.id)}
              >
                {justAddedId === product.id ? '담겼습니다!' : '장바구니 담기'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </>
  )
}
