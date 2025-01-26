import type { MoveFolderRequestType } from '@/types/MoveFolderRequestType';
import { HTTPError } from 'ky';
import { apiClient } from '../apiClient';
import { API_URLS } from '../apiConstants';
import { returnErrorFromHTTPError } from '../error';

/**
 *
 * @param {MoveFolderRequestType} moveFolderInfo - 폴더 이동에 필요한 정보
 * @param {number[]} moveFolderInfo.idList - 이동할 폴더 ID 목록
 * @param {number} moveFolderInfo.parentFolderId - 원래 부모 폴더의 ID
 * @param {number} moveFolderInfo.destinationFolderId - 이동할 대상 부모 폴더의 ID
 * @param {number} moveFolderInfo.orderIdx - 새 위치에서의 정렬 순서 인덱스
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const moveFolder = async (
  moveFolderInfo: MoveFolderRequestType,
): Promise<void> => {
  try {
    await apiClient.patch(API_URLS.MOVE_FOLDER, { json: moveFolderInfo });

    return;
  } catch (httpError) {
    if (httpError instanceof HTTPError) {
      const error = await returnErrorFromHTTPError(httpError);
      throw error;
    }
    throw httpError;
  }
};
