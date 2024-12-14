import {
  GET_THEME_FROM_LOCALHOST_PORT_NAME,
  REQUEST_THEME_STATE_FROM_LOCALHOST_MESSAGE,
  LIGHT_THEME_STATE,
  DARK_THEME_STATE,
  THEME_STATE_LOCALHOST_KEY,
  CHANGE_THEME_STATE_TO_LOCALHOST_PORT_NAME,
  GET_TAB_HTML_TEXT_FROM_WORKER_PORT_NAME,
  REQUEST_TAB_HTML_TEXT_FROM_WORKER_MESSAGE,
} from '@/constants';

/**
 * @description 테마를 익스텐션 로컬 호스트에서 불러오는 함수입니다.
 */
chrome.runtime.onConnect.addListener(function checkThemeState(port) {
  if (port.name !== GET_THEME_FROM_LOCALHOST_PORT_NAME) {
    return;
  }

  port.onMessage.addListener(function (msg: string) {
    if (msg === REQUEST_THEME_STATE_FROM_LOCALHOST_MESSAGE) {
      // 로컬 스토리지에서 값 불러오기.
      chrome.storage.sync.get([THEME_STATE_LOCALHOST_KEY]).then((value) => {
        // 없다면 light를 기본 값으로 저장하기.
        if (!value[THEME_STATE_LOCALHOST_KEY]) {
          chrome.storage.sync.set({
            [THEME_STATE_LOCALHOST_KEY]: LIGHT_THEME_STATE,
          });
        }

        port.postMessage(value[THEME_STATE_LOCALHOST_KEY]);
      });
    }
  });
});

/**
 * @description 테마를 변경하는 함수입니다.
 */
chrome.runtime.onConnect.addListener(function changeThemeState(port) {
  if (port.name !== CHANGE_THEME_STATE_TO_LOCALHOST_PORT_NAME) {
    return;
  }

  port.onMessage.addListener(function (msg: string) {
    if (msg !== LIGHT_THEME_STATE && msg !== DARK_THEME_STATE) {
      return;
    }

    chrome.storage.sync.set({
      [THEME_STATE_LOCALHOST_KEY]: msg,
    });
  });
});

let currentTabHtml = '';

/**
 * @description 탭이 업데이트될 때마다 탭의 정보를 가져옵니다.
 */
chrome.tabs.onUpdated.addListener(async (_tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' &&
    tab.url &&
    tab.url.startsWith('http')
  ) {
    try {
      const response = await fetch(tab.url);
      currentTabHtml = await response.text();
    } catch {
      currentTabHtml = '';
    }
  }
});

/**
 * @description 탭이 바뀔 때마다 탭의 html을 가져옵니다.
 */
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url && tab.url.startsWith('http')) {
    try {
      const response = await fetch(tab.url);
      currentTabHtml = await response.text();
    } catch {
      currentTabHtml = '';
    }
  } else {
    currentTabHtml = '';
  }
});

/**
 * @description 메세지를 받고 tab의 정보를 반환합니다.
 */
chrome.runtime.onConnect.addListener(function getHtmlText(port) {
  if (port.name !== GET_TAB_HTML_TEXT_FROM_WORKER_PORT_NAME) {
    return;
  }

  port.onMessage.addListener(function (message) {
    if (message === REQUEST_TAB_HTML_TEXT_FROM_WORKER_MESSAGE) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        port.postMessage({
          htmlText: currentTabHtml,
          url: activeTab.url,
          title: activeTab.title,
        });
      });
    }
  });
});
