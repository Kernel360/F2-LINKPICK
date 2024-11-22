import { useMutation } from '@tanstack/react-query';
import { postLogout } from './queryFunctions';

export const useLogout = () => {
  return useMutation({ mutationFn: postLogout });
};
