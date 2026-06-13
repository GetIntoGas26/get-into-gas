export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="legal-wrap">
      <a href="/" className="logo" style={{ display: 'inline-flex', marginBottom: '2.5rem' }}>
        <img src="/icon.svg" width="28" height="28" alt="" style={{ borderRadius: '6px' }} />
        Get Into<em>Gas</em>
      </a>
      <article className="legal">{children}</article>
      <div className="legal-foot">
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href="/refunds">Refunds</a>
        <a href="/">← Back to home</a>
      </div>
    </div>
  )
}
