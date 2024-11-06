'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { NodeApi } from 'react-arborist';
import {
  DirectoryTreeSection,
  LinkEditorSection,
  FeaturedSection,
} from '@/components';
import { useGetDefaultFolderData } from '@/components/nodeManagement/api/folder/useGetDefaultFolderData';
import { useTreeStore } from '@/stores/treeStore';
import { getClientCookie } from '@/utils';
import { rootLayout, viewContainer, viewWrapper } from './style.css';

export default function MainPage() {
  const router = useRouter();
  const { focusedNode, setFocusedFolderNodeList, setFocusedLinkNodeList } =
    useTreeStore();
  const { data: defaultFolderData, isLoading } = useGetDefaultFolderData();

  const [tempFocusedFolderList, tempFocusedPickList] = useMemo(() => {
    if (!focusedNode || !focusedNode.children?.length) {
      return [[], []];
    }
    const folderList: NodeApi[] = [];
    const linkList: NodeApi[] = [];

    focusedNode.children?.forEach((node) => {
      if (node.data.type === 'folder') {
        folderList.push(node);
      } else if (node.data.type === 'pick') {
        linkList.push(node);
      }
    });

    return [folderList, linkList];
  }, [focusedNode]);

  useEffect(() => {
    setFocusedFolderNodeList(tempFocusedFolderList);
    setFocusedLinkNodeList(tempFocusedPickList);
  }, [
    tempFocusedFolderList,
    tempFocusedPickList,
    setFocusedFolderNodeList,
    setFocusedLinkNodeList,
  ]);

  useEffect(
    function loginValidation() {
      const techPickLogin = getClientCookie('techPickLogin');

      if (!techPickLogin) {
        alert('로그인이 필요합니다.');
        router.push('/login');
      }
    },
    [router]
  );

  return (
    <div className={rootLayout}>
      <div className={viewWrapper}>
        {!isLoading && (
          <div
            className={viewContainer}
            onContextMenu={(event) => {
              event.preventDefault();
            }}
          >
            <DirectoryTreeSection defaultFolderIdData={defaultFolderData!} />
            <LinkEditorSection />
            <FeaturedSection />
          </div>
        )}
      </div>
    </div>
  );
}
