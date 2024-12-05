import { useState, useEffect } from 'react';
import { deleteMyShareFolder } from '@/apis/folder/deleteShareFolder';
import { getMySharedFolders } from '@/apis/folder/getMySharedFolders';
import { useTreeStore } from '@/stores';
import { notifySuccess, notifyError } from '@/utils';
import { GetMyShareFolderResponseType } from '@/types';

export function useMyShareFolder() {
  /**
   * @question 의존성 배열에 넣기위해 treeDataMap을 구독했는데 좀 잘못된 거 같습니다.
   */
  const { checkIsShareFolder, setShareFolder, treeDataMap } = useTreeStore();
  const [myShareFolders, setMyShareFolders] = useState<
    GetMyShareFolderResponseType[]
  >([]);

  useEffect(() => {
    const fetchMyShareFolder = async () => {
      try {
        const response = await getMySharedFolders();
        /**
         * @question 마이페이지에도 폴더트리가 존재해서 폴더 트리의 컨텍스트 메뉴로 비공개 처리를 했을 때
         * 마이페이지에도 반영되어야 하기 때문에 전역 상태로 공유 폴더인지 확인하는 함수를 만들고
         * 공유 폴더인지 확인하는 함수를 사용하여 필터링하도록 작성했는데 수정이 필요할 거 같습니다.
         *
         * 1. treeDataMap상태를 구독해 의존성 배열에 넣는게 맞지 않는 거 같은데 어떻게 수정해야 할까요?
         * 2. tree의 depth가 존재하기 때문에 shareFolder와 관련된 전역상태를 만들지 않은게 이유입니다..
         *    현재 구현되어있지 않지만 로직엔 존재해서 여쭤봅니다.
         */
        const shareFilteredFolderList = response.filter((folder) => {
          return checkIsShareFolder(folder.sourceFolderId as number);
        });

        setMyShareFolders(shareFilteredFolderList);
      } catch {
        /* empty */
      }
    };

    fetchMyShareFolder();
  }, [treeDataMap]);

  const handleDeleteMyShareFolder = async (sourceFolderId: number) => {
    const deleteSuccess = await deleteMyShareFolder(sourceFolderId);
    if (deleteSuccess) {
      notifySuccess('공유 폴더가 삭제되었습니다.');
      setMyShareFolders((prevFolders) =>
        prevFolders.filter((folder) => folder.sourceFolderId !== sourceFolderId)
      );
      /**
       * @question 상태를 일치시키기 위해 사용했는데 전체적으로 리팩토링이 필요할 거 같습니다..
       * 리뷰 부탁드립니다.
       */
      setShareFolder(sourceFolderId, null);
    } else notifyError('공유 폴더 삭제에 실패했습니다.');
  };

  return { myShareFolders, handleDeleteMyShareFolder };
}
