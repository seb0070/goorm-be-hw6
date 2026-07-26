import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { setSession } from './authSlice'
import type { AppDispatch } from '../../app/store'

function toAuthUser(firebaseUser: User | null) {
  if (!firebaseUser) return null
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
  }
}

/** Firebase 인증 상태 변화를 authSlice로 동기화. 앱 최상위에서 한 번만 호출 */
export function startAuthListener(dispatch: AppDispatch) {
  return onAuthStateChanged(auth, (firebaseUser) => {
    dispatch(setSession(toAuthUser(firebaseUser)))
  })
}
