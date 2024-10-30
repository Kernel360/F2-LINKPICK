import { ViewerStateReader } from '../model/useViewerState.type';
import { Link, Pick, Tag } from '../types/common.type';

const generateDummyPick = (title: string, idx: number): Pick => {
  return {
    id: 1,
    title: title,
    memo: 'memo',
    folderId: 1,
    userId: 1,
    tagList: [idx % 2 ? generateDummyTag(idx) : generateDummyTag(idx + 1)],
    linkUrlResponse: generateDummyLink(),
    updatedAt: new Date(),
    createdAt: new Date(),
  };
};

const generateDummyTag = (num: number): Tag => {
  return {
    tagId: num,
    tagName: `Tag${num}`,
    tagOrder: num,
    colorNumber: num,
    userId: 1,
  };
};

const generateDummyLink = (): Link => {
  return {
    id: 1,
    url: 'radomUrl',
    imageUrl: 'example.com',
  };
};

export const generateDummyServerData = (reader: ViewerStateReader): Pick[] => {
  const dummy = [];
  let title = 'dummy title';
  if (1 <= reader.readPickContents().length) {
    title = reader.readPickContents()[0];
  }
  for (let i = 0; i < 5; ++i) {
    dummy.push(generateDummyPick(title, i));
  }
  return dummy;
};
