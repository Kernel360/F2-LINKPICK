import { SearchSelectOption } from '../types';

export const createSearchSelectOptions = (
  list: Array<{ id: number; name: string }>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterCondition: (item: any) => boolean = () => true
): SearchSelectOption[] =>
  list.filter(filterCondition).map((item) => ({
    value: item.id,
    label: item.name,
  }));
