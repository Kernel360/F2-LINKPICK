import { BookMarked } from 'lucide-react';
import { colorThemeContract } from 'techpick-shared';
import { Text, Button, PUBLIC_DOMAIN } from '@/shared';
import { loginPageLayout } from './LoginPage.css';

export function LoginPage() {
  return (
    <div className={loginPageLayout}>
      <a href={`${PUBLIC_DOMAIN}`} target="_blank">
        <BookMarked
          size={64}
          strokeWidth={1}
          color={colorThemeContract.onMedia}
        />
      </a>

      <Text size="2xl" color="white" asChild>
        <h1>태그와 함께 북마크하세요!</h1>
      </Text>

      <a href={`${PUBLIC_DOMAIN}/login`} target="_blank">
        <Button background="white">
          <Text color="primary" weight="bold">
            로그인
          </Text>
        </Button>
      </a>
    </div>
  );
}
