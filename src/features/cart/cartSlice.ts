import { createSlice } from '@reduxjs/toolkit'

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

// TODO(Day 6): addItem/removeItem/updateQuantity 리듀서 구현
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
})

export default cartSlice.reducer
