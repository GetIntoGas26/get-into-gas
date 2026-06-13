'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // The recovery link establishes a session via /auth/callback. Confirm it's there.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setError('This reset link is invalid or has expired. Please request a new one.')
      }
      setReady(true)
    })
  }, [supabase])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords don’t match.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
      setTimeout(() => router.push('/lessons'), 1500)
    }
  }

  if (done) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem' }}>Password updated</h1>
          <p style={{ color: 'var(--grey)', lineHeight: 1.7 }}>Taking you to your lessons...</p>
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
          Set a new password
        </h1>
        <p style={{ color: 'var(--grey)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Choose a new password for your account.
        </p>

        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--white2)' }}>
              New password
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
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--white2)' }}>
              Confirm password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
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

          <button type="submit" disabled={loading || !ready} className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
            {loading ? 'Updating...' : 'Update password →'}
          </button>

          <p style={{ fontSize: '0.85rem', color: 'var(--grey)', textAlign: 'center' }}>
            <a href="/forgot-password" style={{ color: 'var(--orange)' }}>Request a new link</a>
          </p>
        </form>
      </div>
    </div>
  )
}
