'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem' }}>Check your email</h1>
          <p style={{ color: 'var(--grey)', lineHeight: 1.7 }}>
            We&apos;ve sent a confirmation link to <strong style={{ color: 'var(--white)' }}>{email}</strong>.
            Click it to activate your account, then come back to log in.
          </p>
          <a href="/login" className="btn btn-primary btn-lg" style={{ marginTop: '2rem', justifyContent: 'center', display: 'inline-flex' }}>
            Back to log in
          </a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <a href="/" className="logo" style={{ display: 'inline-flex', marginBottom: '2rem' }}>
          <img src="/icon.svg" width="28" height="28" alt="" style={{ borderRadius: '6px' }} />
          Get Into<em>Gas</em>
        </a>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          Start free
        </h1>
        <p style={{ color: 'var(--grey)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Already have an account? <a href="/login" style={{ color: 'var(--orange)' }}>Log in →</a>
        </p>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              minLength={8}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="At least 8 characters"
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
            {loading ? 'Creating account...' : 'Create free account →'}
          </button>

          <p style={{ fontSize: '0.75rem', color: 'var(--grey2)', textAlign: 'center', lineHeight: 1.6 }}>
            No card needed. 3 free lessons included. Cancel any time.
          </p>
        </form>
      </div>
    </div>
  )
}
