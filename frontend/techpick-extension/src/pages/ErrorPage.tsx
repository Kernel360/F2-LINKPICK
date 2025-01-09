import { Text, Gap } from '@/libs/@components';
import { errorPageLayout } from './ErrorPage.css';

export function ErrorPage() {
  return (
    <div className={errorPageLayout}>
      <Text size="2xl" weight="extrabold" asChild>
        <h1>죄송합니다.</h1>
      </Text>
      <Gap verticalSize="gap4" />
      <Text size="xl" weight="bold">
        에러가 발생했습니다.
      </Text>
      <Gap verticalSize="gap24" />
      <Gap verticalSize="gap16" />
      <Text size="xl">다시 확장 프로그램을 켜주세요.</Text>
    </div>
  );
}
