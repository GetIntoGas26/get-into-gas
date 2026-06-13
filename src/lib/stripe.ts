import Stripe from 'stripe'

// Server-side Stripe client. STRIPE_SECRET_KEY is set per-environment in Vercel.
// Lazily instantiated so builds don't fail before the key exists.
let _stripe: Stripe | null = null
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  if (!_stripe) _stripe = new Stripe(key)
  return _stripe
}

export type PlanId = 'study_bundle' | 'lifetime'

// One-off products. Prices are defined inline (no pre-created Stripe Price IDs needed),
// so this works in test mode immediately. tier/durationDays drive the profile update on payment.
export const PLANS: Record<PlanId, {
  name: string
  description: string
  amount: number        // pence, GBP
  tier: 'course_pass' | 'lifetime'
  durationDays: number | null   // null = no expiry (Lifetime)
}> = {
  study_bundle: {
    name: 'Study Bundle',
    description: '90 days full access to all CCN1 audio lessons',
    amount: 4900,
    tier: 'course_pass',
    durationDays: 90,
  },
  lifetime: {
    name: 'Lifetime Access',
    description: 'Lifetime access to all lessons, including offline downloads',
    amount: 5900,
    tier: 'lifetime',
    durationDays: null,
  },
}

export function isPlanId(v: unknown): v is PlanId {
  return v === 'study_bundle' || v === 'lifetime'
}
