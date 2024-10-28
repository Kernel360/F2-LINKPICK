export type PredicateFn<T> = (src: T) => boolean;

export type CompareFn<T> = (lh: T, rh: T) => number;

export interface Filterable<T> {
  filter(filters?: PredicateFn<T>[]): Stream<T>;
}

export interface Sortable<T> {
  sort(sorts?: CompareFn<T>[]): Stream<T>;
}

export interface Stream<T> extends Filterable<T>, Sortable<T> {
  toList(): T[];
}
