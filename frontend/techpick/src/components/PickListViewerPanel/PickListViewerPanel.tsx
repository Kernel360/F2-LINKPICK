import { useEffect, useState } from 'react';
import {
  getPickList,
  GetPickResponse,
} from '@/components/PickListViewerPanel/api/getPickList';
// import { useSearchParam } from '@/components/PickListViewerPanel/model/useSearchParam';
import {
  globalLayout,
  mainLayout,
} from '@/components/PickListViewerPanel/PickListViewerPanel.css';
import { SearchWidget } from '@/components/PickListViewerPanel/SearchWidget/SearchWidget';
import { useViewerOptions } from './model/useViewerOptions';
import { ViewTemplate } from './template/view/ViewTemplate';

export function PickListViewerPanel() {
  const { activeOptions } = useViewerOptions();

  return (
    <div className={globalLayout}>
      <SearchWidget />
      <div className={mainLayout}>
        <PickListWidget viewTemplate={activeOptions.viewTemplate} />
      </div>
    </div>
  );
}

interface ListWidgetProps {
  viewTemplate: ViewTemplate;
}

function PickListWidget({ viewTemplate }: ListWidgetProps) {
  const [pickResponse, setPickResponse] = useState<GetPickResponse>();

  useEffect(() => {
    (async () => {
      const response = await getPickList
        .withSearchParam
        // useSearchParam.getState()
        ();
      if (response) setPickResponse(response);
    })(/*IIFE*/);
  }, [pickResponse]);

  /*
  const removeDuplicate = (res: GetPickResponse) => {
    const pickList = res.flatMap((eachFolder) => eachFolder.pickList);
    return groupBy((pick) => pick.parentFolderId, pickList);
  };
  */

  return (
    <div className={viewTemplate.listLayoutStyle}>
      {/*{pickResponse &&*/}
      {/*  removeDuplicate(pickResponse).map((pick, idx) => (*/}
      {/*    <viewTemplate.renderComponent uiData={pick} key={idx} />*/}
      {/*  ))}*/}
    </div>
  );
}

/*
const groupBy = <T,>(selector: (data: T) => unknown, sourceList: T[]) => {
  return Array.from(Map.groupBy(sourceList, selector).values()).flat();
};
*/
