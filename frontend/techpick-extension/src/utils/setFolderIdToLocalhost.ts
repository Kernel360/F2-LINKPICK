import { SET_FOLDER_ID_TO_LOCALHOST_PORT_NAME } from '@/constants/setFolderIdToLocalhostPortName';

export const setFolderIdToLocalhost = (folderId: number) => {
  const port = chrome.runtime.connect({
    name: SET_FOLDER_ID_TO_LOCALHOST_PORT_NAME,
  });

  port.postMessage(folderId);
  port.disconnect();
};
