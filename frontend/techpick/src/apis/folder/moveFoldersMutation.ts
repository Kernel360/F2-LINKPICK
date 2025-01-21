import type { MoveFolderRequestType } from '@/types/MoveFolderRequestType';
import { moveFolder } from './moveFolder';

/**
 *
 * @param {MoveFolderRequestType} moveFolderInfo - 폴더 이동에 필요한 정보
 * @param {number[]} moveFolderInfo.idList - 이동할 폴더 ID 목록
 * @param {number} moveFolderInfo.parentFolderId - 원래 부모 폴더의 ID
 * @param {number} moveFolderInfo.destinationFolderId - 이동할 대상 부모 폴더의 ID
 * @param {number} moveFolderInfo.orderIdx - 새 위치에서의 정렬 순서 인덱스
 * @param fromId 이동하는 목록의 기준점입니다.
 * @param toId 이동할 곳입니다. [1,2,3,4,5] 에서 2를 4로 옮긴다면 4가 해당 값입니다.
 * @returns {Promise<void>}
 * @throws {Error}
 */
export const moveFoldersMutation = async ({
  destinationFolderId,
  parentFolderId,
  idList,
  orderIdx,
}: useMoveFoldersMutationParams): Promise<void> => {
  await moveFolder({
    destinationFolderId,
    parentFolderId,
    idList,
    orderIdx,
  });
};

interface useMoveFoldersMutationParams extends MoveFolderRequestType {
  fromId: number;
  toId: number;
}
