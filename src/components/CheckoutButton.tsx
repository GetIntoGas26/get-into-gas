'use client'

import { useState } from 'react'
import type { PlanId } from '@/lib/stripe'

// Starts Stripe Checkout for a plan. If the user isn't logged in, sends them to
// sign up first (signup-first flow); after confirming they resume checkout via ?checkout=.
export default function CheckoutButton({ plan, className, children }: {
  plan: PlanId
  className?: string
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const go = async () => {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      // Not logged in — sign up first, then resume checkout
      if (res.status === 401) {
        window.location.href = `/signup?plan=${plan}`
        return
      }

      const data = await res.json().catch(() => ({}))

      // Stripe not live yet (pre-launch)
      if (res.status === 503 && data.error === 'not_configured') {
        setMessage('Payments go live soon — you’re all set up, check back shortly.')
        setLoading(false)
        return
      }

      if (data.url) {
        window.location.href = data.url
        return
      }

      setMessage('Something went wrong. Please try again.')
      setLoading(false)
    } catch {
      setMessage('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={go} disabled={loading}>
        {loading ? 'Loading…' : children}
      </button>
      {message && <p className="checkout-msg">{message}</p>}
    </>
  )
}
