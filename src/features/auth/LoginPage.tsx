import { useState } from 'react'
import type { FormEvent } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: Firebase 콘솔 세팅 후 signInWithEmailAndPassword 연결
    console.log('login submit (stub)', { email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>로그인</h1>
      <label>
        이메일
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        비밀번호
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">로그인</button>
    </form>
  )
}
