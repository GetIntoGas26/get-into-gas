import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Into Gas - CCN1 Revision That Works Around Your Job',
    description: 'Audio revision for working gas engineers. CCN1 ACS exam prep that fits around your job.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}
    </html>
  )
}
