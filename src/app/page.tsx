import Nav from '@/components/Nav'
import AudioPlayer from '@/components/AudioPlayer'

export default function Home() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-noise" />
        <div className="hero-accent-bar" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="eyebrow">
              <div className="eyebrow-dot" />
              CCN1 · ACS Gas Training · Audio Revision
            </div>
            <h1>
              <span className="hl">Listen.</span> Learn.<br />
              <span className="hl2">Pass.</span>
            </h1>
            <p className="hero-sub">
              Audio lessons for anyone training for gas - whether you&apos;re already in the trade or studying around a completely different job.
            </p>
            <div className="hero-btns">
              <a href="#pricing" className="btn btn-primary btn-lg">Start Free - No Card Needed</a>
              <a href="#top" className="btn btn-outline btn-lg">▶ Hear a Sample</a>
            </div>
            <div className="trust-row">
              <div className="trust-item"><span className="trust-icon">✓</span>Free to try</div>
              <div className="trust-item"><span className="trust-icon">✓</span>Cancel any time</div>
              <div className="trust-item"><span className="trust-icon">✓</span>Full ACS syllabus</div>
            </div>
          </div>
          <AudioPlayer />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          <span>🎧 <strong>CCN1 Audio Revision</strong></span>
          <span>·</span><span>✓ <strong>Gas Safety</strong></span>
          <span>·</span><span>✓ <strong>Tightness Testing</strong></span>
          <span>·</span><span>✓ <strong>Combustion</strong></span>
          <span>·</span><span>✓ <strong>Pipework</strong></span>
          <span>·</span><span>✓ <strong>Ventilation</strong></span>
          <span>·</span><span>✓ <strong>Emergency Procedures</strong></span>
          <span>·</span><span>🎧 <strong>ACS Gas Training</strong></span>
          <span>·</span><span>✓ <strong>CCN1 Audio Revision</strong></span>
          <span>·</span><span>✓ <strong>Gas Safety</strong></span>
          <span>·</span><span>✓ <strong>Tightness Testing</strong></span>
          <span>·</span><span>✓ <strong>Combustion</strong></span>
          <span>·</span><span>✓ <strong>Pipework</strong></span>
          <span>·</span><span>✓ <strong>Ventilation</strong></span>
          <span>·</span><span>✓ <strong>Emergency Procedures</strong></span>
          <span>·</span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="hiw-bg" id="how-it-works">
        <div className="sec">
          <div className="sec-eyebrow"><div className="eyebrow-pip" /><div className="eyebrow-label">How It Works</div></div>
          <h2>Three steps.<br /><span className="hl">No excuses.</span></h2>
          <p className="sec-sub">Working security, stacking shelves, plumbing - or already on the tools. Studying for gas around a full-time job is tough. Here&apos;s how it works.</p>
          <div className="steps">
            <div className="step">
              <div className="step-head"><div className="step-num">1</div><h3>Pick Your Topic</h3></div>
              <p>Choose from 6 focused CCN1 modules - gas safety, tightness testing, combustion and more. Start exactly where you need to.</p>
            </div>
            <div className="step">
              <div className="step-head"><div className="step-num">2</div><h3>Press Play, Go</h3></div>
              <p>Drive to site, grab lunch, break time - audio lessons work anywhere you are. No desk, no screen time needed.</p>
            </div>
            <div className="step">
              <div className="step-head"><div className="step-num">3</div><h3>Know Your Stuff</h3></div>
              <p>Repeated audio builds genuine retention. Walk into your ACS assessment prepared, not hoping - knowing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="topics-bg" id="topics">
        <div className="sec">
          <div className="sec-eyebrow"><div className="eyebrow-pip" /><div className="eyebrow-label">Topics Covered</div></div>
          <h2>The full <span className="hl">CCN1 syllabus.</span><br />In your ears.</h2>
          <p className="sec-sub">Every core ACS topic, broken into short audio lessons you can actually finish between jobs.</p>
          <div className="topics-grid">
            {[
              { icon: '🔥', title: 'Gas Safety', desc: 'Regulations, RIDDOR, Gas Safe requirements', count: 8 },
              { icon: '🔧', title: 'Tightness Testing', desc: 'U-gauge, let-by, soundness procedures', count: 7 },
              { icon: '💨', title: 'Combustion', desc: 'CO, CO₂, flue gas analysis, efficiency', count: 6 },
              { icon: '🔩', title: 'Pipework', desc: 'Sizing, materials, installation standards', count: 7 },
              { icon: '🌬️', title: 'Ventilation', desc: 'Air supply, vents, flueless appliances', count: 6 },
              { icon: '🚨', title: 'Emergency Procedures', desc: 'Gas escapes, RIDDOR, customer safety', count: 5 },
            ].map(t => (
              <div key={t.title} className="topic-card">
                <div className="topic-icon">{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <span className="topic-cnt">{t.count} lessons → </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: 'var(--black2)', borderTop: '1px solid var(--border)' }}>
        <div className="sec">
          <div className="sec-eyebrow"><div className="eyebrow-pip" /><div className="eyebrow-label">Pricing</div></div>
          <h2>Straight-up <span className="hl">pricing.</span></h2>
          <p className="sec-sub">No hidden fees, no surprises. Just the revision that gets you through the ACS.</p>
          <div className="pricing-grid">
            <div className="price-card">
              <div className="p-name">Free</div>
              <div className="p-price"><span className="p-cur">£</span><span className="p-val">0</span></div>
              <div className="p-desc">Try 3 sample lessons, no card required. See if it works for you first.</div>
              <ul className="p-feats">
                <li><span className="chk-o">✓</span>3 sample lessons</li>
                <li><span className="chk-o">✓</span>Mobile player</li>
                <li><span className="chk-o">✓</span>No card needed</li>
              </ul>
              <a href="/signup" className="btn btn-dark-outline btn-lg">Get Started Free</a>
            </div>
            <div className="price-card pop">
              <div className="pop-mark">Most Popular</div>
              <div className="p-name">Course Pass</div>
              <div className="p-price"><span className="p-cur">£</span><span className="p-val">29</span></div>
              <div className="p-desc">90 days full access - built around the length of a typical gas course. Stream anywhere with signal.</div>
              <ul className="p-feats">
                <li><span className="chk-o">✓</span>All 42+ audio lessons</li>
                <li><span className="chk-o">✓</span>All 6 core topics</li>
                <li><span className="chk-o">✓</span>Speed controls (1×–2×)</li>
                <li><span className="chk-o">✓</span>Stream on any device</li>
                <li><span className="chk-o">✓</span>90 days access</li>
              </ul>
              <a href="/signup" className="btn btn-white btn-lg">Get Course Pass →</a>
            </div>
            <div className="price-card">
              <div className="p-name">Lifetime</div>
              <div className="p-price"><span className="p-cur">£</span><span className="p-val">59</span></div>
              <div className="p-desc">One payment, forever. Download lessons for offline use - works in the van with no signal.</div>
              <ul className="p-feats">
                <li><span className="chk-o">✓</span>Everything in Course Pass</li>
                <li><span className="chk-o">✓</span>Download MP3s for offline use</li>
                <li><span className="chk-o">✓</span>Works without signal</li>
                <li><span className="chk-o">✓</span>All future content</li>
              </ul>
              <a href="/signup" className="btn btn-dark-outline btn-lg">Get Lifetime Access</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-sec" id="about">
        <div className="sec">
          <div className="about-inner">
            <div>
              <div className="sec-eyebrow"><div className="eyebrow-pip" /><div className="eyebrow-label">About</div></div>
              <h2>Built by engineers.<br /><span className="hl">For anyone getting into gas.</span></h2>
              <p className="sec-sub" style={{ marginBottom: '1.5rem' }}>Get Into Gas was created for people studying for their CCN1 around a full-time job - whether that&apos;s already in the trade, or making the move from plumbing, security, retail, or anything else.</p>
              <p className="about-body-text">We&apos;ve seen it first-hand on gas courses - plumbers, security workers, people stacking shelves for years, all trying to get qualified while holding down a full-time job. Book study is valuable, but finding time for it is the hard part. Audio revision fills the gaps - commutes, breaks, the drive home - so when you do sit down with the books, it all clicks faster.</p>
              <p className="about-body-text">Every lesson is written to be direct and genuinely useful. The kind of explanation a good mentor gives you on a break, not the kind you&apos;d find in a regulation document.</p>
              <p className="about-body-text">Help anyone getting into gas pass their CCN1 with confidence - whatever their schedule looks like.</p>
            </div>
            <div className="about-cards">
              {[
                { icon: '🚗', title: 'Commute = Revision Time', desc: 'Turn every drive to site into exam prep. It all adds up fast.' },
                { icon: '🔁', title: 'Audio Retention Is Real', desc: 'Hearing concepts explained clearly, multiple times, builds knowledge that holds up when it matters.' },
                { icon: '📱', title: '10 Minutes at a Time', desc: 'Each lesson is 8-12 minutes. Designed to be started and finished in one go.' },
                { icon: '🎯', title: 'Straight Talk, No Fluff', desc: 'Written by engineers, for engineers. No academic language. Just what you need for the ACS.' },
              ].map(c => (
                <div key={c.title} className="about-card">
                  <div className="about-icon">{c.icon}</div>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-sec">
        <div className="cta-bg-text">PASS</div>
        <div className="cta-inner">
          <span className="cta-label">Invest in your future.</span>
          <h2>Turn downtime into <span className="hl">training time.</span></h2>
          <p>Every commute, every lunch, every spare 10 minutes - it all adds up.</p>
          <div className="cta-btns">
            <a href="#pricing" className="btn btn-primary btn-xl">Start Free - No Card →</a>
            <a href="#top" className="btn btn-outline btn-xl">▶ Hear a Sample First</a>
          </div>
          <p className="cta-note">Free to try · Course Pass £29 · Lifetime £59</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <a href="#top" className="logo">
              <img src="/icon.svg" width="24" height="24" alt="" style={{ borderRadius: '5px' }} />
              Get Into<em>Gas</em>
            </a>
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="#top">Sample</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#topics">Topics</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Get Into Gas. All rights reserved.</p>
            <p>CCN1 · ACS Gas Training · Audio Revision</p>
          </div>
        </div>
      </footer>
    </>
  )
}
