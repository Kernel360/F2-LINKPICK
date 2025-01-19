import { ROUTES } from '@/constants/route';

export const isCurrentPathRootOrGeneral = (pathname: string): boolean => {
  return (
    pathname !== ROUTES.FOLDERS_UNCLASSIFIED &&
    pathname !== ROUTES.FOLDERS_RECYCLE_BIN
  );
};
