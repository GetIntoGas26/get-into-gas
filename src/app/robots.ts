import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/lessons', '/api/', '/auth/', '/reset-password'],
    },
    sitemap: 'https://get-into-gas.co.uk/sitemap.xml',
  }
}
