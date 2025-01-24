'use client';

import { ROUTES } from '@/constants/route';
import { useFetchBasicFolders } from '@/queries/useFetchBasicFolders';
import { ArchiveIcon, StarIcon, Trash2Icon } from 'lucide-react';
import { useContext } from 'react';
import { ActiveNavigationItemIdContext } from './ActiveNavigationItemIdProvider';
import { NavigationItem } from './NavigationItem';
import { PickToFolderDropZone } from './PickToFolderDropZone';
import { basicNavigationItemListLayoutStyle } from './basicNavigationItemList.css';
import { sideNavigationTitleLayoutStyle } from './sideNavigationBar.css';

/**
 * 모든 유저가 공통으로 가지고 있눈 추천, 미분류, 휴지통이 포함된 영역입니다.
 */
export function BasicNavigationItemList() {
  const { data: basicFolderRecord } = useFetchBasicFolders();
  const activeNavigationItemId = useContext(ActiveNavigationItemIdContext);

  const isRecommendActive = activeNavigationItemId === 'recommend';

  const isUnclassifiedActive = !!(
    basicFolderRecord &&
    activeNavigationItemId === basicFolderRecord.UNCLASSIFIED.id
  );

  const isRecycleBinActive = !!(
    basicFolderRecord &&
    activeNavigationItemId === basicFolderRecord.RECYCLE_BIN.id
  );

  return (
    <div className={basicNavigationItemListLayoutStyle}>
      <div>
        <div className={sideNavigationTitleLayoutStyle}>
          <h2>정리함</h2>
        </div>
        <NavigationItem
          href={ROUTES.RECOMMEND}
          text="추천"
          icon={StarIcon}
          isActive={isRecommendActive}
        />
        {basicFolderRecord?.UNCLASSIFIED && (
          <PickToFolderDropZone folderId={basicFolderRecord.UNCLASSIFIED.id}>
            <NavigationItem
              href={ROUTES.FOLDER_DETAIL(basicFolderRecord.UNCLASSIFIED.id)}
              text="미분류"
              icon={ArchiveIcon}
              isActive={isUnclassifiedActive}
            />
          </PickToFolderDropZone>
        )}
        {basicFolderRecord?.RECYCLE_BIN && (
          <PickToFolderDropZone folderId={basicFolderRecord.RECYCLE_BIN.id}>
            <NavigationItem
              href={ROUTES.FOLDER_DETAIL(basicFolderRecord.RECYCLE_BIN.id)}
              text="휴지통"
              icon={Trash2Icon}
              isActive={isRecycleBinActive}
            />
          </PickToFolderDropZone>
        )}
      </div>
    </div>
  );
}
