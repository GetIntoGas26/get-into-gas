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
              Audio revision lessons built for working gas engineers. No desk, no textbooks, no wasted time.
              Revise in the van, on the tools, anywhere.
            </p>
            <div className="hero-btns">
              <a href="#pricing" className="btn btn-primary btn-lg">Start Free — No Card Needed</a>
              <a href="#sample" className="btn btn-outline btn-lg">▶ Hear a Sample</a>
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

      {/* PROBLEM */}
      <section>
        <div className="sec">
          <div className="sec-eyebrow"><div className="eyebrow-pip" /><div className="eyebrow-label">The Problem</div></div>
          <h2>The old way<br />doesn&apos;t work for <span className="hl">working engineers.</span></h2>
          <p className="sec-sub">Textbooks in the van. Study after a 10-hour shift. It&apos;s not realistic — and it shouldn&apos;t have to be.</p>
          <div className="prob-grid">
            <div className="prob-card">
              <div className="prob-accent" />
              <div className="prob-number">01</div>
              <h3>No time to sit and study</h3>
              <p>Long days on the tools leave little energy for textbook revision in the evenings. Life gets in the way.</p>
            </div>
            <div className="prob-card">
              <div className="prob-accent" />
              <div className="prob-number">02</div>
              <h3>Dry material, written for academics</h3>
              <p>Gas regulations read like legal documents. Most revision resources aren&apos;t built for how engineers actually learn.</p>
            </div>
            <div className="prob-card">
              <div className="prob-accent" />
              <div className="prob-number">03</div>
              <h3>High stakes, low confidence</h3>
              <p>The ACS matters for your career. Walking in underprepared is a real risk when revision doesn&apos;t fit your life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="hiw-bg">
        <div className="sec">
          <div className="sec-eyebrow"><div className="eyebrow-pip" /><div className="eyebrow-label">How It Works</div></div>
          <h2>Three steps.<br /><span className="hl">No excuses.</span></h2>
          <p className="sec-sub">Designed around how working engineers actually have time to learn. Simple, focused, effective.</p>
          <div className="steps">
            <div className="step">
              <div className="step-head"><div className="step-num">1</div><h3>Pick Your Topic</h3></div>
              <p>Choose from 6 focused CCN1 modules — gas safety, tightness testing, combustion and more. Start exactly where you need to.</p>
            </div>
            <div className="step">
              <div className="step-head"><div className="step-num">2</div><h3>Press Play, Go</h3></div>
              <p>Drive to site, grab lunch, walk the dog — expert audio lessons work anywhere you are. No desk, no screen time needed.</p>
            </div>
            <div className="step">
              <div className="step-head"><div className="step-num">3</div><h3>Know Your Stuff</h3></div>
              <p>Repeated audio builds genuine retention. Walk into your ACS assessment prepared, not hoping — knowing.</p>
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

      {/* BENEFITS */}
      <section>
        <div className="sec">
          <div className="sec-eyebrow"><div className="eyebrow-pip" /><div className="eyebrow-label">Why ACS Audio</div></div>
          <h2>Built for engineers<br /><span className="hl2">on the tools.</span></h2>
          <p className="sec-sub">Not a classroom product repackaged for mobile. Built from the ground up for how working engineers actually live.</p>
          <div className="ben-grid">
            {[
              { icon: '🚗', title: 'Commute = Revision Time', desc: 'Turn every drive to site into exam prep. Between jobs, first thing, last thing — it all adds up fast.' },
              { icon: '🔁', title: 'Audio Retention Is Real', desc: 'Hearing concepts explained clearly, multiple times, builds the kind of knowledge that holds up when it matters.' },
              { icon: '📱', title: '10 Minutes at a Time', desc: 'Each lesson is 8–12 minutes. Designed to be started and finished in one go. No chapters. No homework.' },
              { icon: '🎯', title: 'Straight Talk, No Fluff', desc: 'Written by engineers, for engineers. No academic language. No padding. Just what you need for the ACS.' },
            ].map(b => (
              <div key={b.title} className="ben-card">
                <div className="ben-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
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
          <p className="sec-sub">No bullshit. No hidden fees. Just access to the revision that gets you through the ACS.</p>
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
              <a href="#pricing" className="btn btn-dark-outline btn-lg">Get Started Free</a>
            </div>
            <div className="price-card pop">
              <div className="pop-mark">Popular</div>
              <div className="p-name">Monthly</div>
              <div className="p-price"><span className="p-cur">£</span><span className="p-val">14</span><span className="p-per">/mo</span></div>
              <div className="p-desc">Full access. All lessons, all topics. Cancel any time, no questions asked.</div>
              <ul className="p-feats">
                <li><span className="chk-o">✓</span>All 42+ audio lessons</li>
                <li><span className="chk-o">✓</span>All 6 core topics</li>
                <li><span className="chk-o">✓</span>New content monthly</li>
                <li><span className="chk-o">✓</span>Speed controls (1×–2×)</li>
                <li><span className="chk-o">✓</span>Cancel anytime</li>
              </ul>
              <a href="#" className="btn btn-white btn-lg">Start Free Trial →</a>
            </div>
            <div className="price-card">
              <div className="p-name">Lifetime</div>
              <div className="p-price"><span className="p-cur">£</span><span className="p-val">97</span></div>
              <div className="p-desc">One payment. All content, forever. Best value for apprenticeships and long-term training.</div>
              <ul className="p-feats">
                <li><span className="chk-o">✓</span>Everything in Monthly</li>
                <li><span className="chk-o">✓</span>All future content</li>
                <li><span className="chk-o">✓</span>Downloadable MP3s</li>
                <li><span className="chk-o">✓</span>Priority support</li>
              </ul>
              <a href="#" className="btn btn-dark-outline btn-lg">Get Lifetime Access</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-sec" id="about">
        <div className="sec">
          <div className="sec-eyebrow"><div className="eyebrow-pip" /><div className="eyebrow-label">About</div></div>
          <h2>Built by engineers.<br /><span className="hl">For engineers.</span></h2>
          <p className="sec-sub">ACS Audio was created because traditional revision doesn&apos;t work for people with full-time jobs on the tools.</p>
          <div className="about-inner">
            <div>
              <p className="about-body-text">We know what it&apos;s like to face an ACS assessment with a busy diary and no energy left for textbooks in the evening. We built the revision resource we wished we&apos;d had — practical, audio-first, and designed around how working engineers actually live.</p>
              <p className="about-body-text">Every lesson is written to be direct and genuinely useful. The kind of explanation a good mentor gives you in the van, not the kind you&apos;d find in a regulation document.</p>
              <p className="about-body-text">Our goal is simple: help working gas engineers pass their ACS with confidence, whatever their schedule looks like.</p>
            </div>
            <div className="about-cards">
              {[
                { icon: '🎯', title: '100% Exam Focused', desc: 'Every lesson is built around what actually comes up in the ACS assessment. No filler, no fluff.' },
                { icon: '👷', title: 'Written by Gas Engineers', desc: 'Content written and reviewed by experienced, registered gas engineers — not academics.' },
                { icon: '📱', title: 'Genuinely Mobile First', desc: 'Built for your phone. Works in the van, on the go, wherever you are.' },
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
          <span className="cta-label">Ready? Start now.</span>
          <h2>Turn downtime into <span className="hl">training time.</span></h2>
          <p>Every commute, every lunch, every spare 10 minutes. Your ACS assessment won&apos;t wait — and neither should you.</p>
          <div className="cta-btns">
            <a href="#pricing" className="btn btn-primary btn-xl">Start Free — No Card →</a>
            <a href="#sample" className="btn btn-outline btn-xl">▶ Hear a Sample First</a>
          </div>
          <p className="cta-note">Free trial · Cancel any time · Full CCN1 coverage</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#top" className="logo"><div className="logo-mark">🎧</div>ACS<em>Audio</em></a>
              <p>CCN1 audio revision built for working gas engineers. Listen anywhere, pass with confidence.</p>
            </div>
            <div className="footer-col">
              <h4>Learn</h4>
              <ul>
                <li><a href="#topics">Topic Library</a></li>
                <li><a href="#sample">Sample Lesson</a></li>
                <li><a href="#top">How It Works</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Account</h4>
              <ul>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#pricing">Sign Up</a></li>
                <li><a href="#pricing">Log In</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#about">Contact</a></li>
                <li><a href="#">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 ACS Audio. All rights reserved.</p>
            <p>CCN1 · ACS Gas Training · Audio Revision</p>
          </div>
        </div>
      </footer>
    </>
  )
}
