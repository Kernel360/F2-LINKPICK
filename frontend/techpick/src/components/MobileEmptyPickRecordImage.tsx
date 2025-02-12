import { SquirrelIcon } from 'lucide-react';
import {
  emptyPickListLayoutStyle,
  mobileEmptyPickRecordImageStyle,
} from './mobileEmptyPickRecordImage.css';

export function MobileEmptyPickRecordImage() {
  return (
    <div className={mobileEmptyPickRecordImageStyle}>
      <div className={emptyPickListLayoutStyle}>
        <SquirrelIcon size={'50vw'} />
        <div>
          <p>북마크 대신 귀여운 다람쥐가 있네요! </p>
        </div>
      </div>
    </div>
  );
}
