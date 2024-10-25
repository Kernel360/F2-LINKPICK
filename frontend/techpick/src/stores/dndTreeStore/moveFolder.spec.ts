import { describe, expect, it } from '@jest/globals';
import { useTreeStore } from './dndTreeStore'; // 여기에 실제 스토어 경로를 입력하세요.
import { mockFolders } from './treeMockDate';
import type { SelectedFolderListType } from './dndTreeStore';
import type { Active, Over } from '@dnd-kit/core'; // 실제 사용하려는 타입을 import 합니다.

describe('MoveFolder 정상 동작 테스트', () => {
  it('1개 이동할 때', () => {
    const { setFrom, setTo, setTreeData, moveFolder } = useTreeStore.getState();

    // given
    const from: Active = {
      id: 1,
      data: {
        current: {
          sortable: {
            containerId: 'Sortable-0',
            index: 1, // 해당 active가 이동한 곳
            items: [2, 1, 3, 4, 5],
          },
        },
      },
      rect: {
        current: {
          initial: null,
          translated: null,
        },
      },
    };
    setFrom(from);

    const to: Over = {
      id: 2,
      rect: {
        width: 400,
        height: 34,
        top: 108,
        bottom: 142,
        right: 522.5,
        left: 122.5,
      },
      data: {
        current: {
          sortable: {
            containerId: 'Sortable-0',
            index: 0,
            items: [2, 1, 3, 4, 5],
          },
        },
      },
      disabled: false,
    };
    setTo(to);
    setTreeData(mockFolders);
    const mockSelectedFolderList: SelectedFolderListType = [1];

    // when
    moveFolder({ from, to, selectedFolderList: mockSelectedFolderList });

    // then
    const { treeDataList } = useTreeStore.getState();
    const treeDataIdList = treeDataList.map((treeData) => treeData.id);
    expect(treeDataIdList).toEqual([2, 1, 3, 4, 5]);
  });

  // it('should not move folders if from or to index is invalid', () => {
  //   // 초기 상태 설정
  //   useTreeStore.setState({
  //     treeDataList: [...mockFolders],
  //     selectedItems: [1, 2], // 이동할 폴더 선택
  //   });
  //   const from: Active = {
  //     id: 10, // 잘못된 폴더 id
  //     data: {} as DataRef,
  //     rect: {
  //       current: {
  //         initial: null,
  //         translated: null,
  //       },
  //     },
  //   };
  //   const to: Over = {
  //     id: 4,
  //     rect: {
  //       width: 100,
  //       height: 100,
  //       top: 0,
  //       right: 100,
  //       bottom: 100,
  //       left: 0,
  //     },
  //     disabled: false,
  //     data: {} as DataRef,
  //   };
  //   // moveFolder 호출
  //   useTreeStore
  //     .getState()
  //     .moveFolder({ from, to, selectedFolderList: [1, 2] });
  //   // 최종 상태 확인
  //   const { treeDataList } = useTreeStore.getState();
  //   expect(treeDataList).toEqual([...mockFolders]); // 상태가 변하지 않아야 함
  // });
});
