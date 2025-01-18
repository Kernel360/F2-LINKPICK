import type { SearchSelectOptionType } from '@/types/SearchSelectOptionType';

export const createSearchSelectOptions = (
  list: Array<{ id: number; name: string }>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  filterCondition: (item: any) => boolean = () => true,
): SearchSelectOptionType[] =>
  list.filter(filterCondition).map((item) => ({
    value: item.id,
    label: item.name,
  }));
