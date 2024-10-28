import { cloneDeep } from 'es-toolkit/object';
import type { CompareFn, PredicateFn, Stream } from './Stream.type';

/**
 * @author 김민규
 * @description 주어진 데이터 배열을 1회성 Stream으로 연산합니다.
 */
export class StreamImpl<T> implements Stream<T> {
  private buffer: T[]; // 원본 데이터 배열

  constructor(source: T[]) {
    this.buffer = cloneDeep(source);
  }

  public filter(filters?: PredicateFn<T>[]): Stream<T> {
    if (!filters) return this;
    for (const condition of filters) {
      this.buffer = this.buffer.filter(condition);
    }
    return this;
  }

  public sort(sorts?: CompareFn<T>[]): Stream<T> {
    if (!sorts) return this;
    for (const condition of sorts) {
      this.buffer = this.buffer.sort(condition);
    }
    return this;
  }

  public toList(): T[] {
    return this.buffer;
  }
}
