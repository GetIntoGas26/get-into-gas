'use client'

import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <>
      <nav>
        <div className="nav-inner">
          <a href="#top" className="logo">
            <div className="logo-mark">🎧</div>
            Get Into<em>Gas</em>
          </a>
          <ul className="nav-links">
            <li><a href="#top">Sample</a></li>
            <li><a href="#topics">Topics</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          <div className="nav-end">
            <a href="#pricing" className="btn btn-ghost">Log in</a>
            <a href="#pricing" className="btn btn-primary">Start Free</a>
            <button
              className={`hamburger${open ? ' is-open' : ''}`}
              aria-label="Menu"
              onClick={() => setOpen(o => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <a href="#top" onClick={close}>Sample</a>
        <a href="#topics" onClick={close}>Topics</a>
        <a href="#pricing" onClick={close}>Pricing</a>
        <a href="#about" onClick={close}>About</a>
        <a href="#pricing" className="btn btn-ghost" onClick={close}>Log in</a>
        <a href="#pricing" className="btn btn-primary" onClick={close}>Start Free</a>
      </div>
    </>
  )
}
