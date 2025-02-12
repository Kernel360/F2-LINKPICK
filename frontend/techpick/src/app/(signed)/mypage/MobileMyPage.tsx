'use client';

import { postLogout } from '@/apis/postLogout';
import { ROUTES } from '@/constants/route';
import { greenOutlineButtonStyle } from '@/styles/greenButtonStyle.css';
import { orangeOutlineButtonStyle } from '@/styles/orangeButtonStyle.css';
import { redOutlineButtonStyle } from '@/styles/redButtonStyle.css';
import { CircleAlertIcon, FileQuestionIcon } from 'lucide-react';
import { mobilePageButtonStyle } from './mobileMyPage.css';

export function MobileMyPage() {
  const handleLogout = async () => {
    try {
      await postLogout();
      window.location.replace(ROUTES.LOGIN);
    } catch {
      /* empty */
    }
  };

  return (
    <div>
      <a
        href="https://docs.google.com/forms/d/1mRkjnR66BmFgEj8GZIAwsTXHAa8gK2Fq3TkTqSWJ2yY/viewform?edit_requested=true"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          type="button"
          className={`${greenOutlineButtonStyle} ${mobilePageButtonStyle}`}
        >
          <FileQuestionIcon size={24} />
          <span>기능 추가 문의</span>
        </button>
      </a>

      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSdTAk4txoJodHy9A48Ghn_53gKOHRIa6h9BB_h4yU-ssqC7iw/viewform"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          type="button"
          className={`${orangeOutlineButtonStyle} ${mobilePageButtonStyle}`}
        >
          <CircleAlertIcon size={24} /> <span>불편사항 접수</span>
        </button>
      </a>

      <button
        type="button"
        className={`${redOutlineButtonStyle} ${mobilePageButtonStyle}`}
        onClick={handleLogout}
      >
        <span>로그아웃</span>
      </button>
    </div>
  );
}
