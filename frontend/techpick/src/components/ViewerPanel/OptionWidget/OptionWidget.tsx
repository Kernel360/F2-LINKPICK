import { ReactElement } from 'react';
import { FilterOptionWidget } from './FilterOptionWidget';
import { optionWidgetLayout } from './OptionWidget.css';
import { ViewOptionWidget } from './ViewOptionWidget';
import { Options, OptionsHandler } from '../model/useViewerOptions.type';

interface OptionWidgetProps {
  selectedOptions: Options;
  optionsHandler: OptionsHandler;
}

/**
 * @description
 */
export function OptionWidget({
  selectedOptions,
  optionsHandler,
}: OptionWidgetProps): ReactElement {
  return (
    <div className={optionWidgetLayout}>
      <FilterOptionWidget
        activeFilters={selectedOptions.activeFilters}
        filterHandler={optionsHandler.filterHandler}
      />
      <ViewOptionWidget
        selectedViewTemplate={selectedOptions.viewTemplate}
        viewHandler={optionsHandler.viewHandler}
      />
    </div>
  );
}
