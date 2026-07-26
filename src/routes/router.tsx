import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import ProductListPage from '../features/products/ProductListPage'
import ProductDetailPage from './ProductDetailPage'
import LoginPage from '../features/auth/LoginPage'
import CartPage from './CartPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <ProductListPage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
])
