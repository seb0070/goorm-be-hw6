import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">상품 목록</Link>
          <Link to="/cart">장바구니</Link>
          <Link to="/login">로그인</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
