import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Command } from 'cmdk';
import { SelectedTagItem } from '@/components';
import { listItemStyle } from '@/components/PickListViewerPanel/SearchWidget/SearchWidget.css';
import { getEntries } from '@/components/PickListViewerPanel/types/common.type';
import {
  TokenInfo,
  TokenPrefixPattern,
} from '@/components/PickListViewerPanel/util/tokenizer/PrefixTokenizer.type';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { useTagStore } from '@/stores/tagStore';
import { getStringTokenizer } from '../util';
import { PrefixPatternBuilder } from '../util/tokenizer/PrefixPatternBuilder';
import { FolderType, TagType } from '@/types';

type SearchKey = 'TAG' | 'FOLDER' | 'NONE';

const pattern = new PrefixPatternBuilder<SearchKey>()
  .match({ prefix: 'folder:', key: 'FOLDER' })
  .match({ prefix: '#', key: 'TAG' })
  .ifNoneMatch('NONE')
  .build();

const findPrefixByKey = (
  targetKey: SearchKey,
  pattern: TokenPrefixPattern<SearchKey>
) => {
  const target = getEntries(pattern).find(([key, _]) => key === targetKey);
  return target![1]; // target cannot be null
};

const initialAutocompleteContext: TokenInfo<SearchKey> = {
  key: 'NONE',
  token: '',
};

export function SearchWidget() {
  // tokenizer
  const inputTokenizer = useMemo(
    () => getStringTokenizer<SearchKey>(pattern),
    []
  );
  // basic inputs
  const inputRef = useRef<HTMLInputElement>(null);
  // last input Token
  const [autocompleteContext, setAutocompleteContext] = useState<
    TokenInfo<SearchKey>
  >(initialAutocompleteContext);
  // full input value
  const [searchInput, setSearchInput] = useState('');
  // user data to use in recommendation
  const { tagList, fetchingTagList } = useTagStore();
  // user data to use in recommendation
  const { getFolderList, getFolders } = useTreeStore();

  useEffect(function loadTagAndFolderList() {
    fetchingTagList(); // fetch tag list
    getFolders(); // fetch folder list
  }, []);

  useEffect(
    function parseLastTokenOfSearchInput() {
      const wordList = searchInput.split(' ');
      const lastTokenInfo = inputTokenizer
        .tokenize(wordList[wordList.length - 1])
        .getLastTokenInfo();
      setAutocompleteContext(lastTokenInfo ?? initialAutocompleteContext);
    },
    [searchInput]
  );

  const doInputAutoComplete = (item: TagType | FolderType) => () => {
    const prefix = findPrefixByKey(autocompleteContext.key, pattern);
    setSearchInput((prev) => {
      const wordList = prev.split(' ');
      wordList.pop();
      wordList.push(`${prefix}${item.name}`);
      return wordList.join(' ');
    });
    // close autocomplete context
    setAutocompleteContext({ key: 'NONE', token: '' });
    inputRef.current?.focus();
  };

  return (
    <Command
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      label={'Search'}
    >
      <input // NOTE: 화면에 렌더링되는 Input
        ref={inputRef}
        // className={inputStyle}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Command.Input // NOTE: 자동 완성 기능을 위한 Input 이며, 화면에 렌더링 되지 않음
        style={{ display: 'none' }}
        value={autocompleteContext.token}
      />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        {autocompleteContext.key === 'TAG' &&
          tagList.map((tag) => (
            <Command.Item
              key={tag.id}
              className={listItemStyle}
              value={tag.name}
              onSelect={doInputAutoComplete(tag)}
              keywords={[tag.name]}
            >
              <SelectedTagItem tag={tag} />
            </Command.Item>
          ))}
        {autocompleteContext.key === 'FOLDER' &&
          getFolderList().map((folder) => (
            <Command.Item
              key={folder.id}
              className={listItemStyle}
              value={folder.name}
              onSelect={doInputAutoComplete(folder)}
              keywords={[folder.name]}
            >
              {folder.name /* TODO: 폴더 아이템 컴포넌트로 수정 할 것 */}
              {/*<FolderItem folder={folder} />*/}
            </Command.Item>
          ))}
      </Command.List>
    </Command>
  );
}
