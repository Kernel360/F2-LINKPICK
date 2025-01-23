'use client';

import { useDisclosure } from '@/hooks/useDisclosure';
import { type PropsWithChildren, createContext, useMemo } from 'react';

type CreateChildFolderFolderStatusType = {
  isCreateChildFolderOpen: boolean;
  onOpeCreateFolderInput: () => void;
  onCloseCreateFolderInput: () => void;
};

/**
 * `isCreateChildFolder`
 *
 * `onOpeCreateFolderInput`
 *
 * `onCloseCreateFolderInput`
 */
export const CreateChildFolderStatusContext =
  createContext<CreateChildFolderFolderStatusType>({
    isCreateChildFolderOpen: false,
    onOpeCreateFolderInput: () => {},
    onCloseCreateFolderInput: () => {},
  });

/**
 *
 * `UpdateFolderStatusContext`로 값을 받아올 수 있습니다.
 */
export function CreateFolderStatusProvider({ children }: PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createFolderStatus: CreateChildFolderFolderStatusType = useMemo(
    () => ({
      isCreateChildFolderOpen: isOpen,
      onOpeCreateFolderInput: onOpen,
      onCloseCreateFolderInput: onClose,
    }),
    [isOpen, onOpen, onClose],
  );

  return (
    <CreateChildFolderStatusContext.Provider value={createFolderStatus}>
      {children}
    </CreateChildFolderStatusContext.Provider>
  );
}
