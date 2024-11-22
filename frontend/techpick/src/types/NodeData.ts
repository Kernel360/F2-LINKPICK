import { CSSProperties } from 'react';
import { NodeApi } from 'react-arborist';

export interface NodeData {
  id: string;
  type: 'folder' | 'pick';
  children?: NodeData[];
  name: string;
  folderId?: number; // folder에만 적용
  pickId?: number; // pick에만 적용
  url?: string; // pick에만 적용
}

export interface ArboristCreateProps {
  parentId: string | null;
  parentNode: NodeApi<NodeData> | null;
  index: number;
  type: 'internal' | 'leaf';
}

export interface DirectoryNodeProps {
  node: NodeApi<NodeData>;
  style: CSSProperties;
  dragHandle?: (el: HTMLDivElement | null) => void;
}
