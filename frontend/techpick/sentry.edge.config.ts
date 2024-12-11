// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://1d6c7e3ae35f9bb6335a01e68eb11fc9@o4508387512745984.ingest.us.sentry.io/4508387515301888',

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  /**
   * 에러가 발생할 때 즉시 녹화가 시작되어 지속되는 리플레이 샘플 속도입니다.
   * 오류 전 최대 1분동안 이벤트를 기록합니다.
   * 1.0 - 0 사이의 값을 사용합니다. (1.0 권장)
   */
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      /**
       * 모튼 텍스트를 마스킹하지 않습니다.
       */
      maskAllText: false,
      /**
       * 모튼 미디어를 차단하지 않습니다.
       */
      blockAllMedia: false,
    }),
  ],
});
