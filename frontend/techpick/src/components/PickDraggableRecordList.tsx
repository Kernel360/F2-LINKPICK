'use client';
import { usePickDndRenderTrigger } from '@/hooks/usePickDndRenderTrigger';
import { useFetchPickListByFolderId } from '@/queries/useFetchPickListByFolderId';
import type { FolderIdType } from '@/types/FolderIdType';
import dynamic from 'next/dynamic';
import { PickDraggableListLayout } from './PickDraggableListLayout';
import { PickDraggableRecord } from './PickRecord/PickDraggableRecord';
import { PickRecordHeader } from './PickRecord/PickRecordHeader';
const EmptyPickRecordImage = dynamic(() =>
  import('@/components/EmptyPickRecordImage').then(
    (mod) => mod.EmptyPickRecordImage,
  ),
);

export function PickDraggableRecordList({
  folderId,
}: PickDraggableRecordListProps) {
  const { data: pickList } = useFetchPickListByFolderId(folderId);
  usePickDndRenderTrigger();

  if (!pickList) {
    return <PickRecordHeader />;
  }

  if (pickList.length === 0) {
    return (
      <div>
        <PickRecordHeader />
        <EmptyPickRecordImage />
      </div>
    );
  }

  return (
    <PickDraggableListLayout folderId={folderId} viewType="record">
      {pickList.map((pickInfo) => {
        return <PickDraggableRecord key={pickInfo.id} pickInfo={pickInfo} />;
      })}
    </PickDraggableListLayout>
  );
}

interface PickDraggableRecordListProps {
  folderId: FolderIdType;
}
