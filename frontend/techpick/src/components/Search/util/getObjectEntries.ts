/**
 * @description
 *  Object.entries의 key-value 타입을 복원하기 위한 getObjectEntries() 메서드
 */
export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];

const getObjectEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

export default getObjectEntries;
