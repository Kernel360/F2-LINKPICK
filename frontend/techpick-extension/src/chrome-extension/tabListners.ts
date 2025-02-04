import { checkPickByUrl } from '@/apis/checkPickByUrl';
import { CHANGE_ICON_PORT_NAME } from '@/constants/changeIconPortName';
import { getAccessToken } from '@/libs/@chrome/getCookie';
import { getCurrentTabInfo } from '@/libs/@chrome/getCurrentTabInfo';

export const tabListeners = () => {
  /**
   * @description 탭이 업데이트될 때마다 탭의 정보를 가져옵니다.
   */
  chrome.tabs.onUpdated.addListener(async (_tabId, changeInfo, tab) => {
    if (
      changeInfo.status === 'complete' &&
      tab.url &&
      tab.url.startsWith('http')
    ) {
      const accessTokenCookie = await getAccessToken();

      if (accessTokenCookie) {
        try {
          const { exist } = await checkPickByUrl(tab.url);

          if (exist) {
            chrome.action.setIcon({
              path: './checkedPick128.png',
              tabId: tab.id,
            });
          } else {
            chrome.action.setIcon({ path: './pick128.png', tabId: tab.id });
          }
        } catch {
          /* empty */
        }
      }
    }
  });

  /**
   * @description 탭이 바뀔 때마다 탭의 html을 가져옵니다.
   */
  chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url?.startsWith('http')) {
      const accessTokenCookie = await getAccessToken();

      if (accessTokenCookie) {
        try {
          const { exist } = await checkPickByUrl(tab.url);

          if (exist) {
            chrome.action.setIcon({
              path: './checkedPick128.png',
              tabId: tab.id,
            });
          } else {
            chrome.action.setIcon({ path: './pick128.png', tabId: tab.id });
          }
        } catch {
          /* empty */
        }
      }
    }
  });

  /**
   * @description 탭을 추가하면 바로 팝업 이미지를 바꿉니다.
   */
  chrome.runtime.onConnect.addListener(async function changeIcon(port) {
    if (port.name !== CHANGE_ICON_PORT_NAME) {
      return;
    }

    const currentTabInfo = await getCurrentTabInfo();
    chrome.action.setIcon({
      path: './checkedPick128.png',
      tabId: currentTabInfo.id,
    });
  });
};
