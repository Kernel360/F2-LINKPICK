import { generatePickRecordData } from '@/utils/generatePickRecordData';
import { getAllPickListByFolderId } from './getAllPickListByFolderId';

export const getPickRecordByFolderId = async (folderId: number) => {
  const data = await getAllPickListByFolderId(folderId);
  return generatePickRecordData(data);
};
