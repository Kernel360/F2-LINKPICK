import { ImageResponse } from '@vercel/og';
/* eslint-disable jsx-a11y/alt-text */
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const styles = {
  1: { width: '1200px', height: '630px' },
  2: { width: '600px', height: '630px' },
  4: { width: '600px', height: '315px' },
  8: { width: '300px', height: '315px' },
  16: { width: '300px', height: '157.5px' },
};

async function isValidImageUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return (
      res.ok && res.headers.get('Content-Type')?.startsWith('image/') === true
    );
  } catch {
    return false;
  }
}

const getImageStyle = (index: number) => {
  return styles[index as keyof typeof styles] || styles[16];
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrls: string[] = JSON.parse(searchParams.get('imageUrls') || '[]');

  const width = 1200;
  const height = 630;

  const validImageUrls = await Promise.all(
    imageUrls.map(async (url) => ((await isValidImageUrl(url)) ? url : null)),
  );
  const filteredImageUrls = validImageUrls.filter((url) => url !== null);
  const adjustedCount = [1, 2, 4, 8, 16].reduce((prev, curr) =>
    Math.abs(curr - filteredImageUrls.length) <
    Math.abs(prev - filteredImageUrls.length)
      ? curr
      : prev,
  );
  const images = filteredImageUrls.slice(0, adjustedCount);
  const imageCount = images.length;

  return new ImageResponse(
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
          // biome-ignore lint/a11y/noRedundantAlt: <explanation>
          alt="open graph image"
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          src={url}
          style={{
            ...getImageStyle(imageCount),
            objectFit: 'cover',
          }}
        />
      ))}
    </div>,
    { width, height },
  );
}
