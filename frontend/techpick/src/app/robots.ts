import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/folder', '/mypage'],
    },
    sitemap: 'https://app.baguni.kr/sitemap.xml',
  };
}
