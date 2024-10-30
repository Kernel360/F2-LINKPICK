import type { CompareFn, PredicateFn } from '../../types/common.type';

/**
 * @description 주어진 데이터 배열을 1회성 Stream으로 한번에 연산합니다.
 *              (1) 원본 데이터 배열은 변경하지 않습니다.
 *              (2) toList()를 호출할 때마다 새로운 배열을 생성해서 반환합니다.
 * @example_use
 *  ```
 *  const stream = new BatchStreamImpl( original_array );
 *  const result = stream.filters( some_filters ).apply().toList();
 *  ```
 */
export interface BatchStream<T> {
  /** 필터 함수 설정 */
  filters: (filters?: PredicateFn<T>[]) => BatchStream<T>;

  /** 정렬 함수 설정 */
  sorts: (sorts?: CompareFn<T>[]) => BatchStream<T>;

  /** 필터와 정렬 함수들을 일괄 적용, 새로운 리스트로 반환 */
  applyAll: () => T[];
}
