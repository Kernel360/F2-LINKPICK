import { useImmer } from 'use-immer';
import { Options, OptionsHandler } from './useViewerOptions.type';
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
    viewTemplate: VIEW_TEMPLATES.LIST,
  });

  const viewHandler = {
    changeView: (viewType: ViewTemplateType) =>
      setOptions((draft) => {
        draft.viewTemplate = VIEW_TEMPLATES[viewType];
      }),
  };

  return {
    activeOptions: options,
    optionsHandler: { viewHandler },
  } as const;
};
