import {
  Filter,
  FilterTemplateType,
  InputType,
} from '../template/filter/FilterTemplate';
import { ViewTemplate, ViewTemplateType } from '../template/view/ViewTemplate';

export interface Options {
  activeFilters: Filter[];
  viewTemplate: ViewTemplate;
}

export interface FilterHandler {
  addFilter: (type: FilterTemplateType, input: InputType) => void;
  removeFilter: (type: FilterTemplateType, input: InputType) => void;
}

export interface ViewHandler {
  changeView: (key: ViewTemplateType) => void;
}

export interface OptionsHandler {
  filterHandler: FilterHandler;
  viewHandler: ViewHandler;
}
