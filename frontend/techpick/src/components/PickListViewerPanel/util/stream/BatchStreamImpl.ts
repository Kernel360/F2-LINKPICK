import { cloneDeep } from 'es-toolkit/object';
import { BatchStream } from './BatchStream.type';
import { PredicateFn } from '../../types/common.type';

export class BatchStreamImpl<T> implements BatchStream<T> {
  private readonly source: T[]; // 원본 데이터 배열
  private buffer?: T[];
  private filterList: PredicateFn<T>[] = [];

  constructor(source: T[]) {
    this.source = source;
  }

  public filters(filters?: PredicateFn<T>[]): BatchStream<T> {
    if (!filters) return this;
    this.filterList = this.filterList.concat(filters);
    return this;
  }

  public applyAll(): T[] {
    this.buffer = cloneDeep(this.source);
    for (const condition of this.filterList) {
      this.buffer = this.buffer.filter(condition);
    }
    this.filterList.length = 0; // clear filter
    return this.buffer;
  }
}
