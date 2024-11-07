import { GetPickResponse } from '@/components/PickListViewerPanel/api/getPickList';
import { Pick } from '../types/common.type';

const generateDummyPickList = (size: number) => {
  const pickList: Pick[] = [];
  for (let i = 0; i < size; i++) {
    pickList.push(generateDummyPick());
  }
  return pickList;
};

const generateDummyPick = () => {
  return {
    id: 0,
    title: 'string',
    memo: 'string',
    linkInfo: {
      url: 'https://velog.io/@hyeok_1212/Java-Record-%EC%82%AC%EC%9A%A9%ED%95%98%EC%8B%9C%EB%82%98%EC%9A%94',
      title: '[Java] Record 사용하시나요?',
      description: 'IntelliJ : 레코드 써봐',
      imageUrl:
        'https://velog.velcdn.com/images/hyeok_1212/post/5ea148fb-1490-4b03-811e-222b4d26b65e/image.png',
      invalidatedAt: '2024-10-19T10:46:30.035Z',
    },
    parentFolderId: 0,
    tagOrderList: [0],
    createdAt: '2024-11-05T03:33:22.659Z',
    updatedAt: '2024-11-05T03:33:22.659Z',
  };
};

export const DummyData: GetPickResponse = [
  {
    folderId: 0,
    pickList: generateDummyPickList(5),
  },
];
