'use client';

import { useDisclosure } from '@/hooks/useDisclosure';
import { type PropsWithChildren, createContext, useMemo } from 'react';

type DeleteFolderStatusType = {
  isOpenDeleteFolderDialog: boolean;
  onOpenDeleteFolderDialog: () => void;
  onCloseDeleteFolderDialog: () => void;
};

/**
 * `isOpenDeleteFolderDialog`
 *
 * `onOpenDeleteFolderDialog`
 *
 * `onCloseDeleteFolderDialog`
 */
export const DeleteFolderStatusContext = createContext<DeleteFolderStatusType>({
  isOpenDeleteFolderDialog: false,
  onOpenDeleteFolderDialog: () => {},
  onCloseDeleteFolderDialog: () => {},
});

/**
 *
 * `DeleteFolderStatusContext`로 값을 받아올 수 있습니다.
 */
export function DeleteFolderStatusProvider({ children }: PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteFolderStatus: DeleteFolderStatusType = useMemo(
    () => ({
      isOpenDeleteFolderDialog: isOpen,
      onOpenDeleteFolderDialog: onOpen,
      onCloseDeleteFolderDialog: onClose,
    }),
    [isOpen, onOpen, onClose],
  );

  return (
    <DeleteFolderStatusContext.Provider value={deleteFolderStatus}>
      {children}
    </DeleteFolderStatusContext.Provider>
  );
}
