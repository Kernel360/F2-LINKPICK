import { ReactElement, useEffect, useState } from 'react';
import { useViewerDataQuery } from './api/useViewerDataQuery';
import { useViewerOptions } from './model/useViewerOptions';
import { useViewStateReader } from './model/useViewerState';
import { OptionWidget } from './OptionWidget/OptionWidget';
import { SearchWidget } from './SearchWidget/SearchWidget';
import { Filter } from './template/filter/FilterTemplate';
import { ViewTemplate } from './template/view/ViewTemplate.type';
import { Pick } from './types/common.type';
import { getStream } from './util';
import { globalLayout, mainLayout } from './ViewerPanel.css';

/**
 * @todo
 *  자세한 이름으로 변경 필요
 */
export function ViewerPanel(): ReactElement {
  return (
    <div className={globalLayout}>
      <SearchWidget />
      <ViewerWidget />
    </div>
  );
}

function ViewerWidget(): ReactElement {
  const { data: dataFromServer } = useViewerDataQuery(useViewStateReader());
  const { activeOptions, optionsHandler } = useViewerOptions();
  const [processedList, setProcessedList] = useState<Pick[]>([]);

  useEffect(() => {
    // re-render if 'server-data' or 'selected-options' change.
    if (!dataFromServer) return;
    const precessedList = applyFilters(
      dataFromServer,
      activeOptions.activeFilters
    );
    setProcessedList(precessedList);
  }, [dataFromServer, activeOptions]);

  return (
    <div className={mainLayout}>
      <OptionWidget
        selectedOptions={activeOptions}
        optionsHandler={optionsHandler}
      />
      {renderList(activeOptions.viewTemplate, processedList)}
    </div>
  );
}

/** 리스트를 외부에서 주입한 UI로 렌더링 */
const renderList = (
  viewTemplate: ViewTemplate,
  list?: Pick[]
): ReactElement => {
  return (
    <div className={viewTemplate.listLayoutStyle}>
      {list?.map((pick, idx) => (
        <viewTemplate.listElement uiData={pick} key={idx} />
      ))}
    </div>
  );
};

/** 선택된 필터와 정렬을 일괄 적용 */
const applyFilters = (source: Pick[], filters: Filter[]): Pick[] => {
  return getStream(source)
    .filters(filters.map((filter) => filter.predicate))
    .applyAll();
};
