import { PUBLIC_DOMAIN } from '@/constants/publicDomain';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  skeleton,
  skeletonImageStyle,
  skeletonTagInputStyle,
} from './SkeltonPickForm.css';
import {
  footerStyle,
  footerTextStyle,
  formFieldLayout,
  pickFormFieldListLayout,
  pickFormLayout,
  plusIconStyle,
  submitButtonStyle,
  titleInputStyle,
} from './UpdatePickForm.css';

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
          <div className={`${skeletonTagInputStyle} ${skeleton}`} />
        </div>
        <div className={formFieldLayout}>
          <div className={`${skeletonTagInputStyle} ${skeleton}`} />
        </div>

        <div className={footerStyle}>
          <a href={PUBLIC_DOMAIN} target="_blank" rel="noreferrer">
            <p className={footerTextStyle}>app.baguni.kr</p>
          </a>
        </div>
      </div>
      <button type="button" className={submitButtonStyle}>
        <div className={plusIconStyle}>
          <PlusIcon width={40} height={40} />
        </div>
      </button>
    </form>
  );
}
