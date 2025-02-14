import { getShareFolderById } from '@/apis/folder/getShareFolderById';
import { ImageResponse } from 'next/og';

export const alt = '공유 폴더 미리보기';
export const size = {
  width: 1200,
  height: 630,
};

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

export const contentType = 'image/png';

async function testImageUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return (
      res.ok && (res.headers.get('Content-Type')?.startsWith('image/') ?? false)
    );
  } catch {
    return false;
  }
}

export default async function Image({ params }: { params: { uuid: string } }) {
  const { uuid } = params;
  const sharedFolder = await getShareFolderById(uuid);
  const { pickList } = sharedFolder;

  const imageUrls = await Promise.all(
    pickList
      .map((pick) => pick.linkInfo.imageUrl)
      .filter((url) => url && url !== '')
      .slice(0, 16)
      .map(async (url) => {
        if (!(typeof url === 'string')) {
          return null;
        }

        const isValid = await testImageUrl(url);
        return isValid ? url : null;
      }),
  );
  let ogImageUrls = imageUrls.filter((url) => typeof url === 'string');

  const imageCount = [1, 2, 4, 8, 16].reduce((prev, curr) =>
    Math.abs(curr - ogImageUrls.length) < Math.abs(prev - ogImageUrls.length)
      ? curr
      : prev,
  );
  ogImageUrls = ogImageUrls.slice(0, imageCount);

  if (ogImageUrls.length === 0) {
    return <img src="/image/og_image.png" alt={alt} />;
  }

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '1200px',
        height: '630px',
      }}
    >
      {ogImageUrls.map((url: string, index: number) => (
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
    { ...size },
  );
}
