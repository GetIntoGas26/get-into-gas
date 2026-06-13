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
              Future Gas Engineers · CCN1 · ACS Assessments
            </div>
            <h1>
              <span className="hl">Learn</span> While<br />
              <span className="hl2">Living.</span>
            </h1>
            <p className="hero-tagline">The UK&apos;s Audio-First CCN1 Revision Platform</p>
            <p className="hero-sub">
              Turn driving time, walking time and downtime into productive revision time - practical audio lessons for future gas engineers.
            </p>
            <div className="hero-btns">
              <a href="/signup" className="btn btn-primary btn-lg">Start Learning →</a>
              <a href="#top" className="btn btn-outline btn-lg">▶ Listen to a Free Lesson</a>
            </div>
            <div className="trust-row">
              <div className="trust-item"><span className="trust-icon">✓</span>Free to try</div>
              <div className="trust-item"><span className="trust-icon">✓</span>No card needed</div>
              <div className="trust-item"><span className="trust-icon">✓</span>Full CCN1 coverage</div>
            </div>
          </div>
          <AudioPlayer />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          <span>🎧 <strong>CCN1 Audio Revision</strong></span>
          <span>·</span><span>✓ <strong>Gas Fundamentals</strong></span>
          <span>·</span><span>✓ <strong>Combustion</strong></span>
          <span>·</span><span>✓ <strong>Tightness Testing</strong></span>
          <span>·</span><span>✓ <strong>Gas Controls</strong></span>
          <span>·</span><span>✓ <strong>Unsafe Situations</strong></span>
          <span>·</span><span>🎧 <strong>ACS Gas Training</strong></span>
          <span>·</span><span>✓ <strong>CCN1 Audio Revision</strong></span>
          <span>·</span><span>✓ <strong>Gas Fundamentals</strong></span>
          <span>·</span><span>✓ <strong>Combustion</strong></span>
          <span>·</span><span>✓ <strong>Tightness Testing</strong></span>
          <span>·</span><span>✓ <strong>Gas Controls</strong></span>
          <span>·</span><span>✓ <strong>Unsafe Situations</strong></span>
          <span>·</span>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="hiw-bg" id="how-it-works">
        <div className="sec">
          <div className="sec-eyebrow"><div className="eyebrow-pip" /><div className="eyebrow-label">The Problem</div></div>
          <h2>Finding time to revise<br /><span className="hl">isn&apos;t easy.</span></h2>
          <p className="sec-sub">As a trainee gas engineer, your days are already busy. Between work, training, family life and travelling, finding extra hours for revision can feel impossible. Many learners know what they need to study - the challenge is finding the time to do it.</p>
          <div className="solution-block">
            <h3 className="solution-title">That&apos;s Why We Created Get Into Gas</h3>
            <p className="solution-sub">Instead of adding more study hours to your week, we help you use the time you already have.</p>
            <div className="listen-while">
              <p className="listen-label">Listen while:</p>
              <div className="listen-grid">
                {['🚗 Driving to training', '🐕 Walking the dog', '🏃 Going for a run', '🚆 Commuting', '🏋️ At the gym', '📝 Working through notes'].map(item => (
                  <div key={item} className="listen-item">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY AUDIO WORKS */}
      <section id="why-audio">
        <div className="sec">
          <div className="sec-eyebrow"><div className="eyebrow-pip" /><div className="eyebrow-label">Why Audio Learning Works</div></div>
          <h2>Make the most of time<br /><span className="hl">you already have.</span></h2>
          <div className="ben-grid">
            {[
              { icon: '⏱️', title: "Learn During Time You'd Otherwise Lose", desc: "Make use of journeys, walks and waiting time. Every spare minute becomes productive revision time." },
              { icon: '🔁', title: 'Improve Recall Through Repetition', desc: 'Hear important concepts again and again. Repeated listening builds the kind of memory that sticks.' },
              { icon: '🧠', title: 'Reduce Revision Overwhelm', desc: 'Focus on one topic at a time. Short, focused lessons make even the densest material feel manageable.' },
              { icon: '💪', title: 'Build Confidence', desc: 'Arrive at your training sessions and assessments truly knowing the fundamentals - not just hoping you do.' },
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

      {/* TOPICS */}
      <section className="topics-bg" id="topics">
        <div className="sec">
          <div className="sec-eyebrow"><div className="eyebrow-pip" /><div className="eyebrow-label">Topics Covered</div></div>
          <h2>The full <span className="hl">CCN1 syllabus.</span><br />In your ears.</h2>
          <p className="sec-sub">25 lessons across 5 core topics. Every one built to be started and finished in a single commute.</p>
          <div className="topics-grid">
            {[
              { icon: '🔥', title: 'Gas Fundamentals', desc: 'Role of a gas engineer, properties of gas, pressure basics', count: 7 },
              { icon: '💨', title: 'Combustion', desc: 'What combustion is, CO risks, incomplete combustion', count: 4 },
              { icon: '🔧', title: 'Tightness Testing', desc: 'Let-by tests, stabilisation, reading results, exam tips', count: 5 },
              { icon: '⚙️', title: 'Gas Controls', desc: 'ECVs, isolation valves, governors, flame supervision', count: 5 },
              { icon: '⚠️', title: 'Unsafe Situations', desc: 'ID, AR and NCS classifications - what they mean and how to respond', count: 4 },
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
          <p className="sec-sub">No hidden fees, no surprises. Just the revision that helps get you through your ACS.</p>
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
              <div className="p-name">Study Bundle</div>
              <div className="p-price"><span className="p-cur">£</span><span className="p-val">49</span></div>
              <div className="p-desc">90 days full access - built around the length of a typical gas training period. Stream anywhere with signal.</div>
              <ul className="p-feats">
                <li><span className="chk-o">✓</span>All 25 audio lessons</li>
                <li><span className="chk-o">✓</span>All 5 core topics</li>
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
              <p className="about-body-text">We help anyone getting into gas pass their CCN1 with confidence - whatever their schedule looks like.</p>
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
          <h2>Start Learning<br /><span className="hl">While Living.</span></h2>
          <p>Join the future gas engineers already using audio revision to make the most of every spare minute.</p>
          <div className="cta-btns">
            <a href="/signup" className="btn btn-primary btn-xl">Start Learning →</a>
            <a href="#top" className="btn btn-outline btn-xl">▶ Listen to a Free Lesson</a>
          </div>
          <p className="cta-note">Free to try · Study Bundle £49 · Lifetime £59</p>
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
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap' }}>
              <li><a href="#top">Sample</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#topics">Topics</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="/terms">Terms</a></li>
              <li><a href="/privacy">Privacy</a></li>
              <li><a href="/refunds">Refunds</a></li>
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
