import { useAppDispatch, useAppSelector } from '../app/hooks'
import { removeItem, updateQuantity } from '../features/cart/cartSlice'
import { selectCartLineItems, selectCartTotal } from '../features/cart/cartSelectors'
import { handleImageError } from '../features/products/imageFallback'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const lineItems = useAppSelector(selectCartLineItems)
  const total = useAppSelector(selectCartTotal)

  return (
    <div className="cart-layout">
      <div>
        {lineItems.length === 0 ? (
          <p className="empty-state">장바구니가 비어 있습니다.</p>
        ) : (
          <ul className="cart-list">
            {lineItems.map(({ product, quantity, subtotal }) => (
              <li key={product.id} className="cart-item">
                <img
                  className="cart-item__image"
                  src={product.imageUrl}
                  alt={product.name}
                  onError={handleImageError}
                />
                <span className="cart-item__name">{product.name}</span>
                <div className="qty-stepper">
                  <button
                    type="button"
                    aria-label="수량 감소"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: product.id,
                          quantity: quantity - 1,
                        }),
                      )
                    }
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    aria-label="수량 증가"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: product.id,
                          quantity: quantity + 1,
                        }),
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <span className="cart-item__subtotal">
                  ${subtotal.toFixed(2)}
                </span>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => dispatch(removeItem({ productId: product.id }))}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <aside className="cart-summary">
        <div className="cart-summary__row">
          <span>상품 수</span>
          <span>{lineItems.length}종</span>
        </div>
        <div className="cart-summary__row cart-summary__total">
          <span>총액</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </aside>
    </div>
  )
}
