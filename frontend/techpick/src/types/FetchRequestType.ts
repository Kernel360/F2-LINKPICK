/**
 * @description zustand에서 api 호출 시에 확인할 수 있는 타입입니다.
 */
export interface FetchRequestType<T> {
  isLoading: boolean;
  data: T | null;
  isError: boolean;
  error: string | null;
}
