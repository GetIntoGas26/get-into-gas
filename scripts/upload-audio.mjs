import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const ACCOUNT_ID = 'fdb2a0a10b557bc1b85344341500e195'
const ACCESS_KEY  = '5ece814b8a545a2da5e8fa3449410581'
const SECRET_KEY  = '7f45f7b4cb9106b6fca568da1588ac22f8f2b1cda3fcaa9e01f26749d1d30a9c'
const BUCKET      = 'get-into-gas-audio'
const SOURCE_DIR  = 'C:\\Users\\joel4\\CCN1_training_website\\get-into-gas-placeholder-audio'

// lesson number (prefix) → R2 filename
const MAP = {
   1: 'ccn1-fundamentals-01-welcome-to-get-into-gas.mp3',
   2: 'ccn1-fundamentals-02-understanding-the-role-of-a-gas-engineer.mp3',
   3: 'ccn1-fundamentals-03-the-foundations-of-gas-safety.mp3',
   4: 'ccn1-fundamentals-04-what-is-natural-gas.mp3',
   5: 'ccn1-fundamentals-05-properties-of-natural-gas.mp3',
   6: 'ccn1-fundamentals-06-flammability-and-explosive-limits.mp3',
   7: 'ccn1-fundamentals-07-gas-pressure-made-simple.mp3',
   8: 'ccn1-combustion-01-what-is-combustion.mp3',
   9: 'ccn1-combustion-02-complete-vs-incomplete-combustion.mp3',
  10: 'ccn1-combustion-03-carbon-monoxide-explained.mp3',
  11: 'ccn1-combustion-04-preventing-carbon-monoxide-risks.mp3',
  12: 'ccn1-tightness-01-why-tightness-testing-matters.mp3',
  13: 'ccn1-tightness-02-understanding-let-by-tests.mp3',
  14: 'ccn1-tightness-03-stabilisation-explained.mp3',
  15: 'ccn1-tightness-04-reading-tightness-test-results.mp3',
  16: 'ccn1-tightness-05-tightness-testing-exam-tips.mp3',
  17: 'ccn1-controls-01-introduction-to-gas-controls.mp3',
  18: 'ccn1-controls-02-emergency-control-valves.mp3',
  19: 'ccn1-controls-03-appliance-isolation-valves.mp3',
  20: 'ccn1-controls-04-governors-and-pressure-control.mp3',
  21: 'ccn1-controls-05-flame-supervision-devices.mp3',
  22: 'ccn1-unsafe-01-understanding-unsafe-situations.mp3',
  23: 'ccn1-unsafe-02-immediately-dangerous.mp3',
  24: 'ccn1-unsafe-03-at-risk.mp3',
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
})

const files = readdirSync(SOURCE_DIR)

for (const [numStr, destKey] of Object.entries(MAP)) {
  const num = Number(numStr)
  const srcFile = files.find(f => f.startsWith(`${num}_`))
  if (!srcFile) { console.error(`❌ Missing source for lesson ${num}`); continue }

  const body = readFileSync(join(SOURCE_DIR, srcFile))
  process.stdout.write(`Uploading ${num}/24 → ${destKey} ... `)
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: destKey, Body: body, ContentType: 'audio/mpeg' }))
  console.log('✓')
}

console.log('\nDone. 24 files uploaded.')
