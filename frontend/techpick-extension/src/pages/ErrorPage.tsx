import { useRouteError } from 'react-router-dom';
import { Text, Gap } from '@/libs/@components';
import { errorPageLayout } from './ErrorPage.css';

export function ErrorPage() {
  const error = useRouteError();

  return (
    <div className={errorPageLayout}>
      <Text size="2xl" weight="extrabold" asChild>
        <h1>Error가 발생했습니다.</h1>
      </Text>
      <Gap verticalSize="gap24" />
      <Text size="xl" asChild>
        <h2>{error instanceof Error ? error.message : '알 수 없는 에러'}</h2>
      </Text>
      <Gap verticalSize="gap16" />
      <Text size="xl">다시 확장 프로그램을 켜주세요.</Text>
    </div>
  );
}
