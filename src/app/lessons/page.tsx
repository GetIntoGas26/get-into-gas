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

  // No paid tier — send to pricing
  if (!profile?.subscription_tier) redirect('/#pricing')

  // Hard lock: Course Pass expired
  if (
    profile.subscription_tier === 'course_pass' &&
    profile.subscription_expires_at &&
    new Date(profile.subscription_expires_at) < new Date()
  ) {
    redirect('/#pricing')
  }

  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed_at, last_position_seconds')
    .eq('user_id', user.id)

  return (
    <LessonsClient
      userId={user.id}
      userEmail={user.email ?? ''}
      tier={profile.subscription_tier as 'course_pass' | 'lifetime'}
      initialProgress={progress ?? []}
    />
  )
}
