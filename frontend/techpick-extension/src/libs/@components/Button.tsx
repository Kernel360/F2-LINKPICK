import { type PropsWithChildren, forwardRef } from 'react';
import {
  type buttonBackgroundVariantKeyTypes,
  buttonBackgroundVariants,
  type buttonColorVariantKeyTypes,
  buttonColorVariants,
  type buttonSizeVariantKeyTypes,
  buttonSizeVariants,
  buttonStyle,
  wideButtonStyle,
} from './Button.css';

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(function Button(
  {
    size = 'md',
    color = 'white',
    background = 'primary',
    wide = false,
    onClick,
    onKeyDown,
    children,
  },
  ref,
) {
  return (
    <button
      type="button"
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
