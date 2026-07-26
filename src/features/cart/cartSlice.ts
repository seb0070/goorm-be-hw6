import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  productId: number
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{ productId: number; quantity?: number }>,
    ) {
      const { productId } = action.payload
      const quantity = Math.max(1, action.payload.quantity ?? 1)

      const existing = state.items.find((item) => item.productId === productId)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ productId, quantity })
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) {
      const { productId, quantity } = action.payload
      const existing = state.items.find((item) => item.productId === productId)
      if (existing) {
        existing.quantity = Math.max(1, quantity)
      }
    },
    removeItem(state, action: PayloadAction<{ productId: number }>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId,
      )
    },
  },
})

export const { addItem, updateQuantity, removeItem } = cartSlice.actions
export default cartSlice.reducer
