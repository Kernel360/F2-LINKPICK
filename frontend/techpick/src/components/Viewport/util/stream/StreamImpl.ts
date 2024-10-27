import { cloneDeep } from 'lodash';

/**
 * @author 김민규
 * @description 주어진 데이터 배열을 1회성 Stream으로 연산합니다.
 */
export class StreamImpl<T> implements Stream<T> {
  private buffer: T[]; // 원본 데이터 배열
  private filterList: PredicateFn<T>[] = []; // 필터링 조건들
  private sortList: CompareFn<T>[] = []; // 정렬 조건들

  constructor(source: T[]) {
    this.buffer = cloneDeep(source);
  }

  public filter(filters?: PredicateFn<T>[]): Stream<T> {
    this.addFilter(filters);
    for (const condition of this.filterList) {
      this.buffer = this.buffer.filter(condition);
    }
    return this;
  }

  public sort(sorts?: CompareFn<T>[]): Stream<T> {
    this.addSort(sorts);
    for (const condition of this.sortList) {
      this.buffer = this.buffer.sort(condition);
    }
    return this;
  }

  public toList(): T[] {
    return this.buffer;
  }

  // helper methods ----------------------------------

  private addFilter(filters?: PredicateFn<T>[]): void {
    filters && this.filterList.concat(filters);
  }

  private addSort(sorts?: CompareFn<T>[]): void {
    sorts && this.sortList.concat(sorts);
  }
}
