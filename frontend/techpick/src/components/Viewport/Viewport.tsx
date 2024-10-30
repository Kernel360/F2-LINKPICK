import { ReactElement } from 'react';
import { useViewDataQuery } from './api/useViewDataQuery';
import { useViewScope } from './model/useViewScope';
import { SearchWidget } from './SearchWidget/SearchWidget';
import {
  footerLayout,
  globalLayout,
  headerLayout,
  mainLayout,
} from './Viewport.css';

/**
 * TODO: Viewport 라는 이름이 좀 너무 넓습니다...
 *       나중에 더 좁혀서 네이밍 해야 합니다!!!
 */
export function Viewport(): ReactElement {
  return (
    <div className={globalLayout}>
      <ViewportHeader />
      <ViewportMain />
      <ViewportFooter />
    </div>
  );
}

/**
 * [UI: 검색창]
 *   - 전역 상태 (ViewScope) 변경
 *   - 폴더 포커스 발생시, useViewScope으로 폴더 id를 추가해주세요
 */
function ViewportHeader(): ReactElement {
  return (
    <div className={headerLayout}>
      <SearchWidget />
    </div>
  );
}

/**
 * [UI: 뷰 메인 - 필터 및 리스트 카드 뷰 변경]
 *   - 전역 상태 (ViewScope) 변경 안함
 *   - 지역 상태 (filter option, view option) 변경
 */
function ViewportMain(): ReactElement {
  const viewScope = useViewScope();
  const { data, ...queryInfo } = useViewDataQuery(viewScope);
  // 필터 및 뷰 State 선언을 여기서 수행
  return (
    <div className={mainLayout}>
      {/* <ViewOptionWidget /> */}
      {queryInfo.isLoading ? <div>loading...</div> : <div>{data}</div>}
    </div>
  );
}

/**
 * - [UI: @todo 어떤 ui가 적절할지 고민 필요]
 */
function ViewportFooter(): ReactElement {
  return <div className={footerLayout}>Footer</div>;
}
