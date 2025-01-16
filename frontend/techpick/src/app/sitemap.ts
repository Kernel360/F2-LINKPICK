import { MetadataRoute } from 'next';
import { ROUTES } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_DOMAIN ?? 'https://app.baguni.kr';
  const currentDate = new Date().toISOString();

  return [
    {
      url: url,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${url}${ROUTES.LANDING}`, // https://app.baguni.kr/landing
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${url}${ROUTES.LOGIN}`, // https://app.baguni.kr/login
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
