import { style } from '@vanilla-extract/css';
import { colorVars } from 'techpick-shared';
import { folderInfoItemStyle } from '../FolderTree/folderLinkItem.css';

export const folderItemOverlay = style([
  folderInfoItemStyle,
  {
    color: colorVars.point,
    backgroundColor: colorVars.gold4,
    opacity: '0.8',
  },
]);
