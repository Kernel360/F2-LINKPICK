import { LoaderIcon } from 'lucide-react';
import { spinAnimation, spinnerCircleStyle, spinnerStyle } from './spinner.css';

export function Spinner({
  scale,
  progress,
  startAnimation = false,
}: SpinnerProps) {
  const totalProgress = Math.min(1, progress);
  const angle = totalProgress * 360;

  let clipPath: string;
  if (totalProgress <= 0.5) {
    clipPath = `polygon(50% 0%, 50% 50%, ${50 + 50 * Math.cos(((angle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((angle - 90) * Math.PI) / 180)}%, 100% 0%, 100% 100%, 100% 0%)`;
  } else if (totalProgress < 0.825) {
    const leftAngle = (totalProgress - 0.5) * 2 * Math.PI;
    clipPath = `polygon(50% 0%, 50% 50%, ${50 - 50 * Math.cos(leftAngle)}% ${50 - 50 * Math.sin(leftAngle)}%, 0% 0%, 0% 100%, 100% 100%, 100% 0%)`;
  } else {
    clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  }

  return (
    <div
      className={`${spinnerStyle} `}
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <LoaderIcon
        style={{
          clipPath: clipPath,
        }}
        className={`${spinnerCircleStyle} ${startAnimation ? spinAnimation : ''}`}
      />
    </div>
  );
}

interface SpinnerProps {
  scale: number;
  progress: number;
  startAnimation: boolean;
}
