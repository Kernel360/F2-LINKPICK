import { GET_FOLDER_ID_FROM_LOCALHOST_PORT_NAME } from '@/constants/getFolderIdFromLocalhostPortName';
import { REQUEST_FOLDER_ID_FROM_LOCALHOST_MESSAGE } from '@/constants/requestFolderIdFromLocalhostMessage';
import { useEffect, useState } from 'react';

export function useGetFolderIdFromLocalhost() {
  const [localhostFolderId, setLocalhostFolderId] = useState<
    number | null | undefined
  >();

  useEffect(function getFolderIdFromLocalhost() {
    const port = chrome.runtime.connect({
      name: GET_FOLDER_ID_FROM_LOCALHOST_PORT_NAME,
    });
    port.postMessage(REQUEST_FOLDER_ID_FROM_LOCALHOST_MESSAGE);

    port.onMessage.addListener((folderId: string | null) => {
      const parsedFolderId = Number(folderId);

      if (Number.isNaN(parsedFolderId)) {
        return;
      }

      setLocalhostFolderId(parsedFolderId);
    });

    return () => port.disconnect();
  }, []);

  return { localhostFolderId };
}
