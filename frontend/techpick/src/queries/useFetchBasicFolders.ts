'use client';

import { getBasicFolders } from '@/apis/folder/getBasicFolders';
import { useQuery } from '@tanstack/react-query';
import { folderKeys } from './folderKeys';

export function useFetchBasicFolders() {
  return useQuery({ queryKey: folderKeys.basic(), queryFn: getBasicFolders });
}
