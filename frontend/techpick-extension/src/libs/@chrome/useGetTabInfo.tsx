import {
  GET_TAB_HTML_TEXT_FROM_WORKER_PORT_NAME,
  REQUEST_TAB_HTML_TEXT_FROM_WORKER_MESSAGE,
} from '@/constants';
import type { TabInfoFromWorkerMessageType } from '@/types';
import { useEffect, useState } from 'react';
import { correctImageUrl } from './correctImageUrl';
import { unescapeHTML } from './unescapeHTML';

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
    const getTabInfoFromWorker = () => {
      const port = chrome.runtime.connect({
        name: GET_TAB_HTML_TEXT_FROM_WORKER_PORT_NAME,
      });

      port.postMessage(REQUEST_TAB_HTML_TEXT_FROM_WORKER_MESSAGE);

      port.onMessage.addListener((msg: TabInfoFromWorkerMessageType) => {
        setTabInfo({
          title: unescapeHTML(msg.title),
          url: msg.url,
          ogImage: msg.ogData.imageUrl
            ? correctImageUrl(msg.url, msg.ogData.imageUrl)
            : '',
          ogDescription: msg.ogData.description ? msg.ogData.description : '',
        });

        port.disconnect();
      });
    };

    getTabInfoFromWorker();
  }, []);

  return tabInfo;
}
