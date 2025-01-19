import {
  fadeInStyle,
  imagePlaceholderStyle,
  imageStyle,
} from './ThumbnailImage.css';

export function ThumbnailImage({ image }: ThumbnailImageProps) {
  if (!image) {
    return <div className={imagePlaceholderStyle} />;
  }

  return (
    <img
      src={image}
      // biome-ignore lint/a11y/noRedundantAlt: <explanation>
      alt="Bookmark page open graph image"
      className={`${imageStyle} ${fadeInStyle}`}
    />
  );
}

interface ThumbnailImageProps {
  image?: string | null;
}
