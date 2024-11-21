import { PropsWithChildren, forwardRef } from 'react';
import {
  buttonSizeVariants,
  buttonColorVariants,
  buttonBackgroundVariants,
  buttonSizeVariantKeyTypes,
  buttonColorVariantKeyTypes,
  buttonBackgroundVariantKeyTypes,
  buttonStyle,
  wideButtonStyle,
} from './Button.css';

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(function Button(
  {
    size = 'lg',
    color = 'default',
    background = 'warning',
    wide = false,
    onClick,
    onKeyDown,
    children,
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${buttonSizeVariants[size]} ${buttonColorVariants[color]} ${buttonBackgroundVariants[background]} ${buttonStyle} ${wide ? wideButtonStyle : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      data-variant={background}
    >
      {children}
    </button>
  );
});

interface ButtonProps {
  size?: buttonSizeVariantKeyTypes;
  color?: buttonColorVariantKeyTypes;
  background?: buttonBackgroundVariantKeyTypes;
  wide?: boolean; // wide 속성 추가
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}
