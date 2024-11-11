import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import type {
  GetPicksByFolderIdResponseType,
  PickIdOrderedListType,
  PickInfoRecordType,
  PickListType,
} from '@/types';

export const getPicksByFolderId = async (folderId: number) => {
  const data = await getPickListByFolderId(folderId);

  const pickRecordData = generatePickRecordData(data[0]['pickList']);

  return pickRecordData;
};

const getPickListByFolderId = async (folderId: number) => {
  try {
    const response = await apiClient.get<GetPicksByFolderIdResponseType>(
      API_URLS.GET_PICKS_BY_FOLDER_ID(folderId)
    );
    const data = await response.json();

    return data;
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};

const generatePickRecordData = (pickList: PickListType) => {
  const pickIdOrderedList: PickIdOrderedListType = [];
  const pickInfoRecord = {} as PickInfoRecordType;

  for (const pickInfo of pickList) {
    pickIdOrderedList.push(pickInfo.id);
    pickInfoRecord[`${pickInfo.id}`] = pickInfo;
  }

  return { pickIdOrderedList, pickInfoRecord };
};
