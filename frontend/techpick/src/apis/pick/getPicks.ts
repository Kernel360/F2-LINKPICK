import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { API_URLS } from '../apiConstants';
import type {
  GetPicksResponseType,
  PickIdOrderedListType,
  PickInfoRecordType,
  PickListType,
  PickRecordValueType,
} from '@/types';

const removeDuplicates = (res: GetPicksResponseType) => {
  const pickList = res.flatMap((eachFolder) => eachFolder.pickList);
  return Map.groupBy(pickList, (pick) => pick.parentFolderId);
};

export const getPicksByQueryParam = async (queryParam: string) => {
  const pickListsPerFolder = removeDuplicates(
    await getPickListByQueryParam(queryParam)
  );
  const result = [] as (PickRecordValueType & { parentFolderId: number })[];
  pickListsPerFolder.forEach((pickList, parentFolderId) => {
    result.push({
      ...generatePickRecordData(pickList),
      parentFolderId: parentFolderId,
    });
  });
  return result;
};

export const getPicksByFolderId = async (folderId: number) => {
  const data = await getPickListByFolderId(folderId);
  return generatePickRecordData(data[0]['pickList']);
};

export const getPickListByQueryParam = async (queryParam: string) => {
  try {
    const response = await apiClient.get<GetPicksResponseType>(
      API_URLS.GET_PICKS_BY_QUERY_PARAM(queryParam)
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

const getPickListByFolderId = async (folderId: number) => {
  try {
    const response = await apiClient.get<GetPicksResponseType>(
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
