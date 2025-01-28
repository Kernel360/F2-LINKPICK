'use client';
import { useFetchShareFolderList } from '@/queries/useFetchShareFolderList';
import { MyPageShareFolderField } from './MyPageShareFolderField';
import { MyPageShareFolderHeader } from './MyPageShareFolderHeader';
import { myPageShareFolderFieldListLayoutStyle } from './myPageShareFolderContent.css';

export default function MyPageShareFolderContent() {
  const { data: shareFolderList } = useFetchShareFolderList();

  if (!shareFolderList) {
    return null;
  }

  if (!shareFolderList.length) {
    return <div>공유된 폴더가 없습니다.</div>;
  }

  return (
    <div>
      <MyPageShareFolderHeader />
      <div className={myPageShareFolderFieldListLayoutStyle}>
        {shareFolderList.map((folderInfo) => (
          <MyPageShareFolderField
            key={folderInfo.sourceFolderId}
            folderInfo={folderInfo}
          />
        ))}
      </div>
    </div>
  );
}
