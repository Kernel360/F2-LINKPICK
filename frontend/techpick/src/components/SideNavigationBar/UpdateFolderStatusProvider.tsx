'use client';

import { useDisclosure } from '@/hooks/useDisclosure';
import { type PropsWithChildren, createContext, useMemo } from 'react';

type UpdateFolderStatusType = {
  isUpdateFolder: boolean;
  onOpenUpdateFolderInput: () => void;
  onCloseUpdateFolderInput: () => void;
};

/**
 * `isUpdateFolder`
 *
 * `onOpenUpdateFolderInput`
 *
 * `onCloseUpdateFolderInput`
 */
export const UpdateFolderStatusContext = createContext<UpdateFolderStatusType>({
  isUpdateFolder: false,
  onOpenUpdateFolderInput: () => {},
  onCloseUpdateFolderInput: () => {},
});

/**
 *
 * `UpdateFolderStatusContext`로 값을 받아올 수 있습니다.
 */
export function UpdateFolderStatusProvider({ children }: PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateFolderStatus: UpdateFolderStatusType = useMemo(
    () => ({
      isUpdateFolder: isOpen,
      onOpenUpdateFolderInput: onOpen,
      onCloseUpdateFolderInput: onClose,
    }),
    [isOpen, onOpen, onClose],
  );

  return (
    <UpdateFolderStatusContext.Provider value={updateFolderStatus}>
      {children}
    </UpdateFolderStatusContext.Provider>
  );
}
