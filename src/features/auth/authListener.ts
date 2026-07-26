import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { setSession } from './authSlice'
import { resetCart } from '../cart/cartSlice'
import type { AppDispatch } from '../../app/store'

function toAuthUser(firebaseUser: User | null) {
  if (!firebaseUser) return null
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL,
  }
}

/** Firebase 인증 상태 변화를 authSlice로 동기화. 앱 최상위에서 한 번만 호출 */
export function startAuthListener(dispatch: AppDispatch) {
  let hadUser = false

  return onAuthStateChanged(auth, (firebaseUser) => {
    dispatch(setSession(toAuthUser(firebaseUser)))

    // 최초 진입(비로그인 게스트)이 아니라 로그인 상태에서 로그아웃으로 전환될 때만 cart 초기화
    if (!firebaseUser && hadUser) {
      dispatch(resetCart())
    }
    hadUser = Boolean(firebaseUser)
  })
}
