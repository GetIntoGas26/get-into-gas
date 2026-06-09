import { createClient } from '@/lib/supabase/server'
import { getAudioSignedUrl } from '@/lib/r2'
import { NextResponse, type NextRequest } from 'next/server'

const LESSONS: Record<string, { file: string; free: boolean }> = {
  'fundamentals-01': { file: 'ccn1-gas-safety-01-fundamentals.mp3', free: true },
  'fundamentals-02': { file: 'ccn1-gas-safety-02-tightness-testing.mp3', free: true },
  'combustion-01':   { file: 'ccn1-combustion-01-co-awareness.mp3', free: true },
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await params
  const lesson = LESSONS[lessonId]

  if (!lesson) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  }

  // Free lessons — no auth needed
  if (lesson.free) {
    const url = await getAudioSignedUrl(lesson.file)
    return NextResponse.json({ url })
  }

  // Paid lessons — check subscription
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  if (profile?.subscription_status !== 'active') {
    return NextResponse.json({ error: 'Subscription required' }, { status: 403 })
  }

  const url = await getAudioSignedUrl(lesson.file)
  return NextResponse.json({ url })
}
