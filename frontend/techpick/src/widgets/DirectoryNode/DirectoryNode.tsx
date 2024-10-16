import { DirectoryNodeProps } from '@/shared/types/NodeData';
import {
  dirIcFolder,
  dirNode,
  dirNodeWrapper,
  dirNodeWrapperFocused,
  nodeNameInput,
} from './DirectoryNode.css';
import Image from 'next/image';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateFolder } from '@/features/nodeManagement/hooks/useCreateFolder';
import { StructureData } from '@/shared/types/ApiTypes';
import { useGetDefaultFolderData } from '@/features/nodeManagement/hooks/useGetDefaultFolderData';
import { useMoveFolder } from '@/features/nodeManagement/hooks/useMoveFolder';
import toast from 'react-hot-toast';

export const DirectoryNode = ({
  node,
  style,
  dragHandle,
}: DirectoryNodeProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: createFolder } = useCreateFolder();
  const { mutateAsync: moveFolder } = useMoveFolder();
  const { data: defaultFolderIdData } = useGetDefaultFolderData();

  const cashedStructureData: StructureData | undefined =
    queryClient.getQueryData(['rootAndRecycleBinData']);

  const realNodeId: number = node.data.folderId
    ? node.data.folderId
    : node.data.pickId;

  const setRealNodeId = (id: number) => {
    if (node.data.folderId) node.data.folderId = id;
    else node.data.pickId = id;
  };

  const rootFolderId = defaultFolderIdData?.ROOT;

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Escape') {
      if (node.data.folderId === -1) {
        await queryClient.invalidateQueries({
          queryKey: ['rootAndRecycleBinData'],
          exact: true,
        });
      } else node.reset();
    }
    if (event.key === 'Enter') {
      if (realNodeId === -1) {
        // create 동작중 이름 입력인 경우(realId가 -1인 경우)
        // 폴더 생성 api 호출 (서버)
        // todo: error handling
        try {
          const newFolderData = await createFolder(event.currentTarget.value);
          console.log('Server: Folder created:', newFolderData);

          // 서버에서 생성한 폴더 아이디로 변경
          setRealNodeId(newFolderData.id);

          // 서버에 업데이트된 트리 전송
          const serverData = {
            parentFolderId: node.parent!.isRoot
              ? rootFolderId
              : node.parent!.data.folderId,
            structure: {
              root: cashedStructureData!.root,
              recycleBin: cashedStructureData!.recycleBin,
            },
          };
          console.log('serverData', serverData);
          // 폴더 이동 (서버)
          await moveFolder({
            folderId: newFolderData.id.toString(),
            structure: serverData,
          });
          await queryClient.invalidateQueries({
            queryKey: ['rootAndRecycleBinData'],
            exact: true,
          });
          node.reset();
        } catch (error) {
          console.error('Folder creation failed:', error);
          await queryClient.invalidateQueries({
            queryKey: ['rootAndRecycleBinData'],
            exact: true,
          });

          toast.error('동일한 이름을 가진 폴더가 존재합니다.');
        }
      } else node.submit(event.currentTarget.value);
    }
  };

  return (
    <div
      style={{ ...style }}
      className={node.isSelected ? dirNodeWrapperFocused : dirNodeWrapper}
      ref={dragHandle}
      onClick={() => {
        node.toggle();
        console.log('Clicked Node', node);
      }}
      onContextMenu={() => {
        node.select();
      }}
    >
      <div className={dirNode}>
        {node.isOpen ? (
          <ChevronDown size={13} />
        ) : node.isLeaf ? (
          <div style={{ marginLeft: '13px' }}></div>
        ) : (
          <ChevronRight size={13} />
        )}
        {node.data.type === 'folder' ? (
          <Image
            src={`image/ic_folder.svg`}
            alt={`${node.data.name}'s image`}
            className={dirIcFolder}
            width={8}
            height={8}
          />
        ) : (
          <Image
            src={`image/ic_doc.svg`}
            width={8}
            height={8}
            alt={`${node.data.name}'s image`}
            className={dirIcFolder}
          />
        )}
        {node.isEditing ? (
          <input
            type="text"
            className={nodeNameInput}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          node.data.name
        )}
      </div>
    </div>
  );
};