export const metadata = { title: 'Refund Policy - Get Into Gas' }

export default function RefundsPage() {
  return (
    <>
      <div className="legal-draft">⚠️ DRAFT — for review by Jake / a solicitor before launch. Replace the [bracketed] placeholders.</div>

      <h1>Refund &amp; Cancellation Policy</h1>
      <p className="legal-updated">Last updated: 13 June 2026</p>

      <p>
        This policy explains your cancellation and refund rights when you buy a paid plan from Get Into Gas,
        operated by [COMPANY LEGAL NAME]. It reflects your rights under the Consumer Contracts Regulations
        2013 and the Consumer Rights Act 2015.
      </p>

      <h2>1. 14-day cooling-off period</h2>
      <p>
        Because our plans are digital content, you normally have 14 days from purchase to cancel for a
        refund. <strong>However</strong>, when you start accessing the lessons you agree that the digital
        content is supplied immediately, and you acknowledge that you lose the right to cancel once access
        has begun. If you have not accessed any paid lesson, you may request a full refund within 14 days.
      </p>

      <h2>2. Faulty or misdescribed content</h2>
      <p>
        If the content is faulty, not as described, or doesn&apos;t work as it should, you are entitled to a
        repair, replacement, or refund under the Consumer Rights Act 2015. Please contact us so we can put
        it right.
      </p>

      <h2>3. How to request a refund</h2>
      <p>
        Email [CONTACT EMAIL] with the email address on your account and the reason for your request.
        We aim to respond within [X] working days. Approved refunds are made to your original payment
        method via Stripe.
      </p>

      <h2>4. Study Bundle expiry</h2>
      <p>
        The Study Bundle gives 90 days of access. It is not a recurring subscription and will not auto-renew
        or recharge you. Access simply ends after 90 days, and you are welcome to purchase again.
      </p>

      <h2>5. Contact</h2>
      <p>Refund and cancellation queries: [CONTACT EMAIL].</p>
    </>
  )
}
