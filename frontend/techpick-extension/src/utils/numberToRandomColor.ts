import randomColor from 'randomcolor';

type LuminosityType = 'dark' | 'light';

export const numberToRandomColor = (
  number: number,
  luminosity: LuminosityType = 'light'
) => {
  return randomColor({
    format: 'hex',
    luminosity,
    seed: number,
  });
};
