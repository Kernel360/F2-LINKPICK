import { COLOR_LIST } from '@/constants';

type LuminosityType = 'dark' | 'light';

export const numberToRandomColor = (
  number: number,
  luminosity: LuminosityType = 'light'
) => {
  const colorList = luminosity ? COLOR_LIST : COLOR_LIST;
  const length = colorList.length;
  const seedNumber = number % length;

  return colorList[seedNumber];
};
