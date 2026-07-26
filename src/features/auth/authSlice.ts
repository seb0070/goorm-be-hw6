import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthUser {
  uid: string
  displayName: string | null
  email: string | null
}

interface AuthState {
  status: 'loading' | 'authenticated' | 'unauthenticated'
  user: AuthUser | null
  error: string | null
}

const initialState: AuthState = {
  status: 'loading',
  user: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** onAuthStateChanged 콜백 결과 반영. user가 있으면 authenticated, 없으면 unauthenticated */
    setSession(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload
      state.status = action.payload ? 'authenticated' : 'unauthenticated'
      state.error = null
    },
    setAuthError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    clearAuthError(state) {
      state.error = null
    },
  },
})

export const { setSession, setAuthError, clearAuthError } = authSlice.actions
export default authSlice.reducer
