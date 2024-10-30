import { useGetPickSearchQuery } from './api/useGetPickSearchQuery';
import { useViewerOptions } from './model/useViewerOptions';
import { useSearchParamReader } from './model/useViewerState';
import { OptionWidget } from './OptionWidget/OptionWidget';
import { globalLayout, mainLayout } from './PickListViewerPanel.css';
import { SearchWidget } from './SearchWidget/SearchWidget';
import { Filter } from './template/filter/FilterTemplate';
import { ViewTemplate } from './template/view/ViewTemplate';
import { Pick } from './types/common.type';
import { getStream } from './util';

/**
 * @todo
 *  자세한 이름으로 변경 필요
 */
export function PickListViewerPanel() {
  const { activeOptions, optionsHandler } = useViewerOptions();

  return (
    <div className={globalLayout}>
      <SearchWidget />
      <div className={mainLayout}>
        <OptionWidget
          selectedOptions={activeOptions}
          optionsHandler={optionsHandler}
        />
        <PickListWidget
          activeFilters={activeOptions.activeFilters}
          viewTemplate={activeOptions.viewTemplate}
        />
      </div>
    </div>
  );
}

interface ListWidgetProps {
  activeFilters: Filter[];
  viewTemplate: ViewTemplate;
}

function PickListWidget({ activeFilters, viewTemplate }: ListWidgetProps) {
  const { data: dataFromServer } = useGetPickSearchQuery({
    searchParamList: useSearchParamReader().readSearchParamList(),
  });

  if (!dataFromServer) return null;
  const processedPickList = applyFilters(dataFromServer, activeFilters);

  return (
    <div className={viewTemplate.listLayoutStyle}>
      {processedPickList.map((pick, idx) => (
        <viewTemplate.renderComponent uiData={pick} key={idx} />
      ))}
    </div>
  );
}

/** 선택된 필터와 정렬을 일괄 적용 */
const applyFilters = (source: Pick[], filters: Filter[]): Pick[] => {
  return getStream(source)
    .filters(filters.map((filter) => filter.predicate))
    .applyAll();
};
