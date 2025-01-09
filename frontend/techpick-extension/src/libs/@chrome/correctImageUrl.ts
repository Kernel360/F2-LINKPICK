export const correctImageUrl = (url: string, imageUrl: string) => {
  try {
    const { protocol, hostname, pathname } = new URL(url);
    const baseUrl = `${protocol}//${hostname}${pathname}`;

    if (imageUrl.startsWith('://')) {
      return 'https' + imageUrl;
    }
    if (imageUrl.startsWith('//')) {
      return 'https:' + imageUrl;
    }
    if (imageUrl.startsWith('/')) {
      return baseUrl + imageUrl;
    }
    if (!imageUrl.startsWith('https://') && !imageUrl.startsWith('http://')) {
      return '';
    }
    return imageUrl;
  } catch {
    return '';
  }
};
