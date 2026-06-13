import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LessonsClient from './LessonsClient'

export const metadata = { title: 'My Lessons - Get Into Gas' }

export default async function LessonsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_tier, subscription_expires_at')
    .eq('id', user.id)
    .single()

  // Effective tier: everyone logged in reaches /lessons.
  // Free (and expired Course Pass) see the 3 free lessons unlocked, rest gated.
  let tier: 'free' | 'course_pass' | 'lifetime' = 'free'
  if (profile?.subscription_tier === 'lifetime') {
    tier = 'lifetime'
  } else if (profile?.subscription_tier === 'course_pass') {
    const expired =
      profile.subscription_expires_at &&
      new Date(profile.subscription_expires_at) < new Date()
    tier = expired ? 'free' : 'course_pass'
  }

  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed_at, last_position_seconds')
    .eq('user_id', user.id)

  return (
    <LessonsClient
      userId={user.id}
      userEmail={user.email ?? ''}
      tier={tier}
      initialProgress={progress ?? []}
    />
  )
}
