/* eslint-disable jsx-a11y/alt-text */
import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

const styles = {
  1: { width: '1200px', height: '630px' },
  2: { width: '600px', height: '630px' },
  4: { width: '600px', height: '315px' },
  8: { width: '300px', height: '315px' },
  16: { width: '300px', height: '157.5px' },
};

const getImageStyle = (index: number) => {
  return styles[index as keyof typeof styles] || styles[16];
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrls: string[] = JSON.parse(searchParams.get('imageUrls') || '[]');

  const width = 1200;
  const height = 630;

  // 이미지 개수를 1, 2, 4, 8, 16 중 가장 가까운 수로 조정
  const adjustedCount = [1, 2, 4, 8, 16].reduce((prev, curr) =>
    Math.abs(curr - imageUrls.length) < Math.abs(prev - imageUrls.length)
      ? curr
      : prev
  );

  const images = await Promise.all(
    imageUrls.slice(0, adjustedCount).map(async (url: string) => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch image');
        return url;
      } catch {
        return '/image/og_image.png';
      }
    })
  );
  const imageCount = images.length;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '1200px',
          height: '630px',
        }}
      >
        {images.map((url: string, index: number) => (
          <img
            key={index}
            src={url}
            style={{
              ...getImageStyle(imageCount),
              objectFit: 'cover',
            }}
          />
        ))}
      </div>
    ),
    { width, height }
  );
}
