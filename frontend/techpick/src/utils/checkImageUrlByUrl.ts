export const checkImageUrlByUrl = (url: string | undefined) => {
  if (!url || !url.trim().startsWith('http')) {
    return '/image/default_image.svg';
  }
  return url;
};
