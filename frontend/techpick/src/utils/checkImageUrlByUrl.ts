export function checkImageUrlByUrl(url: string | undefined): string {
  if (!url || !url.trim().startsWith('http')) {
    return '/image/default_image.svg';
  }
  return url;
}
