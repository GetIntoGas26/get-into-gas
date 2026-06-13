import { ImageResponse } from 'next/og'

export const alt = 'Get Into Gas — The UK’s Audio-First CCN1 Revision Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0a0a0a',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '16px',
              background: '#ff5f1f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
            }}
          >
            🎧
          </div>
          <div style={{ display: 'flex', gap: '14px', fontSize: '40px', fontWeight: 800, color: '#fff' }}>
            <span>Get Into</span>
            <span style={{ color: '#ff5f1f' }}>Gas</span>
          </div>
        </div>

        <div style={{ fontSize: '76px', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          Learn While Living.
        </div>
        <div style={{ fontSize: '34px', color: '#ff5f1f', fontWeight: 700, marginTop: '24px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          The UK’s Audio-First CCN1 Revision Platform
        </div>
        <div style={{ fontSize: '28px', color: '#9a9a9a', marginTop: '28px', maxWidth: '900px' }}>
          Turn driving, walking and downtime into productive revision — for future gas engineers.
        </div>
      </div>
    ),
    { ...size }
  )
}
