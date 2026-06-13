export const metadata = { title: 'Privacy Policy - Get Into Gas' }

export default function PrivacyPage() {
  return (
    <>
      <div className="legal-draft">⚠️ DRAFT — for review by Jake / a solicitor before launch. Replace the [bracketed] placeholders.</div>

      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: 13 June 2026</p>

      <p>
        This policy explains how Get Into Gas, operated by [COMPANY LEGAL NAME] (&ldquo;we&rdquo;), collects
        and uses your personal data. We are the data controller. For any privacy request, contact
        [CONTACT EMAIL]. This policy is written to align with UK GDPR and the Data Protection Act 2018.
      </p>

      <h2>1. What we collect</h2>
      <ul>
        <li><strong>Account data</strong> — your email address and an encrypted password (handled by our auth provider, Supabase).</li>
        <li><strong>Payment data</strong> — handled by Stripe. We never see or store your full card details; we receive a confirmation of payment and a customer reference.</li>
        <li><strong>Usage data</strong> — which lessons you play and your progress, so we can show your place and completed lessons.</li>
        <li><strong>Technical data</strong> — basic analytics (e.g. pages visited) to improve the Service.</li>
      </ul>

      <h2>2. How we use it</h2>
      <ul>
        <li>To create and run your account and give you access to the lessons you&apos;ve paid for.</li>
        <li>To process payments and provide receipts (legal basis: performance of a contract).</li>
        <li>To track and display your revision progress.</li>
        <li>To improve the Service and understand usage (legal basis: legitimate interests).</li>
        <li>To send essential service emails such as confirmation and password resets.</li>
      </ul>

      <h2>3. Who we share it with</h2>
      <p>We use trusted processors to run the Service:</p>
      <ul>
        <li><strong>Supabase</strong> — authentication and database.</li>
        <li><strong>Stripe</strong> — payment processing.</li>
        <li><strong>Cloudflare</strong> — audio file storage and delivery.</li>
        <li><strong>Vercel</strong> — website hosting.</li>
      </ul>
      <p>We do not sell your personal data.</p>

      <h2>4. Cookies</h2>
      <p>
        We use essential cookies to keep you logged in. If analytics are enabled, we may use analytics
        cookies; you can control these through your browser settings.
      </p>

      <h2>5. How long we keep it</h2>
      <p>
        We keep account and progress data while your account is active. Payment records are kept as long as
        required for tax and accounting. You can ask us to delete your account at any time.
      </p>

      <h2>6. Your rights</h2>
      <p>
        Under UK data protection law you have the right to access, correct, delete, or port your data, and
        to object to or restrict certain processing. To exercise these rights, contact [CONTACT EMAIL]. You
        also have the right to complain to the Information Commissioner&apos;s Office (ICO) at ico.org.uk.
      </p>

      <h2>7. Changes</h2>
      <p>We may update this policy; material changes will be notified via the Service or by email.</p>

      <h2>8. Contact</h2>
      <p>Privacy questions: [CONTACT EMAIL].</p>
    </>
  )
}
