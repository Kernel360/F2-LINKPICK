import { beforeEach, describe, expect, it } from '@jest/globals';
import { useTreeStore } from './dndTreeStore'; // 여기에 실제 스토어 경로를 입력하세요.
import { mockFolders } from './treeMockDate';
import type { SelectedFolderListType } from './dndTreeStore';
import type { Active, Over } from '@dnd-kit/core'; // 실제 사용하려는 타입을 import 합니다.

describe('같은 계층에서 폴더 1개씩 이동할 때 정상 동작 테스트', () => {
  beforeEach(() => {
    // test간 영향을 주지 않기 위해 항상 초기화.
    const { setTreeData } = useTreeStore.getState();
    setTreeData(mockFolders);
  });

  it('뒤에 있는 값을 앞으로 떙길 때', () => {
    const { setFrom, setTo, moveFolder } = useTreeStore.getState();

    // given
    const from: Active = {
      id: 2,
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
      id: 1,
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

    const mockSelectedFolderList: SelectedFolderListType = [2];

    // when
    moveFolder({ from, to, selectedFolderList: mockSelectedFolderList });

    // then
    const { treeDataList } = useTreeStore.getState();
    const treeDataIdList = treeDataList.map((treeData) => treeData.id);
    expect(treeDataIdList).toEqual([2, 1, 3, 4, 5]);
  });

  it('앞에 있는 값을 뒤로 미룰 떄', () => {
    const { setFrom, setTo, moveFolder } = useTreeStore.getState();

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

    const mockSelectedFolderList: SelectedFolderListType = [1];

    // when
    moveFolder({ from, to, selectedFolderList: mockSelectedFolderList });

    // then
    const { treeDataList } = useTreeStore.getState();
    const treeDataIdList = treeDataList.map((treeData) => treeData.id);
    expect(treeDataIdList).toEqual([2, 1, 3, 4, 5]);
  });
});

describe('같은 계층에서 2개 이상의 폴더를 이동할 때 정상 동작 테스트', () => {
  beforeEach(() => {
    // test간 영향을 주지 않기 위해 항상 초기화.
    const { setTreeData } = useTreeStore.getState();
    setTreeData(mockFolders);
  });

  describe('뒤에 있는 값을 앞으로 떙길 때', () => {
    it('2개를 앞으로 땡기면 정렬된다.', () => {
      const { setFrom, setTo, moveFolder } = useTreeStore.getState();

      // given
      const from: Active = {
        id: 4,
        data: {
          current: {
            sortable: {
              containerId: 'Sortable-0',
              index: 1, // 해당 active가 이동한 곳
              items: [4, 5, 1, 2, 3],
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
        id: 1,
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
              items: [4, 5, 1, 2, 3],
            },
          },
        },
        disabled: false,
      };
      setTo(to);

      const mockSelectedFolderList: SelectedFolderListType = [4, 5];

      // when
      moveFolder({ from, to, selectedFolderList: mockSelectedFolderList });

      // then
      const { treeDataList } = useTreeStore.getState();
      const treeDataIdList = treeDataList.map((treeData) => treeData.id);
      expect(treeDataIdList).toEqual([4, 5, 1, 2, 3]);
    });

    it('3개를 앞으로 땡기면 정렬된다.', () => {
      const { setFrom, setTo, moveFolder } = useTreeStore.getState();

      // given
      const from: Active = {
        id: 2,
        data: {
          current: {
            sortable: {
              containerId: 'Sortable-0',
              index: 1, // 해당 active가 이동한 곳
              items: [2, 3, 4, 1, 5],
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
        id: 1,
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
              items: [2, 3, 4, 1, 5],
            },
          },
        },
        disabled: false,
      };
      setTo(to);

      const mockSelectedFolderList: SelectedFolderListType = [2, 3, 4];

      // when
      moveFolder({ from, to, selectedFolderList: mockSelectedFolderList });

      // then
      const { treeDataList } = useTreeStore.getState();
      const treeDataIdList = treeDataList.map((treeData) => treeData.id);
      expect(treeDataIdList).toEqual([2, 3, 4, 1, 5]);
    });

    it('4개를 앞으로 땡기면 정렬된다.', () => {
      const { setFrom, setTo, moveFolder } = useTreeStore.getState();

      // given
      const from: Active = {
        id: 2,
        data: {
          current: {
            sortable: {
              containerId: 'Sortable-0',
              index: 1, // 해당 active가 이동한 곳
              items: [2, 3, 4, 5, 1],
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
        id: 1,
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
              items: [2, 3, 4, 5, 1],
            },
          },
        },
        disabled: false,
      };
      setTo(to);

      const mockSelectedFolderList: SelectedFolderListType = [2, 3, 4, 5];

      // when
      moveFolder({ from, to, selectedFolderList: mockSelectedFolderList });

      // then
      const { treeDataList } = useTreeStore.getState();
      const treeDataIdList = treeDataList.map((treeData) => treeData.id);
      expect(treeDataIdList).toEqual([2, 3, 4, 5, 1]);
    });
  });

  it('앞에 있는 값을 뒤로 미룰 떄', () => {
    const { setFrom, setTo, moveFolder } = useTreeStore.getState();

    // given
    const from: Active = {
      id: 3,
      data: {
        current: {
          sortable: {
            containerId: 'Sortable-0',
            index: 3, // 해당 active가 이동한 곳
            items: [4, 1, 2, 3, 5],
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
      id: 4,
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
            index: 3,
            items: [4, 1, 2, 3, 5],
          },
        },
      },
      disabled: false,
    };
    setTo(to);

    const mockSelectedFolderList: SelectedFolderListType = [1, 2, 3];

    // when
    moveFolder({ from, to, selectedFolderList: mockSelectedFolderList });

    // then
    const { treeDataList } = useTreeStore.getState();
    const treeDataIdList = treeDataList.map((treeData) => treeData.id);
    expect(treeDataIdList).toEqual([4, 1, 2, 3, 5]);
  });
});
