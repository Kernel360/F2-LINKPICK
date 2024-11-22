import {
  imageStyle,
  imagePlaceholderStyle,
  fadeInStyle,
} from './ThumbnailImage.css';

export function ThumbnailImage({ image }: ThumbnailImageProps) {
  if (!image) {
    return <div className={imagePlaceholderStyle} />;
  }

  return (
    <img
      src={image}
      alt="Bookmark page image"
      className={`${imageStyle} ${fadeInStyle}`}
    />
  );
}

interface ThumbnailImageProps {
  image?: string | null;
}
