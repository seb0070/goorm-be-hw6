import { useAppDispatch, useAppSelector } from '../app/hooks'
import { removeItem, updateQuantity } from '../features/cart/cartSlice'
import { selectCartLineItems, selectCartTotal } from '../features/cart/cartSelectors'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const lineItems = useAppSelector(selectCartLineItems)
  const total = useAppSelector(selectCartTotal)

  if (lineItems.length === 0) {
    return <p>장바구니가 비어 있습니다.</p>
  }

  return (
    <>
      <ul className="cart-list">
        {lineItems.map(({ product, quantity, subtotal }) => (
          <li key={product.id} className="cart-list__item">
            <span>{product.name}</span>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                dispatch(
                  updateQuantity({
                    productId: product.id,
                    quantity: Number(e.target.value),
                  }),
                )
              }
            />
            <span>${subtotal.toFixed(2)}</span>
            <button
              type="button"
              onClick={() => dispatch(removeItem({ productId: product.id }))}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <p>총액: ${total.toFixed(2)}</p>
    </>
  )
}
