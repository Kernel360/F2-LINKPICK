import { ViewTemplate, ViewTemplateType } from '../template/view/ViewTemplate';

export interface Options {
  viewTemplate: ViewTemplate;
}

export interface ViewHandler {
  changeView: (key: ViewTemplateType) => void;
}

export interface OptionsHandler {
  viewHandler: ViewHandler;
}
