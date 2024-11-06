import { ReactElement } from 'react';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { ApiLinkUrlData, ApiPickData, ApiTagData } from '@/types/ApiTypes';
import { InputType } from '../template/filter/FilterTemplate';

export type Tag = ApiTagData;

export type Pick = ApiPickData;

export type Link = ApiLinkUrlData;

export type PredicateFn<T> = (src: T) => boolean;

export type CompareFn<T> = (lh: T, rh: T, direction?: Direction) => number;

/**
 * @description
 *  Object.entries의 key-value 타입을 복원하기 위한 getEntries() 메서드
 */
export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];

export const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

/**
 * @description
 * UI 프로퍼티 조합을 위한 인터페이스 선언입니다.
 * @example_usage
 * type Foo = UiIcon & UiInput & UiLabel;
 * type Bar = UiData
 */
export interface UiIcon {
  icon: RadixUiIconElement;
}

export interface UiInput {
  input: string;
}

export interface UiLabel {
  label: string;
  description: string;
}

export interface UiListComponent<T> {
  listLayoutStyle: string;
  renderComponent: <Props extends UiProps<T>>(props: Props) => ReactElement;
}

export interface UiProps<T> {
  uiData: T;
}

export interface Comparable<T> {
  compare: CompareFn<T>;
}

export interface CreateFilter<T> {
  createFilter: (input: InputType) => PredicateFn<T>; // closure를 이용한 동적 필터 생성
}

export type RadixUiIconElement = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export enum Direction {
  DESC,
  ASC,
}