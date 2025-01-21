'use client';

import { useGetChildFolderListByParentFolderId } from '@/hooks/useGetChildFolderListByParentFolderId';
import { useCreateFolder } from '@/queries/useCreateFolder';
import { useCreateFolderInputStore } from '@/stores/createFolderInputStore';
import type { UniqueIdentifier } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useCallback } from 'react';
import { FolderInput } from './FolderInput';
import { FolderListItem } from './FolderListItem';

export function TreeNode({ id }: TreeNodeProps) {
  const { mutate: createFolderMutate } = useCreateFolder();
  const { childFolderList: curTreeNodeChildList } =
    useGetChildFolderListByParentFolderId(Number(id));
  const { newFolderParentId } = useCreateFolderInputStore();
  const { closeCreateFolderInput } = useCreateFolderInputStore();
  const isParentForNewFolder = newFolderParentId === id;

  const createFolder = useCallback(
    (folderName: string) => {
      createFolderMutate({
        parentFolderId: Number(id),
        name: folderName,
      });
      closeCreateFolderInput();
    },
    [closeCreateFolderInput, id, createFolderMutate],
  );

  return (
    <>
      {isParentForNewFolder && (
        <FolderInput
          onSubmit={createFolder}
          onClickOutSide={closeCreateFolderInput}
        />
      )}
      {/**
       * @description folder-${childFolderId}로 id가 정해졌다면 내부의 FolderDraggable의 id도 동일해야합니다.
       */}
      <SortableContext
        id={`${id}`}
        items={curTreeNodeChildList.map(
          (childFolder) => `folder-${childFolder.id}`,
        )}
        strategy={verticalListSortingStrategy}
      >
        {curTreeNodeChildList.map((treeData) => {
          return (
            <FolderListItem
              id={treeData.id}
              name={treeData.name}
              key={treeData.id}
            />
          );
        })}
      </SortableContext>
    </>
  );
}

interface TreeNodeProps {
  id: UniqueIdentifier;
  depth: number;
}
