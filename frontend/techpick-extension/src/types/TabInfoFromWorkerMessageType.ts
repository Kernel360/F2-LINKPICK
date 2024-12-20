import { GetOgTagDataResponseType } from './GetOgTagDataResponseType';

export type TabInfoFromWorkerMessageType = {
  ogData: GetOgTagDataResponseType;
  url: string;
  title: string;
};
