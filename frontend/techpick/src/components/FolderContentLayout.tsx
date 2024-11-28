import { PropsWithChildren } from 'react';
import { folderContentLayoutStyle } from './folderContentLayout.css';

/**
 * @description FolderTree에 따라 선택된 폴더의 컨텐츠(픽 리스트)를 감쌉니다.
 */
export function FolderContentLayout({ children }: PropsWithChildren) {
  return <div className={folderContentLayoutStyle}>{children}</div>;
}
