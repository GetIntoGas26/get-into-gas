'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/lessons')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <a href="/" className="logo" style={{ display: 'inline-flex', marginBottom: '2rem' }}>
          <div className="logo-mark">🎧</div>
          ACS<em>Audio</em>
        </a>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          Log in
        </h1>
        <p style={{ color: 'var(--grey)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Don&apos;t have an account? <a href="/signup" style={{ color: 'var(--orange)' }}>Sign up free →</a>
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--white2)' }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                background: 'var(--black2)', border: '1px solid var(--border2)',
                color: 'var(--white)', fontSize: '0.95rem', outline: 'none',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--white2)' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                background: 'var(--black2)', border: '1px solid var(--border2)',
                color: 'var(--white)', fontSize: '0.95rem', outline: 'none',
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#ff4444', fontSize: '0.85rem', padding: '0.75rem', background: 'rgba(255,68,68,0.1)', borderRadius: '8px' }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
            {loading ? 'Logging in...' : 'Log in →'}
          </button>
        </form>
      </div>
    </div>
  )
}
