import { Link, Pick, Tag } from '../types/common.type';

const generateDummyPick = (title: string, idx: number): Pick => {
  return {
    id: 1,
    title: title,
    memo: 'memo',
    folderId: 1,
    userId: 1,
    tagList: [generateDummyTag(idx)],
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

export const generateDummyServerData = (): Pick[] => {
  const dummy = [];
  for (let i = 0; i < 10; ++i) {
    const title = `Dymmy Title${i}`;
    dummy.push(generateDummyPick(title, i));
  }
  return dummy;
};
