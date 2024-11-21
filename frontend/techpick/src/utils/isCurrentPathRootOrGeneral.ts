import { ROUTES } from '@/constants';

export const isCurrentPathRootOrGeneral = (pathname: string): boolean => {
  return (
    pathname !== ROUTES.FOLDERS_UNCLASSIFIED &&
    pathname !== ROUTES.FOLDERS_RECYCLE_BIN
  );
};
