export interface SearchParamState {
  searchParamList: string[]; // search query
}

export interface SearchParamAction {
  setSearchParamList: (param: string[]) => void;
}

export interface SearchParamReader {
  readSearchParamList: () => readonly string[];
}

export interface SearchParamWriter {
  writeSearchParamList: (param: string[]) => void;
}
