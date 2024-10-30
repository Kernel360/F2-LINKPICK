import { ReactElement } from 'react';
import { Button } from '@/components/Button';
import { buttonLayout, viewWidgetLayout } from './OptionWidget.css';
import { ViewHandler } from '../model/useViewerOptions.type';
import {
  VIEW_TEMPLATES,
  ViewTemplate,
  ViewTemplateType,
} from '../template/view/ViewTemplate';
import { ChipItem } from '../ui/SelectedTagItem';

interface ViewOptionWidgetProps {
  selectedViewTemplate: ViewTemplate;
  viewHandler: ViewHandler;
}

/**
 * @description
 *  뷰 모드를 설정하는 위젯 (리스트, 그리드 등등)
 * @todo
 *  1. 옵션 버튼에 마우스 호버시, 옵션 설명을 표시
 *  2. 버튼에서 PopOver로 추후 변경 예정
 */
export function ViewOptionWidget({
  selectedViewTemplate,
  viewHandler,
}: ViewOptionWidgetProps): ReactElement {
  const selectTemplate = (type: ViewTemplateType) => () => {
    viewHandler.changeView(type);
  };

  return (
    <div className={viewWidgetLayout}>
      {Object.entries(VIEW_TEMPLATES).map(([type, option], idx) => (
        <div key={idx}>
          <div className={buttonLayout}>
            <Button
              onClick={selectTemplate(type as ViewTemplateType)}
              size="xs"
              background="primary"
            >
              <option.icon />
              {option.label}
            </Button>
          </div>
        </div>
      ))}
      {/* 사용자가 선택한 뷰 모드 */}
      <ChipItem label={selectedViewTemplate.label}>
        <selectedViewTemplate.icon />
      </ChipItem>
    </div>
  );
}
