import Link from 'next/link';
import type { ComponentProps, ElementType, PropsWithChildren } from 'react';
import {
  activeStyle,
  iconStyle,
  navigationItemLayoutStyle,
  textStyle,
} from './navigationItem.css';

export function NavigationItem({
  children,
  href,
  text,
  isActive,
  icon: IconComponent,
  className,
  ...otherProps
}: PropsWithChildren<NavigationItemPropsType>) {
  return (
    <Link
      href={href}
      className={`${navigationItemLayoutStyle} ${isActive ? activeStyle : ''} ${className}`}
      {...otherProps}
    >
      {IconComponent && <IconComponent className={iconStyle} />}
      {text && <p className={textStyle}>{text}</p>}
    </Link>
  );
}

interface NavigationItemPropsType extends ComponentProps<'a'> {
  href: string;
  text?: string;
  icon?: ElementType;
  isActive: boolean;
}
