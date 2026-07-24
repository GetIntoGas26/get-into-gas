'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'

type Tier = 'free' | 'course_pass' | 'lifetime'
type ProgressRow = { lesson_id: string; completed_at: string | null; last_position_seconds: number }
type Lesson = { id: string; title: string; available: boolean }
type Topic = { id: string; title: string; icon: string; desc: string; lessons: Lesson[] }

// The 3 lessons free accounts can play (mirrors the `free` flags in the audio API route)
const FREE_LESSONS = new Set(['fundamentals-01', 'fundamentals-02', 'combustion-01'])

const TOPICS: Topic[] = [
  { id: 'fundamentals', title: 'Gas Fundamentals', icon: '🔥', desc: 'Role of a gas engineer, properties of gas, pressure basics', lessons: [
    { id: 'fundamentals-01', title: 'Welcome to Get Into Gas', available: true },
    { id: 'fundamentals-02', title: 'Understanding the Role of a Gas Engineer', available: true },
    { id: 'fundamentals-03', title: 'The Foundations of Gas Safety', available: true },
    { id: 'fundamentals-04', title: 'What Is Natural Gas?', available: true },
    { id: 'fundamentals-05', title: 'Properties of Natural Gas', available: true },
    { id: 'fundamentals-06', title: 'Flammability and Explosive Limits', available: true },
    { id: 'fundamentals-07', title: 'Gas Pressure Made Simple', available: true },
  ]},
  { id: 'combustion', title: 'Combustion', icon: '💨', desc: 'What combustion is, CO risks, incomplete combustion', lessons: [
    { id: 'combustion-01', title: 'What Is Combustion?', available: true },
    { id: 'combustion-02', title: 'Complete vs Incomplete Combustion', available: true },
    { id: 'combustion-03', title: 'Carbon Monoxide Explained', available: true },
    { id: 'combustion-04', title: 'Preventing Carbon Monoxide Risks', available: true },
  ]},
  { id: 'tightness', title: 'Tightness Testing', icon: '🔧', desc: 'Let-by tests, stabilisation, reading results, exam tips', lessons: [
    { id: 'tightness-01', title: 'Why Tightness Testing Matters', available: true },
    { id: 'tightness-02', title: 'Understanding Let-By Tests', available: true },
    { id: 'tightness-03', title: 'Stabilisation Explained', available: true },
    { id: 'tightness-04', title: 'Reading Tightness Test Results', available: true },
    { id: 'tightness-05', title: 'Tightness Testing Exam Tips', available: true },
  ]},
  { id: 'controls', title: 'Gas Controls', icon: '⚙️', desc: 'ECVs, isolation valves, governors, flame supervision', lessons: [
    { id: 'controls-01', title: 'Introduction to Gas Controls', available: true },
    { id: 'controls-02', title: 'Emergency Control Valves', available: true },
    { id: 'controls-03', title: 'Appliance Isolation Valves', available: true },
    { id: 'controls-04', title: 'Governors and Pressure Control', available: true },
    { id: 'controls-05', title: 'Flame Supervision Devices', available: true },
  ]},
  { id: 'unsafe', title: 'Unsafe Situations', icon: '⚠️', desc: 'ID, AR and NCS classifications - what they mean and how to respond', lessons: [
    { id: 'unsafe-01', title: 'Understanding Unsafe Situations', available: true },
    { id: 'unsafe-02', title: 'Immediately Dangerous', available: true },
    { id: 'unsafe-03', title: 'At Risk', available: true },
    { id: 'unsafe-04', title: 'Not to Current Standards', available: false },
  ]},
]

const SPEEDS = [1, 1.25, 1.5, 2]
const SPEED_LABELS = ['1×', '1.25×', '1.5×', '2×']

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const ss = Math.floor(s % 60)
  return `${m}:${String(ss).padStart(2, '0')}`
}

// ─── Icons ───────────────────────────────────────────────────────────────
function IconPlay({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
}
function IconPause({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  )
}
function IconSpinner({ size = 16 }: { size?: number }) {
  return (
    <svg className="ls-spin" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
  )
}
function IconRewind({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 5v14L3 12z" /><path d="M21 5v14l-9-7z" />
    </svg>
  )
}
function IconForward({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 5v14l9-7z" /><path d="M3 5v14l9-7z" />
    </svg>
  )
}
function IconVolHigh({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" stroke="none" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" /><path d="M19 6a9 9 0 0 1 0 12" />
    </svg>
  )
}
function IconVolLow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" stroke="none" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" />
    </svg>
  )
}
function IconVolMute({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" stroke="none" />
      <path d="M17 9l5 6M22 9l-5 6" />
    </svg>
  )
}
function IconDownload({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M5 21h14" />
    </svg>
  )
}
function IconCheck({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
function IconLock({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 1 1 8 0v4" />
    </svg>
  )
}

export default function LessonsClient({ userId, userEmail, tier, initialProgress }: {
  userId: string
  userEmail: string
  tier: Tier
  initialProgress: ProgressRow[]
}) {
  const supabase = useMemo(() => createClient(), [])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const urlCache = useRef<Record<string, string>>({})
  const currentLessonIdRef = useRef<string | null>(null)
  const playingRef = useRef(false)
  const barRef = useRef<HTMLDivElement | null>(null)
  // Resume playback: last saved position per lesson, seek pending for next load, throttle marker
  const savedPositions = useRef<Record<string, number>>(
    Object.fromEntries(initialProgress.map(p => [p.lesson_id, p.last_position_seconds]))
  )
  const pendingSeekRef = useRef(0)
  const lastSaveRef = useRef(0)

  const [activeTopic, setActiveTopic] = useState(TOPICS[0].id)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speedIdx, setSpeedIdx] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [dragPct, setDragPct] = useState(0)
  const [listened, setListened] = useState<Set<string>>(
    new Set(initialProgress.filter(p => p.completed_at).map(p => p.lesson_id))
  )

  useEffect(() => { playingRef.current = playing }, [playing])
  useEffect(() => { if (audioRef.current) audioRef.current.volume = muted ? 0 : volume }, [volume, muted])

  const markListened = useCallback((lessonId: string) => {
    setListened(prev => new Set([...prev, lessonId]))
    supabase.from('lesson_progress').upsert(
      { user_id: userId, lesson_id: lessonId, completed_at: new Date().toISOString(), last_position_seconds: 0 },
      { onConflict: 'user_id,lesson_id' }
    ).then(() => {})
  }, [supabase, userId])

  // Persist resume position. Omits completed_at so an existing "completed" mark is preserved.
  const savePosition = useCallback((lessonId: string, seconds: number) => {
    savedPositions.current[lessonId] = seconds
    supabase.from('lesson_progress').upsert(
      { user_id: userId, lesson_id: lessonId, last_position_seconds: Math.floor(seconds) },
      { onConflict: 'user_id,lesson_id' }
    ).then(() => {})
  }, [supabase, userId])

  const getOrCreateAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio()
      audio.volume = muted ? 0 : volume
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
        setAudioProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
        // Save resume position roughly every 10s of playback
        const id = currentLessonIdRef.current
        if (id && Math.abs(audio.currentTime - lastSaveRef.current) >= 10) {
          lastSaveRef.current = audio.currentTime
          savePosition(id, audio.currentTime)
        }
      })
      audio.addEventListener('durationchange', () => setDuration(audio.duration))
      // Seek to saved position once the new source's metadata is ready
      audio.addEventListener('loadedmetadata', () => {
        const seek = pendingSeekRef.current
        if (seek > 0 && audio.duration && seek < audio.duration - 5) {
          audio.currentTime = seek
        }
        pendingSeekRef.current = 0
      })
      audio.addEventListener('ended', () => {
        setPlaying(false)
        setAudioProgress(0)
        setCurrentTime(0)
        if (currentLessonIdRef.current) {
          savedPositions.current[currentLessonIdRef.current] = 0
          markListened(currentLessonIdRef.current)
        }
      })
      audioRef.current = audio
    }
    return audioRef.current
  }, [markListened, savePosition, muted, volume])

  const playLesson = useCallback(async (lesson: Lesson) => {
    if (!lesson.available) return

    // Same lesson — toggle play/pause
    if (currentLessonIdRef.current === lesson.id && audioRef.current?.src) {
      if (playingRef.current) {
        audioRef.current.pause()
        setPlaying(false)
        savePosition(lesson.id, audioRef.current.currentTime)
      } else {
        await audioRef.current.play()
        setPlaying(true)
      }
      return
    }

    // New lesson
    audioRef.current?.pause()
    setAudioProgress(0)
    setCurrentTime(0)
    setDuration(0)
    setLoading(true)
    currentLessonIdRef.current = lesson.id

    try {
      if (!urlCache.current[lesson.id]) {
        const res = await fetch(`/api/audio/${lesson.id}`)
        if (!res.ok) throw new Error('Audio unavailable')
        const { url } = await res.json()
        urlCache.current[lesson.id] = url
      }
      const audio = getOrCreateAudio()
      // Queue resume-to position; applied on loadedmetadata
      pendingSeekRef.current = savedPositions.current[lesson.id] ?? 0
      lastSaveRef.current = pendingSeekRef.current
      audio.src = urlCache.current[lesson.id]
      audio.playbackRate = SPEEDS[speedIdx]
      await audio.play()
      setCurrentLesson(lesson)
      setPlaying(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [speedIdx, getOrCreateAudio, savePosition])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playingRef.current) {
      audio.pause()
      setPlaying(false)
      if (currentLessonIdRef.current) savePosition(currentLessonIdRef.current, audio.currentTime)
    } else {
      await audio.play()
      setPlaying(true)
    }
  }, [savePosition])

  const skip = useCallback((delta: number) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + delta))
  }, [])

  const pctFromClientX = useCallback((clientX: number) => {
    const bar = barRef.current
    if (!bar) return 0
    const rect = bar.getBoundingClientRect()
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  }, [])

  const onBarPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!audioRef.current?.duration) return
    e.currentTarget.setPointerCapture(e.pointerId)
    const pct = pctFromClientX(e.clientX)
    setDragging(true)
    setDragPct(pct)
    audioRef.current.currentTime = pct * audioRef.current.duration
  }, [pctFromClientX])

  const onBarPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !audioRef.current?.duration) return
    const pct = pctFromClientX(e.clientX)
    setDragPct(pct)
    audioRef.current.currentTime = pct * audioRef.current.duration
  }, [dragging, pctFromClientX])

  const onBarPointerUp = useCallback(() => {
    setDragging(false)
  }, [])

  const toggleMute = useCallback(() => setMuted(m => !m), [])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    setVolume(v)
    setMuted(v === 0)
  }, [])

  const cycleSpeed = useCallback(() => {
    const next = (speedIdx + 1) % SPEEDS.length
    setSpeedIdx(next)
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next]
  }, [speedIdx])

  const downloadLesson = useCallback(async (lessonId: string) => {
    try {
      const res = await fetch(`/api/audio/${lessonId}/download`)
      if (!res.ok) throw new Error('Download unavailable')
      const { url } = await res.json()
      const a = document.createElement('a')
      a.href = url
      a.download = ''
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (e) {
      console.error(e)
    }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const handleRow = useCallback((lesson: Lesson) => {
    if (!lesson.available) return
    if (tier === 'free' && !FREE_LESSONS.has(lesson.id)) {
      window.location.href = '/#pricing'
      return
    }
    playLesson(lesson)
  }, [tier, playLesson])

  useEffect(() => () => {
    const audio = audioRef.current
    if (audio && currentLessonIdRef.current && audio.currentTime > 0 && !audio.ended) {
      savePosition(currentLessonIdRef.current, audio.currentTime)
    }
    audio?.pause()
  }, [savePosition])

  const activeTopicObj = TOPICS.find(t => t.id === activeTopic) ?? TOPICS[0]
  const topicLessons = activeTopicObj.lessons
  const currentTopic = TOPICS.find(t => t.lessons.some(l => l.id === currentLesson?.id))

  const totalAvailable = useMemo(() => TOPICS.flatMap(t => t.lessons).filter(l => l.available).length, [])
  const topicAvailable = topicLessons.filter(l => l.available)
  const topicCompleted = topicAvailable.filter(l => listened.has(l.id)).length
  const topicPct = topicAvailable.length ? (topicCompleted / topicAvailable.length) * 100 : 0

  const barPct = dragging ? dragPct * 100 : audioProgress
  const VolIcon = muted || volume === 0 ? IconVolMute : volume < 0.5 ? IconVolLow : IconVolHigh

  return (
    <div className="ls-page">

      {/* Header */}
      <header className="ls-header">
        <a href="/" className="logo">
          <img src="/icon.svg" width="24" height="24" alt="" style={{ borderRadius: '5px' }} />
          Get Into<em>Gas</em>
        </a>
        <div className="ls-header-right">
          <span className="ls-progress-pill">{listened.size}/{totalAvailable} completed</span>
          {tier === 'free' && (
            <a href="/#pricing" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }}>
              Unlock all lessons →
            </a>
          )}
          <span className="ls-tier-badge">
            {tier === 'lifetime' ? '⭐ Lifetime' : tier === 'course_pass' ? '📚 Study Bundle' : '✦ Free plan'}
          </span>
          {userEmail && <span className="ls-email" title={userEmail}>{userEmail}</span>}
          <button className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }} onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      {/* Topic tabs */}
      <div className="ls-topics">
        {TOPICS.map(t => (
          <button
            key={t.id}
            className={`ls-tab${activeTopic === t.id ? ' active' : ''}`}
            onClick={() => setActiveTopic(t.id)}
          >
            {t.icon} {t.title}
          </button>
        ))}
      </div>

      {/* Main scrollable area */}
      <main className="ls-main">
        <div className="ls-list">

          {/* Topic banner */}
          <div className="ls-topic-banner">
            <div className="ls-topic-icon">{activeTopicObj.icon}</div>
            <div className="ls-topic-meta">
              <h2 className="ls-topic-title">{activeTopicObj.title}</h2>
              <p className="ls-topic-desc">{activeTopicObj.desc}</p>
            </div>
            <div className="ls-topic-progress">
              <span className="ls-topic-progress-label">{topicCompleted}/{topicAvailable.length} done</span>
              <div className="ls-topic-bar"><div className="ls-topic-fill" style={{ width: `${topicPct}%` }} /></div>
            </div>
          </div>

          {topicLessons.map((lesson, i) => {
            const isCurrent = currentLesson?.id === lesson.id
            const isListened = listened.has(lesson.id)
            const locked = tier === 'free' && !FREE_LESSONS.has(lesson.id)
            const resumeSecs = savedPositions.current[lesson.id]
            return (
              <div
                key={lesson.id}
                className={`ls-row${isCurrent ? ' ls-current' : ''}${!lesson.available ? ' ls-unavail' : ''}${locked && lesson.available ? ' ls-locked' : ''}`}
                onClick={() => handleRow(lesson)}
              >
                <div className="ls-num">
                  {isListened
                    ? <span className="ls-check"><IconCheck /></span>
                    : (!lesson.available || locked)
                      ? <span className="ls-lock-badge"><IconLock /></span>
                      : <span>{i + 1}</span>
                  }
                </div>
                <div className="ls-info">
                  <span className="ls-title">{lesson.title}</span>
                  {!lesson.available
                    ? <span className="ls-soon">Coming soon</span>
                    : locked
                      ? <span className="ls-soon">Members only</span>
                      : (!isListened && resumeSecs > 0)
                        ? <span className="ls-resume">Resume at {fmt(resumeSecs)}</span>
                        : null}
                </div>
                <div className="ls-action">
                  {!lesson.available
                    ? <IconLock />
                    : locked
                      ? <IconLock />
                      : (isCurrent && playing ? <IconPause size={15} /> : <IconPlay size={15} />)
                  }
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Fixed bottom player */}
      {currentLesson && (
        <div className="ls-player">
          <div className="ls-pl-info">
            <div className="ls-pl-title">{currentLesson.title}</div>
            <div className="ls-pl-topic">{currentTopic?.icon} {currentTopic?.title}</div>
          </div>

          <div className="ls-pl-center">
            <div className="ls-pl-controls">
              <button className="ls-pl-skip" onClick={() => skip(-15)} title="Back 15 seconds" aria-label="Back 15 seconds">
                <IconRewind /><span className="ls-skip-label">15</span>
              </button>
              <button className="ls-pl-btn" onClick={togglePlay} disabled={loading}>
                {loading ? <IconSpinner /> : playing ? <IconPause /> : <IconPlay />}
              </button>
              <button className="ls-pl-skip" onClick={() => skip(15)} title="Forward 15 seconds" aria-label="Forward 15 seconds">
                <IconForward /><span className="ls-skip-label">15</span>
              </button>
            </div>
            <div className="ls-pl-progress">
              <div
                ref={barRef}
                className={`ls-pl-bar${dragging ? ' dragging' : ''}`}
                onPointerDown={onBarPointerDown}
                onPointerMove={onBarPointerMove}
                onPointerUp={onBarPointerUp}
              >
                <div className="ls-pl-fill" style={{ width: `${barPct}%` }} />
                <div className="ls-pl-thumb" style={{ left: `${barPct}%` }} />
              </div>
              <div className="ls-pl-times">
                <span>{fmt(currentTime)}</span>
                <span>{duration ? fmt(duration) : '--:--'}</span>
              </div>
            </div>
          </div>

          <div className="ls-pl-right">
            <div className="ls-vol">
              <button className="ls-vol-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
                <VolIcon />
              </button>
              <input
                type="range" min={0} max={1} step={0.01}
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="ls-vol-range"
                aria-label="Volume"
                style={{ '--vol-pct': `${(muted ? 0 : volume) * 100}%` } as React.CSSProperties}
              />
            </div>
            {tier === 'lifetime' && (
              <button className="ls-pl-spd" title="Download for offline" onClick={() => downloadLesson(currentLesson.id)}>
                <IconDownload />
              </button>
            )}
            <button className="ls-pl-spd ls-pl-spd-text" onClick={cycleSpeed}>{SPEED_LABELS[speedIdx]}</button>
          </div>
        </div>
      )}

    </div>
  )
}
