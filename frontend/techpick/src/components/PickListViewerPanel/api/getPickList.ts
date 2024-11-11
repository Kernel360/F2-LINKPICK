import { HTTPError } from 'ky';
import { apiClient, returnErrorFromHTTPError } from '@/apis';
import { SearchParam } from '@/components/PickListViewerPanel/model/useSearchParam';
import { Pick } from '@/components/PickListViewerPanel/types/common.type';

export interface GetPickRequest {
  folderIdList: number[];
  tagIdList: number[];
  searchTokenList: string[];
}

export type GetPickResponse = [
  {
    folderId: number;
    pickList: Pick[];
  },
];

const queryParameter = (
  ...params: { key: string; values: unknown[] }[]
): string => {
  const queryParams = [];
  for (const arg of params) {
    queryParams.push(`${arg.key}=${arg.values.join(',')}`);
  }
  return queryParams.join('&');
};

export const getPickList = {
  withSearchParam: async (
    searchParam: SearchParam
  ): Promise<GetPickResponse> => {
    try {
      const response = await apiClient.get<GetPickResponse>(
        `picks?${queryParameter({
          key: 'folderIdList',
          values: searchParam.folderIdList,
        })}`
      );
      return await response.json();
    } catch (httpError) {
      if (httpError instanceof HTTPError) {
        throw returnErrorFromHTTPError(httpError);
      }
      throw httpError;
    }
  },
};
