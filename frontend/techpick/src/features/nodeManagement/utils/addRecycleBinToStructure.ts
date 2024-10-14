import { NodeData } from '@/shared/types';
import { addNodeToStructure } from '@/features/nodeManagement/utils/addNodeToStructure';
import { getNewIdFromStructure } from '@/features/nodeManagement/utils/getNewIdFromStructure';

export function addRecycleBinToStructure(
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

  return addNodeToStructure(structure, null, lastIndex, recycleBinNode);
}