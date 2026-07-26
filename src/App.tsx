import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from './app/hooks'
import { startAuthListener } from './features/auth/authListener'
import Header from './components/Header'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = startAuthListener(dispatch)
    return unsubscribe
  }, [dispatch])

  return (
    <>
      <Header />
      <main className="page">
        <Outlet />
      </main>
    </>
  )
}

export default App
