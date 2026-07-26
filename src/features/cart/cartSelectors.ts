import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { productsApi } from '../products/productsApi'
import type { Product } from '../products/types'

export interface CartLineItem {
  product: Product
  quantity: number
  subtotal: number
}

const selectCartItems = (state: RootState) => state.cart.items

// 상품 목록 쿼리가 아직 호출/캐시되지 않았다면 undefined일 수 있음
const selectCachedProducts = (state: RootState) =>
  productsApi.endpoints.getProducts.select()(state).data

/** cart.items(productId, quantity)와 product 카탈로그를 조인. 카탈로그에 없는 productId는 제외 */
export const selectCartLineItems = createSelector(
  [selectCartItems, selectCachedProducts],
  (items, products): CartLineItem[] => {
    if (!products) return []

    const productById = new Map(products.map((p) => [p.id, p]))

    return items.reduce<CartLineItem[]>((acc, item) => {
      const product = productById.get(item.productId)
      if (product) {
        acc.push({
          product,
          quantity: item.quantity,
          subtotal: product.price * item.quantity,
        })
      }
      return acc
    }, [])
  },
)

export const selectCartTotal = createSelector(
  [selectCartLineItems],
  (lineItems) => lineItems.reduce((sum, line) => sum + line.subtotal, 0),
)

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + item.quantity, 0),
)
