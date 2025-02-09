export const folderKeys = {
  all: ['folders'] as const,
  basic: () => [...folderKeys.all, 'basic'] as const,
  root: () => [...folderKeys.all, 'root'] as const,
  rootList: () => [...folderKeys.root(), 'list'] as const,
  share: () => [...folderKeys.all, 'share'] as const,
  rootAndBasic: () => [...folderKeys.root(), 'basic'],
};
