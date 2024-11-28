import {
  GET_TAB_HTML_TEXT_FROM_WORKER_PORT_NAME,
  REQUEST_TAB_HTML_TEXT_FROM_WORKER_MESSAGE,
} from '@/constants';
import type { TabInfoFromWorkerMessageType } from '@/types';
import { extractOpenGraphMetadata } from '@/utils';
import { useEffect, useState } from 'react';

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
        const { ogImage, ogDescription } = extractOpenGraphMetadata(
          msg.htmlText
        );

        setTabInfo({
          title: msg.title,
          url: msg.url,
          ogImage: ogImage ? ogImage : '',
          ogDescription: ogDescription ? ogDescription : '',
        });

        port.disconnect();
      });
    };

    getTabInfoFromWorker();
  }, []);

  return tabInfo;
}
