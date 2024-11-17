import { BookMarked } from 'lucide-react';
import { colorVars } from 'techpick-shared';
import { Text, Button } from '@/libs/@components';
import { PUBLIC_DOMAIN } from '@/constants/publicDomain';
import { loginPageLayout } from './LoginPage.css';

export function LoginPage() {
  return (
    <div className={loginPageLayout}>
      <a href={`${PUBLIC_DOMAIN}`} target="_blank">
        <BookMarked size={64} strokeWidth={1} color={colorVars.onMedia} />
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
