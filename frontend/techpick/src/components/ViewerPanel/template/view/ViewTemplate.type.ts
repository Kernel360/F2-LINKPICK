import {
  Pick,
  UiIcon,
  UiLabel,
  UiListComponent,
} from '../../types/common.type';

export type ViewTemplate = UiIcon & UiLabel & UiListComponent<Pick>;

export type ViewTemplateType = 'GRID' | 'LIST';
