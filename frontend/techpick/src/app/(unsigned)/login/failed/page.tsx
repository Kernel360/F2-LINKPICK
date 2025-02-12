import Image from 'next/image';
import { LoginButtonSection } from '../GoogleLoginButton';
import {
  dividerStyle,
  failedDescriptionTextStyle,
  loginBlockContainer,
  pickBrandContainer,
  pickBrandContainerWithText,
  pickIconContainer,
  screenContainer,
} from '../page.css';

export default function LoginFailedPage() {
  return (
    <div className={screenContainer}>
      <div className={loginBlockContainer}>
        <div className={pickBrandContainer}>
          <div className={pickBrandContainerWithText}>
            <div className={pickIconContainer}>
              <Image
                src={'/image/logo_techpick.png'}
                alt="TechPick Logo"
                fill
                objectFit={'contain'}
              />
            </div>
            <h1 style={{ fontSize: '40px', flexShrink: 0, flexGrow: 1 }}>
              SIGN UP
            </h1>
          </div>
        </div>
        <hr className={dividerStyle} />
        <LoginButtonSection />
        <div className={failedDescriptionTextStyle}>
          <p>죄송합니다. 로그인에 실패했습니다. </p>
        </div>
      </div>
    </div>
  );
}
