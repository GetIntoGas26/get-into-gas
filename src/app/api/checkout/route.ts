import { createClient } from '@/lib/supabase/server'
import { getStripe, PLANS, isPlanId } from '@/lib/stripe'
import { NextResponse, type NextRequest } from 'next/server'

// Creates a Stripe Checkout session for the chosen plan.
// Requires an authenticated user (signup-first flow). Returns { url } to redirect to.
export async function POST(request: NextRequest) {
  const { plan } = await request.json().catch(() => ({ plan: null }))

  if (!isPlanId(plan)) {
    return NextResponse.json({ error: 'Unknown plan' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Not logged in — client should send them to sign up first
  if (!user) {
    return NextResponse.json({ error: 'auth_required' }, { status: 401 })
  }

  // Stripe not switched on yet (pre-launch) — let the client show a friendly notice
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const config = PLANS[plan]
  const stripe = getStripe()
  const origin = request.nextUrl.origin

  // Reuse a Stripe customer if we have one, else create and store it
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  let customerId = profile?.stripe_customer_id ?? undefined
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { user_id: user.id },
    })
    customerId = customer.id
    await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer: customerId,
    client_reference_id: user.id,
    metadata: { user_id: user.id, plan },
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'gbp',
        unit_amount: config.amount,
        product_data: { name: config.name, description: config.description },
      },
    }],
    success_url: `${origin}/lessons?purchase=success`,
    cancel_url: `${origin}/#pricing`,
  })

  return NextResponse.json({ url: session.url })
}
