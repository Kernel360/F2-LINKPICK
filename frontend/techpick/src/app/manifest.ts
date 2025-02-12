import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '바구니 - 당신을 위한 북마크 서비스',
    short_name: '바구니',
    description: '쉽게 저장하고 어디서든 볼 수 있어요',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    lang: 'ko',
    icons: [
      {
        src: '/image/baguni-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/image/baguni-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
