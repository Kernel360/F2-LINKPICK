import React, { PropsWithChildren } from 'react';
import * as styles from './myPageContentContainer.css';

export default function MyPageContentContainer({
  title,
  children,
}: PropsWithChildren<MyPageContentContainerProps>) {
  return (
    <div className={styles.myPageContentContainer}>
      <span className={styles.myPageContentContainerTitle}>{title}</span>
      {children}
    </div>
  );
}

interface MyPageContentContainerProps {
  title: string;
}
