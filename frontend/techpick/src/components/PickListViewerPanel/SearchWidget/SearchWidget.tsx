import { ReactElement, useMemo, useRef } from 'react';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/Button';
import {
  inputStyle,
  submitButtonLayout,
  widgetLayout,
} from './SearchWidget.css';
import { useSearchParamWriter } from '../model/useViewerState';
import { getStringTokenizer } from '../util';
import { PrefixPatternBuilder } from '../util/tokenizer/PrefixPatternBuilder';

/**
 * @todo
 *   1. 입력버튼을 삭제하고, 몇글자 이상 입력했을 경우 자동으로 쿼리가 날라가게 한다.
 *   2. 검색 자체에 대한 헬퍼 기능을 제공한다.
 *      - 헬퍼 버튼 클릭시, 최근 검색했던 문자를 보여준다.
 */
const pattern = new PrefixPatternBuilder()
  .match({ prefix: 'folder:', key: 'folder' })
  .match({ prefix: '#', key: 'tag' })
  .match({ prefix: '@', key: 'user' })
  .ifNoneMatch('pick')
  .build();

export function SearchWidget(): ReactElement {
  const viewStateWriter = useSearchParamWriter();
  const inputTokenizer = useMemo(() => getStringTokenizer(pattern), []);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const result = inputTokenizer.tokenize(inputRef.current?.value ?? '');
    viewStateWriter.writeSearchParamList(result.getTokens('pickContent'));
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
