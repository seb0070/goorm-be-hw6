import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, ShoppingCart, User } from 'lucide-react'
import { useAppSelector } from '../app/hooks'
import { selectCartItemCount } from '../features/cart/cartSelectors'
import { signOutUser } from '../firebase/googleAuth'

export default function Header() {
  const { status, user } = useAppSelector((state) => state.auth)
  const cartCount = useAppSelector(selectCartItemCount)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  return (
    <header className="app-header">
      <nav className="app-nav">
        <Link to="/" className="brand">
          ShopMall
        </Link>

        <div className="nav-actions">
          <Link to="/cart" className="icon-btn" aria-label="장바구니">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {status === 'loading' ? null : status === 'authenticated' && user ? (
            <div className="profile-menu" ref={menuRef}>
              <button
                type="button"
                className="icon-btn"
                aria-label="프로필 메뉴"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="avatar" />
                ) : (
                  <span className="avatar avatar--fallback">
                    <User size={16} />
                  </span>
                )}
              </button>
              {menuOpen && (
                <div className="profile-dropdown">
                  <p className="profile-dropdown__name">
                    {user.displayName ?? user.email}
                  </p>
                  <button
                    type="button"
                    className="profile-dropdown__logout"
                    onClick={() => {
                      signOutUser()
                      setMenuOpen(false)
                    }}
                  >
                    <LogOut size={16} />
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="icon-btn" aria-label="로그인">
              <span className="avatar avatar--fallback">
                <User size={16} />
              </span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
