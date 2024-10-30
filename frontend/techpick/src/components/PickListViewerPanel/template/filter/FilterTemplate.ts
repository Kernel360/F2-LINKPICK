import {
  CreateFilter,
  Pick,
  PredicateFn,
  UiInput,
  UiLabel,
} from '../../types/common.type';

export interface Filter {
  input: InputType;
  type: FilterTemplateType;
  predicate: PredicateFn<Pick>;
}

export type FilterTemplateType = 'TAG' | 'TITLE' | 'DATE';

export type FilterTemplate = UiInput & UiLabel & CreateFilter<Pick>;

/**
 * @description
 * 필터 생성 함수로 넘길 파라미터의 타입군
 * createFilter의 데이터 타입 참고
 */
export type InputType = string | Date;

/**
 * @description
 * TODO: 현재 태그 이름으로 필터링 하고 있는데, 이를 TagId로 필터링 하도록 변경해야 합니다.
 *       아직 사용자별 태그 정보를 받는게 없어서, 아래처럼 "이름"으로 일단 구현했습니다.
 *
 * @example
 * ```
 *  createDynamicFilter: (targetTaag: Tag) => (pick: Pick) =>
 *     pick.tagList.some((tag) => tag.tagId === target.tagId),
 * ```
 */
export const FILTER_TEMPLATES: Record<FilterTemplateType, FilterTemplate> = {
  // 특정 태그들을 모두 가지고 있는 Pick을 필터링
  TAG: {
    input: 'text',
    label: '태그명',
    description: '입력한 이름의 태그를 가지고 있는 픽만 보여줍니다',
    createFilter: (targetTagName: InputType) => (pick: Pick) =>
      pick.tagList.some((tag) => tag.tagName === (targetTagName as string)),
  },
  // 특정 단어를 제목으로 포함하고 있는 Pick을 필터링
  TITLE: {
    input: 'text',
    label: '제목',
    description: '입력한 문자열이 제목에 포함된 픽을 보여줍니다',
    createFilter: (targetTitle: InputType) => (pick: Pick) =>
      pick.title.includes(targetTitle as string),
  },
  // 특정 날짜보다 최근에 생성된 픽을 필터링
  DATE: {
    input: 'date',
    label: '날짜',
    description: '입력한 날짜 이후로 생성된 픽을 보여줍니다',
    createFilter: (targetDate: InputType) => (pick: Pick) =>
      (targetDate as Date).getTime() <= pick.updatedAt.getTime(),
  },
} as const;
