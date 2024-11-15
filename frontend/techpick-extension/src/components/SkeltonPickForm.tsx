import { Button, Text } from '@/libs/@components';
import {
  pickFormLayout,
  formFieldLayout,
  titleInputStyle,
  textAreaStyle,
  submitButtonLayout,
  labelLayout,
} from './CreatePickForm.css';
import {
  skeleton,
  skeletonImageStyle,
  skeletonTagInputStyle,
} from './SkeltonPickForm.css';

export function SkeltonPickForm() {
  return (
    <form className={pickFormLayout} onSubmit={(e) => e.preventDefault()}>
      <div className={formFieldLayout}>
        <div className={`${skeleton} ${skeletonImageStyle}`} />
        <div
          data-skeleton={true}
          className={`${titleInputStyle} ${skeleton}`}
        />
      </div>
      <div className={formFieldLayout}>
        <div className={labelLayout}>
          <Text size="2xl" asChild>
            <label htmlFor="">태그</label>
          </Text>
        </div>
        <div className={`${skeletonTagInputStyle} ${skeleton}`}></div>
      </div>
      <div className={formFieldLayout}>
        <div className={labelLayout}>
          <Text size="2xl" asChild>
            <label htmlFor="">메모</label>
          </Text>
        </div>
        <div className={`${textAreaStyle} ${skeleton}`}></div>
      </div>
      <div className={submitButtonLayout}>
        <Button>제출</Button>
      </div>
    </form>
  );
}
