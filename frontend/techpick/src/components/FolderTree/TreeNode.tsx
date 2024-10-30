import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FolderDraggable } from '@/components/FolderTree/FolderDraggable';
import { FolderInfoItem } from '@/components/FolderTree/FolderInfoItem';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { treeNodeLayout } from './treeNode.css';
import type { UniqueIdentifier } from '@dnd-kit/core';

export function TreeNode({ id, depth }: TreeNodeProps) {
  const { filterByParentId } = useTreeStore();
  const curTreeNodeChildList = filterByParentId(Number(id));

  /**
   * 폴더 구조는 현재 SortableContext가 중첩되는 방식으로 진행되고 있지만,
   * 해당 방식은 depth가 늘어날 수록 drag & drop이 올바르게 일어나지 않고 있습니다.
   * 따라서 해당 코드는 1-depth의 SortableContext로 바꾸는 방식으로 추후 진행되어야합니다.
   */
  return (
    <SortableContext
      id={`${id}`}
      items={curTreeNodeChildList.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className={treeNodeLayout}>
        {curTreeNodeChildList.map((treeData) => {
          return (
            <div key={treeData.id} style={{ width: 'fit-content' }}>
              <FolderDraggable id={treeData.id}>
                <FolderInfoItem id={treeData.id} name={treeData.name} />
                {/** depth가 있는 폴더구조는 추후에 적용될 예정입니다.*/}
                {0 < treeData.childFolderList.length && (
                  <TreeNode id={treeData.id} depth={depth + 1} />
                )}
              </FolderDraggable>
            </div>
          );
        })}
      </div>
    </SortableContext>
  );
}

interface TreeNodeProps {
  id: UniqueIdentifier;
  depth: number;
}
