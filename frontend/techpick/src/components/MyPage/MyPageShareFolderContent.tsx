'use client';

import { useMyShareFolder } from '@/hooks/useMyShareFolder';
import { myPageShareFolderFieldListLayoutStyle } from './myPageShareFolderContent.css';
import { MyPageShareFolderField } from './MyPageShareFolderField';
import { MyPageShareFolderHeader } from './MyPageShareFolderHeader';

export default function MyPageShareFolderContent() {
  const { myShareFolders, handleDeleteMyShareFolder } = useMyShareFolder();

  if (!myShareFolders.length) return <div>공유된 폴더가 없습니다.</div>;

  return (
    <div>
      <MyPageShareFolderHeader />
      <div className={myPageShareFolderFieldListLayoutStyle}>
        {myShareFolders.map((folderInfo) => (
          <MyPageShareFolderField
            key={folderInfo.sourceFolderId}
            folderInfo={folderInfo}
            handleDeleteMyShareFolder={handleDeleteMyShareFolder}
          />
        ))}
      </div>
    </div>
  );
}
