import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'es-toolkit';
import { useSearchPickStore } from '@/stores/searchPickStore';
import * as styles from './searchDialog.css';

export default function SearchInput() {
  const { setSearchQuery } = useSearchPickStore();
  const [searchQueryInput, setSearchQueryInput] = useState<string>('');

  const setDebounceSearchQuery = useCallback(
    debounce((query: string) => {
      const parseQuery = query.replace(/ /g, ',');
      setSearchQuery(parseQuery);
    }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryInput(e.target.value);
    setDebounceSearchQuery(e.target.value);
  };

  useEffect(() => {
    return () => {
      setDebounceSearchQuery.cancel();
    };
  }, [setDebounceSearchQuery]);

  return (
    <input
      type="text"
      value={searchQueryInput}
      onChange={handleSearch}
      placeholder="검색어를 입력하세요"
      className={styles.searchInput}
    />
  );
}
