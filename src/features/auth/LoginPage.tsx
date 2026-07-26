import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { signInWithGoogle } from '../../firebase/googleAuth'
import { clearAuthError, setAuthError } from './authSlice'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.auth.error)
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleGoogleLogin = async () => {
    dispatch(clearAuthError())
    setIsSigningIn(true)
    try {
      await signInWithGoogle()
      // 성공 시 authListener의 onAuthStateChanged가 상태를 authenticated로 갱신함
    } catch {
      dispatch(setAuthError('Google 로그인에 실패했습니다. 다시 시도해 주세요.'))
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <div>
      <h1>로그인</h1>
      <button type="button" onClick={handleGoogleLogin} disabled={isSigningIn}>
        {isSigningIn ? '로그인 중...' : 'Google로 로그인'}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  )
}
