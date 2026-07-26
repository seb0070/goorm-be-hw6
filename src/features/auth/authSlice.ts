import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthUser {
  uid: string
  email: string | null
}

interface AuthState {
  user: AuthUser | null
  status: 'idle' | 'loading' | 'error'
  error: string | null
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload
      state.status = 'idle'
      state.error = null
    },
    clearUser(state) {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
