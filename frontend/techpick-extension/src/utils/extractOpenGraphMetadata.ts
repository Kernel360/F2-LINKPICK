export const extractOpenGraphMetadata = (
  htmlText: string
): {
  ogImage: string | null;
  ogDescription: string | null;
} => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  const ogImage = doc.querySelector(
    "meta[property='og:image']"
  ) as HTMLMetaElement | null;
  const ogDescription = doc.querySelector(
    "meta[property='og:description']"
  ) as HTMLMetaElement | null;

  return {
    ogImage: ogImage ? ogImage.content : null,
    ogDescription: ogDescription ? ogDescription.content : null,
  };
};
