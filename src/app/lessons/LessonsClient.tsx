'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'

type Tier = 'free' | 'course_pass' | 'lifetime'
type ProgressRow = { lesson_id: string; completed_at: string | null; last_position_seconds: number }
type Lesson = { id: string; title: string; available: boolean }
type Topic = { id: string; title: string; icon: string; lessons: Lesson[] }

// The 3 lessons free accounts can play (mirrors the `free` flags in the audio API route)
const FREE_LESSONS = new Set(['fundamentals-01', 'fundamentals-02', 'combustion-01'])

const TOPICS: Topic[] = [
  { id: 'fundamentals', title: 'Gas Fundamentals', icon: '🔥', lessons: [
    { id: 'fundamentals-01', title: 'Welcome to Get Into Gas', available: true },
    { id: 'fundamentals-02', title: 'Understanding the Role of a Gas Engineer', available: true },
    { id: 'fundamentals-03', title: 'The Foundations of Gas Safety', available: true },
    { id: 'fundamentals-04', title: 'What Is Natural Gas?', available: true },
    { id: 'fundamentals-05', title: 'Properties of Natural Gas', available: true },
    { id: 'fundamentals-06', title: 'Flammability and Explosive Limits', available: true },
    { id: 'fundamentals-07', title: 'Gas Pressure Made Simple', available: true },
  ]},
  { id: 'combustion', title: 'Combustion', icon: '💨', lessons: [
    { id: 'combustion-01', title: 'What Is Combustion?', available: true },
    { id: 'combustion-02', title: 'Complete vs Incomplete Combustion', available: true },
    { id: 'combustion-03', title: 'Carbon Monoxide Explained', available: true },
    { id: 'combustion-04', title: 'Preventing Carbon Monoxide Risks', available: true },
  ]},
  { id: 'tightness', title: 'Tightness Testing', icon: '🔧', lessons: [
    { id: 'tightness-01', title: 'Why Tightness Testing Matters', available: true },
    { id: 'tightness-02', title: 'Understanding Let-By Tests', available: true },
    { id: 'tightness-03', title: 'Stabilisation Explained', available: true },
    { id: 'tightness-04', title: 'Reading Tightness Test Results', available: true },
    { id: 'tightness-05', title: 'Tightness Testing Exam Tips', available: true },
  ]},
  { id: 'controls', title: 'Gas Controls', icon: '⚙️', lessons: [
    { id: 'controls-01', title: 'Introduction to Gas Controls', available: true },
    { id: 'controls-02', title: 'Emergency Control Valves', available: true },
    { id: 'controls-03', title: 'Appliance Isolation Valves', available: true },
    { id: 'controls-04', title: 'Governors and Pressure Control', available: true },
    { id: 'controls-05', title: 'Flame Supervision Devices', available: true },
  ]},
  { id: 'unsafe', title: 'Unsafe Situations', icon: '⚠️', lessons: [
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

  const [activeTopic, setActiveTopic] = useState(TOPICS[0].id)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speedIdx, setSpeedIdx] = useState(0)
  const [listened, setListened] = useState<Set<string>>(
    new Set(initialProgress.filter(p => p.completed_at).map(p => p.lesson_id))
  )

  useEffect(() => { playingRef.current = playing }, [playing])

  const markListened = useCallback((lessonId: string) => {
    setListened(prev => new Set([...prev, lessonId]))
    supabase.from('lesson_progress').upsert(
      { user_id: userId, lesson_id: lessonId, completed_at: new Date().toISOString(), last_position_seconds: 0 },
      { onConflict: 'user_id,lesson_id' }
    ).then(() => {})
  }, [supabase, userId])

  const getOrCreateAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio()
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
        setAudioProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
      })
      audio.addEventListener('durationchange', () => setDuration(audio.duration))
      audio.addEventListener('ended', () => {
        setPlaying(false)
        setAudioProgress(0)
        setCurrentTime(0)
        if (currentLessonIdRef.current) markListened(currentLessonIdRef.current)
      })
      audioRef.current = audio
    }
    return audioRef.current
  }, [markListened])

  const playLesson = useCallback(async (lesson: Lesson) => {
    if (!lesson.available) return

    // Same lesson — toggle play/pause
    if (currentLessonIdRef.current === lesson.id && audioRef.current?.src) {
      if (playingRef.current) {
        audioRef.current.pause()
        setPlaying(false)
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
  }, [speedIdx, getOrCreateAudio])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playingRef.current) {
      audio.pause()
      setPlaying(false)
    } else {
      await audio.play()
      setPlaying(true)
    }
  }, [])

  const scrub = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio?.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audio.currentTime = pct * audio.duration
  }, [])

  const cycleSpeed = useCallback(() => {
    const next = (speedIdx + 1) % SPEEDS.length
    setSpeedIdx(next)
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next]
  }, [speedIdx])

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

  useEffect(() => () => { audioRef.current?.pause() }, [])

  const topicLessons = TOPICS.find(t => t.id === activeTopic)?.lessons ?? []
  const currentTopic = TOPICS.find(t => t.lessons.some(l => l.id === currentLesson?.id))

  return (
    <div className="ls-page">

      {/* Header */}
      <header className="ls-header">
        <a href="/" className="logo">
          <img src="/icon.svg" width="24" height="24" alt="" style={{ borderRadius: '5px' }} />
          Get Into<em>Gas</em>
        </a>
        <div className="ls-header-right">
          {tier === 'free' && (
            <a href="/#pricing" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }}>
              Unlock all lessons →
            </a>
          )}
          <span className="ls-tier-badge">
            {tier === 'lifetime' ? '⭐ Lifetime' : tier === 'course_pass' ? '📚 Study Bundle' : '✦ Free plan'}
          </span>
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

      {/* Lesson list */}
      <main className="ls-main">
        <div className="ls-list">
          {topicLessons.map((lesson, i) => {
            const isCurrent = currentLesson?.id === lesson.id
            const isListened = listened.has(lesson.id)
            const locked = tier === 'free' && !FREE_LESSONS.has(lesson.id)
            return (
              <div
                key={lesson.id}
                className={`ls-row${isCurrent ? ' ls-current' : ''}${!lesson.available ? ' ls-unavail' : ''}${locked && lesson.available ? ' ls-locked' : ''}`}
                onClick={() => handleRow(lesson)}
              >
                <div className="ls-num">
                  {isListened
                    ? <span className="ls-check">✓</span>
                    : <span>{i + 1}</span>
                  }
                </div>
                <div className="ls-info">
                  <span className="ls-title">{lesson.title}</span>
                  {!lesson.available
                    ? <span className="ls-soon">Coming soon</span>
                    : locked && <span className="ls-soon">Members only</span>}
                </div>
                <div className="ls-action">
                  {!lesson.available
                    ? <span className="ls-lock">○</span>
                    : locked
                      ? <span className="ls-lock">🔒</span>
                      : (isCurrent && playing ? '⏸' : '▶')
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
            <button className="ls-pl-btn" onClick={togglePlay} disabled={loading}>
              {loading ? '…' : playing ? '⏸' : '▶'}
            </button>
            <div className="ls-pl-progress">
              <div className="ls-pl-bar" onClick={scrub}>
                <div className="ls-pl-fill" style={{ width: `${audioProgress}%` }} />
              </div>
              <div className="ls-pl-times">
                <span>{fmt(currentTime)}</span>
                <span>{duration ? fmt(duration) : '--:--'}</span>
              </div>
            </div>
          </div>
          <div className="ls-pl-right">
            <button className="ls-pl-spd" onClick={cycleSpeed}>{SPEED_LABELS[speedIdx]}</button>
          </div>
        </div>
      )}

    </div>
  )
}
