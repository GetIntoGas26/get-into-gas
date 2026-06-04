'use client'

import { useState, useRef, useEffect } from 'react'

const WAVE_HEIGHTS = [20,36,52,40,60,44,54,28,64,48,38,58,42,52,34,62,48,38,55,45,60,40,50,35,25,45,55,40,60,48,35,52,42,58,38,48,62,45,55,35,48,40,52,45,38,60,42,55,35,48]
const PLAYED_IDX = 18
const TOTAL_SECS = 684
const SPEEDS = ['1×', '1.25×', '1.5×', '2×']

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(36)
  const [speedIdx, setSpeedIdx] = useState(2)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setPlaying(false)
            return 100
          }
          return Math.min(p + 0.05, 100)
        })
      }, 100)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing])

  const currentTime = () => {
    const secs = Math.floor((progress / 100) * TOTAL_SECS)
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  const scrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    setProgress(pct)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="audio-card-wrap">
      <div className="audio-card" id="sample">
        <div className="audio-card-glow" />
        <div className="audio-card-top" />

        <div className="lsn-module">Sample Lesson · Gas Safety</div>
        <div className="lsn-title">Gas Tightness Testing — ACS Essentials</div>
        <div className="lsn-meta">Module 2 of 6 · 11 min 24 sec</div>

        <div className="waveform">
          {WAVE_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className={`wb${i < PLAYED_IDX ? ' p' : ''}${i === PLAYED_IDX && playing ? ' a' : ''}`}
              style={{ height: h }}
            />
          ))}
        </div>

        <div className="player-row">
          <button className="play-btn" onClick={() => setPlaying(p => !p)}>
            {playing ? '⏸' : '▶'}
          </button>
          <div className="progress-wrap">
            <div className="prog-bar" onClick={scrub}>
              <div className="prog-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="time-row">
              <span>{currentTime()}</span>
              <span>11:24</span>
            </div>
          </div>
          <button className="spd" onClick={() => setSpeedIdx(i => (i + 1) % SPEEDS.length)}>
            {SPEEDS[speedIdx]}
          </button>
        </div>

        <div className="card-tags">
          <span className="c-tag">Gas Safety Regs</span>
          <span className="c-tag">Practical</span>
          <span className="c-tag">Exam Focus</span>
        </div>
      </div>

      <div className="mini-lessons">
        <div className="mini-lesson" onClick={() => scrollTo('sample')}>
          <div className="ml-icon">🔥</div>
          <div className="ml-info">
            <div className="ml-title">Gas Safety Fundamentals</div>
            <div className="ml-meta">Module 1 · 9 min 15 sec</div>
          </div>
          <div className="ml-play">▶</div>
        </div>
        <div className="mini-lesson" onClick={() => scrollTo('sample')}>
          <div className="ml-icon">💨</div>
          <div className="ml-info">
            <div className="ml-title">Combustion &amp; CO Awareness</div>
            <div className="ml-meta">Module 3 · 12 min 02 sec</div>
          </div>
          <div className="ml-play">▶</div>
        </div>
        <div className="mini-lesson locked" onClick={() => scrollTo('pricing')}>
          <div className="ml-icon">🔩</div>
          <div className="ml-info">
            <div className="ml-title">Pipework Standards</div>
            <div className="ml-meta">Module 4 · 10 min 44 sec · Members only</div>
          </div>
          <div className="ml-play">🔒</div>
        </div>
      </div>
    </div>
  )
}
