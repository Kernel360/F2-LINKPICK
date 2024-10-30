import { cloneDeep } from 'es-toolkit/object';
import { BatchStream } from './BatchStream.type';
import { CompareFn, PredicateFn } from '../../types/common.type';

export class BatchStreamImpl<T> implements BatchStream<T> {
  private readonly source: T[]; // 원본 데이터 배열
  private buffer?: T[];
  private filterList: PredicateFn<T>[] = [];
  private sortList: CompareFn<T>[] = [];

  constructor(source: T[]) {
    this.source = source;
  }

  public filters(filters?: PredicateFn<T>[]): BatchStream<T> {
    if (!filters) return this;
    this.filterList = this.filterList.concat(filters);
    return this;
  }

  public sorts(sorts?: CompareFn<T>[]): BatchStream<T> {
    if (!sorts) return this;
    this.sortList = this.sortList.concat(sorts);
    return this;
  }

  public applyAll(): T[] {
    this.buffer = cloneDeep(this.source);
    for (const condition of this.filterList) {
      this.buffer = this.buffer.filter(condition);
    }
    for (const condition of this.sortList) {
      this.buffer = this.buffer.sort(condition);
    }
    this.filterList.length = 0; // clear filter
    this.sortList.length = 0; // clear sort
    return this.buffer;
  }
}
