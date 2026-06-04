import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Get Into Gas - CCN1 Revision That Works Around Your Job',
  description: 'CCN1 ACS gas exam revision audio lessons. No desk. No textbooks. Just listen, learn, and pass. Built for real gas engineers.',
  metadataBase: new URL('https://get-into-gas.co.uk'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://get-into-gas.co.uk',
    siteName: 'Get Into Gas',
    title: 'Get Into Gas - CCN1 Revision That Works Around Your Job',
    description: 'Audio revision for working gas engineers. Learn CCN1 anywhere - no desk, no textbooks. ACS exam prep that fits around your job.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Into Gas - CCN1 Revision That Works Around Your Job',
    description: 'Audio revision for working gas engineers. CCN1 ACS exam prep that fits around your job.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
