'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'

type Tier = 'course_pass' | 'lifetime'
type ProgressRow = { lesson_id: string; completed_at: string | null; last_position_seconds: number }
type Lesson = { id: string; title: string; available: boolean }
type Topic = { id: string; title: string; icon: string; lessons: Lesson[] }

const TOPICS: Topic[] = [
  { id: 'gas-safety', title: 'Gas Safety', icon: '🔥', lessons: [
    { id: 'gas-safety-01', title: 'Gas Safety Fundamentals', available: true },
    { id: 'gas-safety-02', title: 'Tightness Testing Procedures', available: true },
    { id: 'gas-safety-03', title: 'RIDDOR & Reporting', available: false },
    { id: 'gas-safety-04', title: 'Gas Safe Registration', available: false },
    { id: 'gas-safety-05', title: 'Warning Notices', available: false },
    { id: 'gas-safety-06', title: 'Legal Responsibilities', available: false },
    { id: 'gas-safety-07', title: 'Identifying Unsafe Situations', available: false },
    { id: 'gas-safety-08', title: 'Landlord Safety Records', available: false },
  ]},
  { id: 'combustion', title: 'Combustion', icon: '💨', lessons: [
    { id: 'combustion-01', title: 'CO & CO2 Awareness', available: true },
    { id: 'combustion-02', title: 'Flue Gas Analysis', available: false },
    { id: 'combustion-03', title: 'Combustion Efficiency', available: false },
    { id: 'combustion-04', title: 'Incomplete Combustion', available: false },
    { id: 'combustion-05', title: 'Burner & Heat Exchanger Checks', available: false },
    { id: 'combustion-06', title: 'CO Alarms & Action', available: false },
  ]},
  { id: 'pipework', title: 'Pipework', icon: '🔩', lessons: [
    { id: 'pipework-01', title: 'Pipework Standards', available: false },
    { id: 'pipework-02', title: 'Pipe Sizing', available: false },
    { id: 'pipework-03', title: 'Materials & Jointing', available: false },
    { id: 'pipework-04', title: 'Installation Requirements', available: false },
    { id: 'pipework-05', title: 'Pressure Testing', available: false },
    { id: 'pipework-06', title: 'Purging Procedures', available: false },
    { id: 'pipework-07', title: 'Emergency Control Valves', available: false },
  ]},
  { id: 'ventilation', title: 'Ventilation', icon: '🌬️', lessons: [
    { id: 'ventilation-01', title: 'Air Supply Principles', available: false },
    { id: 'ventilation-02', title: 'Permanent Ventilation', available: false },
    { id: 'ventilation-03', title: 'Flueless Appliances', available: false },
    { id: 'ventilation-04', title: 'Open-Flued Requirements', available: false },
    { id: 'ventilation-05', title: 'Room-Sealed Systems', available: false },
    { id: 'ventilation-06', title: 'Ventilation Calculations', available: false },
  ]},
  { id: 'emergency', title: 'Emergency Procedures', icon: '🚨', lessons: [
    { id: 'emergency-01', title: 'Gas Escape Procedure', available: false },
    { id: 'emergency-02', title: 'Suspected Gas Escape', available: false },
    { id: 'emergency-03', title: 'Customer Safety', available: false },
    { id: 'emergency-04', title: 'Working at Risk', available: false },
    { id: 'emergency-05', title: 'Isolation Procedures', available: false },
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
          <span className="ls-tier-badge">
            {tier === 'lifetime' ? '⭐ Lifetime' : '📚 Study Bundle'}
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
            return (
              <div
                key={lesson.id}
                className={`ls-row${isCurrent ? ' ls-current' : ''}${!lesson.available ? ' ls-unavail' : ''}`}
                onClick={() => playLesson(lesson)}
              >
                <div className="ls-num">
                  {isListened
                    ? <span className="ls-check">✓</span>
                    : <span>{i + 1}</span>
                  }
                </div>
                <div className="ls-info">
                  <span className="ls-title">{lesson.title}</span>
                  {!lesson.available && <span className="ls-soon">Coming soon</span>}
                </div>
                <div className="ls-action">
                  {lesson.available
                    ? (isCurrent && playing ? '⏸' : '▶')
                    : <span className="ls-lock">○</span>
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
