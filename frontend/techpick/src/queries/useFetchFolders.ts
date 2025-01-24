'use client';

import { getFolders } from '@/apis/folder/getFolders';
import { useQuery } from '@tanstack/react-query';
import { folderKeys } from './folderKeys';

export function useFetchFolders() {
  return useQuery({ queryKey: folderKeys.root(), queryFn: getFolders });
}
