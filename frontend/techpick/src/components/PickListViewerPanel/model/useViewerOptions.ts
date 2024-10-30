import { useImmer } from 'use-immer';
import { Options, OptionsHandler } from './useViewerOptions.type';
import {
  FILTER_TEMPLATES,
  FilterTemplateType,
  InputType,
} from '../template/filter/FilterTemplate';
import {
  VIEW_TEMPLATES,
  ViewTemplateType,
} from '../template/view/ViewTemplate';

/**
 * @description
 *  뷰어의 필터 및 정렬 조건을 제공하는 custom hook
 */
export const useViewerOptions = (): {
  activeOptions: Options;
  optionsHandler: OptionsHandler;
} => {
  const [options, setOptions] = useImmer<Options>({
    activeFilters: [],
    viewTemplate: VIEW_TEMPLATES.LIST,
  });

  const isFilterActive = (
    type: FilterTemplateType,
    input: InputType
  ): boolean => {
    return options.activeFilters.some(
      (filter) => filter.input === input && filter.type === type
    );
  };

  const filterHandler = {
    addFilter: (filterType: FilterTemplateType, filterInput: InputType) => {
      if (isFilterActive(filterType, filterInput)) return;
      setOptions((draft) => {
        draft.activeFilters.push({
          input: filterInput,
          type: filterType,
          predicate: FILTER_TEMPLATES[filterType].createFilter(filterInput),
        });
      });
    },
    removeFilter: (filterType: FilterTemplateType, filterData: InputType) =>
      setOptions((draft) => {
        const index = draft.activeFilters.findIndex(
          (filter) => filter.input === filterData && filter.type === filterType
        );
        if (index !== -1) draft.activeFilters.splice(index, 1);
      }),
  };

  const viewHandler = {
    changeView: (viewType: ViewTemplateType) =>
      setOptions((draft) => {
        draft.viewTemplate = VIEW_TEMPLATES[viewType];
      }),
  };

  return {
    activeOptions: options,
    optionsHandler: { filterHandler, viewHandler },
  } as const;
};
