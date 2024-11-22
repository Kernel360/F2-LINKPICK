import { useEffect, useState } from 'react';
import { fetchFaviconAndDescription } from './useGetTabInfo.lib';

interface TabInfo {
  title: string;
  url: string;
  ogDescription: string;
  ogImage: string;
}

export function useGetTabInfo() {
  const [tabInfo, setTabInfo] = useState<TabInfo>({
    title: '',
    url: '',
    ogImage: '',
    ogDescription: '',
  });

  useEffect(() => {
    const getTabInfo = async () => {
      // 현재 탭 정보 가져오기
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      const tab = tabs[0];

      setTabInfo((prev) => ({
        ...prev,
        title: tab.title ?? '',
        url: tab.url ?? '',
      }));

      // http가 아닌 다른 URL(ex: chrome)은 권한이 없어서 확장 프로그램에서 에러가 날 수 있습니다.
      if (tab.url && !tab.url.startsWith('http')) {
        return;
      }

      if (!tab.id) {
        return;
      }

      const result = await fetchFaviconAndDescription(tab.id);

      if (!result) {
        return;
      }

      setTabInfo((prev) => ({
        ...prev,
        ogDescription: result.ogDescription,
        ogImage: result.ogImage,
      }));
    };

    getTabInfo();
  }, []);

  return tabInfo;
}
