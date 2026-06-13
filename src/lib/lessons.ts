// Single source of truth mapping lesson IDs → R2 audio files.
// `free: true` lessons are playable without a subscription (homepage samples).
export type LessonEntry = { file: string; free: boolean }

export const LESSONS: Record<string, LessonEntry> = {
  // Gas Fundamentals (free: first 2 are sample lessons)
  'fundamentals-01': { file: 'ccn1-fundamentals-01-welcome-to-get-into-gas.mp3', free: true },
  'fundamentals-02': { file: 'ccn1-fundamentals-02-understanding-the-role-of-a-gas-engineer.mp3', free: true },
  'fundamentals-03': { file: 'ccn1-fundamentals-03-the-foundations-of-gas-safety.mp3', free: false },
  'fundamentals-04': { file: 'ccn1-fundamentals-04-what-is-natural-gas.mp3', free: false },
  'fundamentals-05': { file: 'ccn1-fundamentals-05-properties-of-natural-gas.mp3', free: false },
  'fundamentals-06': { file: 'ccn1-fundamentals-06-flammability-and-explosive-limits.mp3', free: false },
  'fundamentals-07': { file: 'ccn1-fundamentals-07-gas-pressure-made-simple.mp3', free: false },
  // Combustion (first lesson free as sample)
  'combustion-01':   { file: 'ccn1-combustion-01-what-is-combustion.mp3', free: true },
  'combustion-02':   { file: 'ccn1-combustion-02-complete-vs-incomplete-combustion.mp3', free: false },
  'combustion-03':   { file: 'ccn1-combustion-03-carbon-monoxide-explained.mp3', free: false },
  'combustion-04':   { file: 'ccn1-combustion-04-preventing-carbon-monoxide-risks.mp3', free: false },
  // Tightness Testing
  'tightness-01':    { file: 'ccn1-tightness-01-why-tightness-testing-matters.mp3', free: false },
  'tightness-02':    { file: 'ccn1-tightness-02-understanding-let-by-tests.mp3', free: false },
  'tightness-03':    { file: 'ccn1-tightness-03-stabilisation-explained.mp3', free: false },
  'tightness-04':    { file: 'ccn1-tightness-04-reading-tightness-test-results.mp3', free: false },
  'tightness-05':    { file: 'ccn1-tightness-05-tightness-testing-exam-tips.mp3', free: false },
  // Gas Controls
  'controls-01':     { file: 'ccn1-controls-01-introduction-to-gas-controls.mp3', free: false },
  'controls-02':     { file: 'ccn1-controls-02-emergency-control-valves.mp3', free: false },
  'controls-03':     { file: 'ccn1-controls-03-appliance-isolation-valves.mp3', free: false },
  'controls-04':     { file: 'ccn1-controls-04-governors-and-pressure-control.mp3', free: false },
  'controls-05':     { file: 'ccn1-controls-05-flame-supervision-devices.mp3', free: false },
  // Unsafe Situations
  'unsafe-01':       { file: 'ccn1-unsafe-01-understanding-unsafe-situations.mp3', free: false },
  'unsafe-02':       { file: 'ccn1-unsafe-02-immediately-dangerous.mp3', free: false },
  'unsafe-03':       { file: 'ccn1-unsafe-03-at-risk.mp3', free: false },
  // unsafe-04 (Not to Current Standards) — audio pending
}

// Shared gate: does this profile have full (paid) access right now?
export function hasActiveAccess(
  tier: string | null | undefined,
  expiresAt: string | null | undefined
): boolean {
  if (tier === 'lifetime') return true
  if (tier === 'course_pass') return !expiresAt || new Date(expiresAt) > new Date()
  return false
}
