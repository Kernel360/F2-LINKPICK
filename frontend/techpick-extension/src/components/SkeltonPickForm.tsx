import { PUBLIC_DOMAIN } from '@/constants';
import {
  pickFormLayout,
  formFieldLayout,
  titleInputStyle,
  submitButtonStyle,
  plusIconStyle,
  pickFormFieldListLayout,
  footerStyle,
  footerTextStyle,
} from './CreatePickForm.css';
import {
  skeleton,
  skeletonImageStyle,
  skeletonTagInputStyle,
} from './SkeltonPickForm.css';
import { PlusIcon } from '@radix-ui/react-icons';

export function SkeltonPickForm() {
  return (
    <form className={pickFormLayout} onSubmit={(e) => e.preventDefault()}>
      <div className={pickFormFieldListLayout}>
        <div className={formFieldLayout}>
          <div className={`${skeleton} ${skeletonImageStyle}`} />
          <div
            data-skeleton={true}
            className={`${titleInputStyle} ${skeleton}`}
          />
        </div>
        <div className={formFieldLayout}>
          <div className={`${skeletonTagInputStyle} ${skeleton}`}></div>
        </div>
        <div className={formFieldLayout}>
          <div className={`${skeletonTagInputStyle} ${skeleton}`}></div>
        </div>

        <div className={footerStyle}>
          <a href={PUBLIC_DOMAIN} target="_blank">
            <p className={footerTextStyle}>app.techpick.org</p>
          </a>
        </div>
      </div>
      <button className={submitButtonStyle}>
        <div className={plusIconStyle}>
          <PlusIcon width={40} height={40} />
        </div>
      </button>
    </form>
  );
}
