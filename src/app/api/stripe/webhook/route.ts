import { getStripe, PLANS, isPlanId } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse, type NextRequest } from 'next/server'
import type Stripe from 'stripe'

// Stripe webhook. Configure the endpoint in the Stripe Dashboard to point here and
// subscribe to `checkout.session.completed`. STRIPE_WEBHOOK_SECRET must match.
export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const sig = request.headers.get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const rawBody = await request.text()
  const stripe = getStripe()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.client_reference_id || session.metadata?.user_id
    const plan = session.metadata?.plan

    if (!userId || !isPlanId(plan)) {
      console.error('Webhook missing user_id or plan', { userId, plan })
      return NextResponse.json({ received: true })
    }

    const config = PLANS[plan]
    const expiresAt = config.durationDays
      ? new Date(Date.now() + config.durationDays * 24 * 60 * 60 * 1000).toISOString()
      : null

    const admin = createAdminClient()
    const { error } = await admin
      .from('profiles')
      .update({
        subscription_tier: config.tier,
        subscription_status: 'active',
        subscription_expires_at: expiresAt,
        stripe_customer_id: (session.customer as string) ?? undefined,
      })
      .eq('id', userId)

    if (error) {
      console.error('Failed to update profile after payment:', error)
      // Return 500 so Stripe retries
      return NextResponse.json({ error: 'Profile update failed' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
