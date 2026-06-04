'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

const WAVE_HEIGHTS = [20,36,52,40,60,44,54,28,64,48,38,58,42,52,34,62,48,38,55,45,60,40,50,35,25,45,55,40,60,48,35,52,42,58,38,48,62,45,55,35,48,40,52,45,38,60,42,55,35,48]
const SPEEDS = [1, 1.25, 1.5, 2]
const SPEED_LABELS = ['1×', '1.25×', '1.5×', '2×']

const LESSONS = [
  { id: 'gas-safety-01', icon: '🔥', title: 'Gas Safety Fundamentals',         meta: 'Module 1 · Free',                    free: true  },
  { id: 'gas-safety-02', icon: '🔧', title: 'Gas Tightness Testing',            meta: 'Module 2 · Free',                    free: true  },
  { id: 'combustion-01', icon: '💨', title: 'Combustion & CO Awareness',        meta: 'Module 3 · Free',                    free: true  },
  { id: 'pipework-01',   icon: '🔩', title: 'Pipework Standards',               meta: 'Module 4 · Members only',            free: false },
]

function fmt(secs: number) {
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function AudioPlayer() {
  const [currentId, setCurrentId]   = useState('gas-safety-02')
  const [playing, setPlaying]       = useState(false)
  const [loading, setLoading]       = useState(false)
  const [progress, setProgress]     = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration]     = useState(0)
  const [speedIdx, setSpeedIdx]     = useState(2)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const urlCache = useRef<Record<string, string>>({})

  const currentLesson = LESSONS.find(l => l.id === currentId)!

  const loadAndPlay = useCallback(async (lessonId: string) => {
    setLoading(true)
    try {
      if (!urlCache.current[lessonId]) {
        const res = await fetch(`/api/audio/${lessonId}`)
        if (!res.ok) throw new Error('Failed to get audio URL')
        const { url } = await res.json()
        urlCache.current[lessonId] = url
      }

      if (!audioRef.current) {
        audioRef.current = new Audio()
      }
      const audio = audioRef.current
      audio.src = urlCache.current[lessonId]
      audio.playbackRate = SPEEDS[speedIdx]
      await audio.play()
      setPlaying(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [speedIdx])

  // Wire up audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0)
    }
    const onDurationChange = () => setDuration(audio.duration)
    const onEnded = () => { setPlaying(false); setProgress(0); setCurrentTime(0) }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('ended', onEnded)
    }
  }, [currentId])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio || !audio.src) {
      await loadAndPlay(currentId)
      return
    }
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      await audio.play()
      setPlaying(true)
    }
  }

  const selectLesson = async (lessonId: string) => {
    if (!LESSONS.find(l => l.id === lessonId)?.free) {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    setPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
    setCurrentId(lessonId)
    await loadAndPlay(lessonId)
  }

  const scrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audio.currentTime = pct * audio.duration
  }

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length
    setSpeedIdx(next)
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next]
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => { audioRef.current?.pause() }
  }, [])

  const playedBars = Math.floor((progress / 100) * WAVE_HEIGHTS.length)

  return (
    <div className="audio-card-wrap">
      <div className="audio-card" id="sample">
        <div className="audio-card-glow" />
        <div className="audio-card-top" />

        <div className="lsn-module">Sample Lesson · {currentLesson.icon}</div>
        <div className="lsn-title">{currentLesson.title}</div>
        <div className="lsn-meta">{currentLesson.meta}{duration ? ` · ${fmt(duration)}` : ''}</div>

        <div className="waveform" onClick={togglePlay}>
          {WAVE_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className={`wb${i < playedBars ? ' p' : ''}${i === playedBars && playing ? ' a' : ''}`}
              style={{ height: h }}
            />
          ))}
        </div>

        <div className="player-row">
          <button className="play-btn" onClick={togglePlay} disabled={loading}>
            {loading ? '…' : playing ? '⏸' : '▶'}
          </button>
          <div className="progress-wrap">
            <div className="prog-bar" onClick={scrub}>
              <div className="prog-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="time-row">
              <span>{fmt(currentTime)}</span>
              <span>{duration ? fmt(duration) : '--:--'}</span>
            </div>
          </div>
          <button className="spd" onClick={cycleSpeed}>{SPEED_LABELS[speedIdx]}</button>
        </div>

        <div className="card-tags">
          <span className="c-tag">Gas Safety Regs</span>
          <span className="c-tag">Practical</span>
          <span className="c-tag">Exam Focus</span>
        </div>
      </div>

      <div className="mini-lessons">
        {LESSONS.map(lesson => (
          <div
            key={lesson.id}
            className={`mini-lesson${!lesson.free ? ' locked' : ''}${lesson.id === currentId ? ' active' : ''}`}
            onClick={() => selectLesson(lesson.id)}
          >
            <div className="ml-icon">{lesson.icon}</div>
            <div className="ml-info">
              <div className="ml-title">{lesson.title}</div>
              <div className="ml-meta">{lesson.meta}</div>
            </div>
            <div className="ml-play">{!lesson.free ? '🔒' : lesson.id === currentId && playing ? '⏸' : '▶'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
