import { ReactElement, RefObject, useRef } from 'react';
import { Button } from '@/components/Button';
import {
  buttonLayout,
  filterWidgetLayout,
  inputStyle,
} from './OptionWidget.css';
import { FilterHandler } from '../model/useViewerOptions.type';
import {
  Filter,
  FILTER_TEMPLATES,
  FilterTemplate,
  FilterTemplateType,
  InputType,
} from '../template/filter/FilterTemplate';
import { getEntries } from '../types/common.type';
import { ChipItem, ChipItemList } from '../ui/SelectedTagItem';

interface FilterOptionWidgetProps {
  activeFilters: Filter[];
  filterHandler: FilterHandler;
}

/**
 * @description
 *  필터 옵션들을 모두 표시
 *  현재는 버튼이지만 추후 ( PopOver | DropDown ) 으로 변경 예정
 * @todo
 *  마우스 호버시 option.description 표시
 */
export function FilterOptionWidget({
  activeFilters,
  filterHandler,
}: FilterOptionWidgetProps): ReactElement {
  return (
    <div className={filterWidgetLayout}>
      {getEntries(FILTER_TEMPLATES).map(([type, template], idx) => (
        <SampleInput
          filterTemplateType={type}
          filterTemplate={template}
          filterHandler={filterHandler}
          key={idx}
        />
      ))}
      <ActiveOptionList
        activeFilters={activeFilters}
        filterHandler={filterHandler}
      />
    </div>
  );
}

function SampleInput(props: {
  filterTemplateType: FilterTemplateType;
  filterTemplate: FilterTemplate;
  filterHandler: FilterHandler;
}): ReactElement {
  const inputRef = useRef(null);

  const addFilter =
    (filterType: FilterTemplateType, inputRef: RefObject<HTMLInputElement>) =>
    () => {
      const input = inputRef.current?.value;
      if (!input) return;
      props.filterHandler.addFilter(filterType, input);
    };

  return (
    <div>
      <input
        type={props.filterTemplateType}
        ref={inputRef}
        className={inputStyle}
      />
      <div className={buttonLayout}>
        <Button
          onClick={addFilter(
            props.filterTemplateType as FilterTemplateType,
            inputRef
          )}
          size="xs"
          background="warning"
        >
          {props.filterTemplate.label}
        </Button>
      </div>
    </div>
  );
}

interface ActiveOptionListProps {
  activeFilters: Filter[];
  filterHandler: FilterHandler;
}

/* 사용자가 추가한 필터 리스트 */
function ActiveOptionList(props: ActiveOptionListProps): ReactElement {
  const removeFilter = (type: FilterTemplateType, input: InputType) => () => {
    props.filterHandler.removeFilter(type, input);
  };
  return (
    <ChipItemList>
      {props.activeFilters.map((activeFilter, idx) => (
        <ChipItem
          label={`${activeFilter.type}: "${activeFilter.input}"`}
          backgroundColor="#e9ff87ca"
          key={idx}
        >
          <Button
            size="xs"
            onClick={removeFilter(activeFilter.type, activeFilter.input)}
          >
            X
          </Button>
        </ChipItem>
      ))}
    </ChipItemList>
  );
}
