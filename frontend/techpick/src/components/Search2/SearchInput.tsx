import { useFetchSearchPickList } from '@/queries/useFetchSearchPickList';
import { useSearchPickStore } from '@/stores/searchPickStore';
import { debounce } from 'es-toolkit';
import { Loader, SearchIcon } from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  iconButtonContainerStyle,
  searchBarStyle,
  searchInputStyle,
} from './searchInput.css';

export default function SearchInput() {
  const { searchQuery, searchTag, searchFolder, setSearchQuery } =
    useSearchPickStore();
  const { isLoading } = useFetchSearchPickList({
    searchTokenList: searchQuery,
    folderIdList: searchFolder,
    tagIdList: searchTag,
  });
  const [searchQueryInput, setSearchQueryInput] = useState<string>('');

  const setDebounceSearchQuery = useCallback(
    debounce((query: string) => {
      const parseQuery = query.replace(/ /g, ',');
      setSearchQuery(parseQuery);
    }, 300),
    [],
  );

  /**
   * @description 검색어 입력 시 검색어를 업데이트하고, 검색어를 디바운싱하여 검색 쿼리를 업데이트합니다.
   * 인풋이 변경될 때 자동으로 호출됩니다.
   */
  const handleSearchDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryInput(e.target.value);
    setDebounceSearchQuery(e.target.value);
  };

  /**
   * @description 검색어를 즉시 검색 쿼리로 업데이트합니다.
   * 키보드이벤트, 마우스이벤트로 호출됩니다.
   */
  const handleSearch = () => {
    setSearchQuery(searchQueryInput);
  };

  useEffect(() => {
    return () => {
      setDebounceSearchQuery.cancel();
    };
  }, [setDebounceSearchQuery]);

  return (
    <div className={searchBarStyle}>
      <div className={iconButtonContainerStyle}>
        {isLoading ? (
          <Loader size={20} />
        ) : (
          <SearchIcon size={20} onClick={handleSearch} />
        )}
      </div>
      <input
        type="text"
        value={searchQueryInput}
        onChange={handleSearchDebounce}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="검색어를 입력하세요"
        className={searchInputStyle}
      />
    </div>
  );
}
