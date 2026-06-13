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

  const go = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      if (res.status === 401) {
        window.location.href = `/signup?plan=${plan}`
        return
      }
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setLoading(false)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <button type="button" className={className} onClick={go} disabled={loading}>
      {loading ? 'Loading…' : children}
    </button>
  )
}
