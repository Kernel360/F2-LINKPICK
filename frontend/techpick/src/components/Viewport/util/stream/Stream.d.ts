/**
 *
 */
type PredicateFn<T> = (src: T) => boolean;

type CompareFn<T> = (lh: T, rh: T) => number;

interface Filterable<T> {
  filter(filters?: PredicateFn<T>[]): Stream<T>;
}

interface Sortable<T> {
  sort(sorts?: CompareFn<T>[]): Stream<T>;
}

interface Stream<T> extends Filterable<T>, Sortable<T> {
  toList(): T[];
}
