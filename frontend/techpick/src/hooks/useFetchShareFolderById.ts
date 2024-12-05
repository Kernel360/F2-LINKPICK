import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getShareFolderById } from '@/apis/folder/getShareFolderById';
import { GetShareFolderListResponseType } from '@/types';

export default function useFetchShareFolderById() {
  const params = useParams();
  const uuid = params.uuid as string;
  const [shareFolderList, setShareFolderList] =
    useState<GetShareFolderListResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchShareFolderData = async () => {
      if (uuid) {
        try {
          setIsLoading(true);
          const data = await getShareFolderById(uuid);
          setShareFolderList(data);
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchShareFolderData();
  }, [uuid]);

  return {
    shareFolderList,
    isLoading,
    isError,
  };
}
