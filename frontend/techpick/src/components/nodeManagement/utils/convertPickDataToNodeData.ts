import { getNewIdFromStructure } from '@/components/nodeManagement/utils/getNewIdFromStructure';
import { ApiPickData, ApiStructureData } from '@/types/ApiTypes';
import { NodeData } from '@/types';

export function convertPickDataToNodeData(
  unClassifiedPickDataList: ApiPickData[],
  structure: ApiStructureData
): NodeData {
  let newId = Number(getNewIdFromStructure(structure));
  const children: NodeData[] = unClassifiedPickDataList.map((pickData) => {
    return {
      id: String(newId++),
      name: pickData.title,
      type: 'pick',
      pickId: pickData.id,
      url: pickData.linkInfo.url,
    };
  });
  return {
    id: '-2',
    name: '미분류',
    type: 'folder',
    folderId: -2,
    children,
  };
}
