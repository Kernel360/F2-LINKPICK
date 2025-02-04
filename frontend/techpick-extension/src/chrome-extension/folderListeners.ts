import { FOLDER_ID_LOCALHOST_KEY } from '@/constants/folderIdLocalhostKey';
import { GET_FOLDER_ID_FROM_LOCALHOST_PORT_NAME } from '@/constants/getFolderIdFromLocalhostPortName';
import { REQUEST_FOLDER_ID_FROM_LOCALHOST_MESSAGE } from '@/constants/requestFolderIdFromLocalhostMessage';
import { SET_FOLDER_ID_TO_LOCALHOST_PORT_NAME } from '@/constants/setFolderIdToLocalhostPortName';

export const folderListeners = () => {
  chrome.runtime.onConnect.addListener(function getFolderId(port) {
    if (port.name !== GET_FOLDER_ID_FROM_LOCALHOST_PORT_NAME) {
      return;
    }

    port.onMessage.addListener((msg: string) => {
      if (msg === REQUEST_FOLDER_ID_FROM_LOCALHOST_MESSAGE) {
        // 로컬 스토리지에서 값 불러오기.
        chrome.storage.sync.get([FOLDER_ID_LOCALHOST_KEY]).then((value) => {
          // 없다면 light를 기본 값으로 저장하기.
          if (!value[FOLDER_ID_LOCALHOST_KEY]) {
            chrome.storage.sync.set({
              [FOLDER_ID_LOCALHOST_KEY]: null,
            });
          }

          port.postMessage(value[FOLDER_ID_LOCALHOST_KEY]);
        });
      }
    });
  });

  chrome.runtime.onConnect.addListener(function setFolderId(port) {
    if (port.name !== SET_FOLDER_ID_TO_LOCALHOST_PORT_NAME) {
      return;
    }

    port.onMessage.addListener((folderId: number) => {
      if (Number.isNaN(folderId)) {
        return;
      }

      chrome.storage.sync.set({
        [FOLDER_ID_LOCALHOST_KEY]: folderId,
      });
    });
  });
};
