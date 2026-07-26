import { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { startAuthListener } from './features/auth/authListener'
import { signOutUser } from './firebase/googleAuth'

function App() {
  const dispatch = useAppDispatch()
  const { status, user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const unsubscribe = startAuthListener(dispatch)
    return unsubscribe
  }, [dispatch])

  return (
    <>
      <header>
        <nav>
          <Link to="/">상품 목록</Link>
          <Link to="/cart">장바구니</Link>
          {status === 'loading' ? null : status === 'authenticated' && user ? (
            <>
              <span>{user.displayName ?? user.email}</span>
              <button type="button" onClick={() => signOutUser()}>
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
