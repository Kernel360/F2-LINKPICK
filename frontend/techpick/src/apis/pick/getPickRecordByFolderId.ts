import { generatePickRecordData } from '@/utils/generatePickRecordData';
import { getPickListByFolderId } from './getPickListByFolderId';

export const getPickRecordByFolderId = async (folderId: number) => {
  const data = await getPickListByFolderId(folderId);
  return generatePickRecordData(data);
};
