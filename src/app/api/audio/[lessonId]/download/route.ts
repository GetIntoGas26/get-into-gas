import { createClient } from '@/lib/supabase/server'
import { getAudioDownloadUrl } from '@/lib/r2'
import { LESSONS } from '@/lib/lessons'
import { NextResponse, type NextRequest } from 'next/server'

// Lifetime-only: returns a short-lived signed URL that downloads the MP3 as a file.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await params
  const lesson = LESSONS[lessonId]

  if (!lesson) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_tier')
    .eq('id', user.id)
    .single()

  // Downloads are a Lifetime perk only
  if (profile?.subscription_tier !== 'lifetime') {
    return NextResponse.json({ error: 'Downloads are available on the Lifetime plan' }, { status: 403 })
  }

  const url = await getAudioDownloadUrl(lesson.file, lesson.file)
  return NextResponse.json({ url })
}
