import { useCallback } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useCreateFolderInputStore } from '@/stores/createFolderInputStore';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { FolderInput } from './FolderInput';
import { FolderListItem } from './FolderListItem';
import type { UniqueIdentifier } from '@dnd-kit/core';

export function TreeNode({ id }: TreeNodeProps) {
  const {
    getChildFolderListByParentFolderId,
    createFolder: createFolderInStore,
    selectedFolderList,
    isDragging,
    focusFolderId,
  } = useTreeStore();
  const curTreeNodeChildList = getChildFolderListByParentFolderId(Number(id));
  const orderedChildFolderIdList = curTreeNodeChildList.map(
    (childFolder) => childFolder.id
  );
  const orderedChildFolderIdListWithoutSelectedIdList = isDragging
    ? orderedChildFolderIdList.filter(
        (childFolderId) =>
          !selectedFolderList.includes(childFolderId) ||
          childFolderId === focusFolderId
      )
    : orderedChildFolderIdList;
  const { newFolderParentId } = useCreateFolderInputStore();
  const { closeCreateFolderInput } = useCreateFolderInputStore();
  const isParentForNewFolder = newFolderParentId === id;

  const createFolder = useCallback(
    (folderName: string) => {
      createFolderInStore({
        parentFolderId: Number(id),
        newFolderName: folderName,
      });
      closeCreateFolderInput();
    },
    [closeCreateFolderInput, createFolderInStore, id]
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
        items={orderedChildFolderIdListWithoutSelectedIdList.map(
          (childFolderId) => `folder-${childFolderId}`
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
