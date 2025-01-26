'use client';

import { useDisclosure } from '@/hooks/useDisclosure';
import { useShareFolder } from '@/queries/useShareFolder';
import type { FolderIdType } from '@/types/FolderIdType';
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

type ShareFolderStatusType = {
  uuid: string;
  setUuid: (value: string) => void;
  isOpenShareFolderDialog: boolean;
  onOpenShareFolderDialog: (folderId: FolderIdType) => Promise<void>;
  onCloseShareFolderDialog: () => void;
};

/**
 * `isOpenShareFolderDialog`
 *
 * `onOpenShareFolderDialog`
 *
 * `onCloseShareFolderDialog`
 */
export const ShareFolderStatusContext = createContext<ShareFolderStatusType>({
  uuid: '',
  setUuid: () => {},
  isOpenShareFolderDialog: false,
  onOpenShareFolderDialog: async () => {},
  onCloseShareFolderDialog: () => {},
});

/**
 *
 * `ShareFolderStatusContext`로 값을 받아올 수 있습니다.
 */
export function ShareFolderStatusProvider({ children }: PropsWithChildren) {
  const [uuid, setUuid] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync: shareFolder } = useShareFolder();

  const onOpenShareFolderDialog = useCallback(
    async (folderId: FolderIdType) => {
      const { folderAccessToken } = await shareFolder(folderId);
      setUuid(folderAccessToken);
      onOpen();
    },
    [shareFolder, onOpen],
  );

  const shareFolderStatus: ShareFolderStatusType = useMemo(
    () => ({
      uuid: uuid,
      setUuid,
      isOpenShareFolderDialog: isOpen,
      onOpenShareFolderDialog,
      onCloseShareFolderDialog: onClose,
    }),
    [uuid, onOpenShareFolderDialog, isOpen, onClose],
  );

  return (
    <ShareFolderStatusContext.Provider value={shareFolderStatus}>
      {children}
    </ShareFolderStatusContext.Provider>
  );
}
