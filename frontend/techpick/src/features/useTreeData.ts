import { useGetRootAndRecycleBinStructure } from '@/features/nodeManagement/hooks/useGetRootAndRecycleBinStructure';
import { useGetDefaultFolderData } from '@/features/nodeManagement/hooks/useGetDefaultFolderData';
import { NodeData } from '@/shared/types';
import { getNewIdFromStructure } from '@/features/nodeManagement/utils/getNewIdFromStructure';
import { addNodeToStructure } from '@/features/nodeManagement/utils/addNodeToStructure';
import { useMemo } from 'react';

function addRecycleBinToStructure(
  structure: NodeData[],
  recycleBinId: number,
  recycleBin: NodeData[]
) {
  const lastIndex = structure.length;
  const newId = getNewIdFromStructure(structure);
  const recycleBinNode: NodeData = {
    id: newId,
    type: 'folder',
    name: 'Recycle Bin',
    folderId: recycleBinId,
    children: recycleBin,
  };

  return addNodeToStructure(
    structure,
    recycleBinId!.toString(),
    lastIndex,
    recycleBinNode
  );
}

function useTreeData(): NodeData[] {
  const { data: structureData } = useGetRootAndRecycleBinStructure();
  const { data: defaultFolderIdData } = useGetDefaultFolderData();

  return useMemo(() => {
    if (structureData && defaultFolderIdData) {
      return addRecycleBinToStructure(
        structureData.root,
        defaultFolderIdData!.RECYCLE_BIN,
        structureData.recycleBin
      );
    }
    return [];
  }, [structureData, defaultFolderIdData]);
}

export default useTreeData;