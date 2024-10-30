import { ReactElement, useMemo, useRef } from 'react';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/Button';
import {
  inputStyle,
  submitButtonLayout,
  widgetLayout,
} from './SearchWidget.css';
import { useViewScope } from '../model/useViewScope';
import { StringTokenizer } from '../util';
import { TokenPrefixPattern } from '../util/tokenizer/PrefixTokenizer.type';

/**
 * TODO:
 *   1. 입력창을 삭제하고, 몇글자 이상 입력했을 경우에만 쿼리가 날라가게 처리한다.
 *   2. 검색 자체에 대한 헬퍼 기능을 제공한다.
 *      - 헬퍼 버튼 클릭시, 최근 검색했던 문자를 보여준다.
 */
const searchPattern: TokenPrefixPattern = {
  folderName: 'folder:',
  tagName: '#',
  link: 'link:',
  author: '@',
  pickContent: '', // WARN: 빈 prefix는 반드시 설정의 마지막에 존재해야 합니다.
} as const;

/**
 * SearchWidget은 쿼리를 날리지 않으며, ViewScope만 변경합니다.
 * ViewScope이 변경되면 <ViewportMain/>에서 쿼리를 발생시킵니다.
 */
export function SearchWidget(): ReactElement {
  const viewScope = useViewScope();
  const inputTokenizer = useMemo(() => StringTokenizer(searchPattern), []);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const input = inputTokenizer.tokenize(inputRef.current?.value ?? '');
    const pickContents = input.getTokens('pickContent');
    viewScope.resetPickContents(pickContents);
  };

  return (
    <form className={widgetLayout} onSubmit={(e) => e.preventDefault()}>
      <SearchIcon />
      <input type="text" ref={inputRef} className={inputStyle} />
      <div className={submitButtonLayout}>
        <Button onClick={onSubmit}>테스트</Button>
      </div>
    </form>
  );
}
