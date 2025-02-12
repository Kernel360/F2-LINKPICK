import Image from 'next/image';
import { LoginButtonSection } from './GoogleLoginButton';
import {
  dividerStyle,
  loginBlockContainer,
  pickBrandContainer,
  pickBrandContainerWithText,
  pickIconContainer,
  screenContainer,
} from './page.css';

export default function LoginPage() {
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
      </div>
    </div>
  );
}
