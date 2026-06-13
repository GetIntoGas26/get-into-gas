'use client'

import { useEffect, useRef } from 'react'

// After signup confirmation the user lands on /?checkout=<plan>. If they're now
// authenticated, kick off Stripe Checkout automatically to complete the purchase.
export default function CheckoutResume() {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    const plan = new URLSearchParams(window.location.search).get('checkout')
    if (plan !== 'study_bundle' && plan !== 'lifetime') return
    fired.current = true

    ;(async () => {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan }),
        })
        if (res.ok) {
          const { url } = await res.json()
          if (url) window.location.href = url
        }
      } catch {
        /* leave the user on the homepage */
      }
    })()
  }, [])

  return null
}
