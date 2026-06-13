import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function getAudioSignedUrl(filename: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: filename,
  })
  // URL valid for 2 hours
  return getSignedUrl(r2, command, { expiresIn: 7200 })
}

// Signed URL that forces a browser download with a friendly filename (Lifetime tier).
export async function getAudioDownloadUrl(filename: string, downloadName: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: filename,
    ResponseContentDisposition: `attachment; filename="${downloadName}"`,
  })
  // Short-lived — just long enough to start the download
  return getSignedUrl(r2, command, { expiresIn: 600 })
}
