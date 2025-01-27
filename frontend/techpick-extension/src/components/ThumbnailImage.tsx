import {
  fadeInStyle,
  imagePlaceholderStyle,
  imageStyle,
} from './ThumbnailImage.css';

export function ThumbnailImage({ image }: ThumbnailImageProps) {
  console.log('ThumbnailImage', image === '');
  const imageUrl = image === '' ? '/defaultImage.png' : image;

  if (!imageUrl) {
    return <div className={imagePlaceholderStyle} />;
  }

  return (
    <img src={imageUrl} alt="" className={`${imageStyle} ${fadeInStyle}`} />
  );
}

interface ThumbnailImageProps {
  image?: string | null;
}
