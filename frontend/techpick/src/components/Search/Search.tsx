'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { FolderOpen, SearchIcon, Tag } from 'lucide-react';
import WrappedTokenInput, {
  JS__TOKEN__DELETE_BUTTON__CLASS_NAME,
  KEY_DOWN_HANDLER_CONFIG_OPTION,
  TokenInputRef,
} from 'react-customize-token-input';
import { SpecialKeyDownConfig } from 'react-customize-token-input/lib/types/specialKeyDown';
import { SelectedTagItem } from '@/components';
import {
  autoCompleteLayoutStyle,
  inputIconStyle,
  inputLayoutStyle,
  listItemStyle,
  searchWidgetLayoutStyle,
  searchWidgetWidth,
} from '@/components/Search/Search.css';
import { getStringTokenizer } from '@/components/Search/util';
import createQueryParameter from '@/components/Search/util/createQueryParameter';
import { PrefixPatternBuilder } from '@/components/Search/util/tokenizer/PrefixPatternBuilder';
import { Token } from '@/components/Search/util/tokenizer/PrefixTokenizer.type';
import { SelectedFolderItem } from '@/components/SelectedFolderItem';
import { ROUTES } from '@/constants';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { useTagStore } from '@/stores/tagStore';
import { FolderType, TagType } from '@/types';
import './SearchInput.css';

type SearchKey = 'TAG' | 'FOLDER' | 'NONE';

const pattern = new PrefixPatternBuilder<SearchKey>()
  .match({ prefix: '@', key: 'FOLDER' })
  .match({ prefix: '#', key: 'TAG' })
  .ifNoneMatch('NONE')
  .build();

interface TokenLabelProps {
  token: Token<SearchKey>;
  icon?: React.ReactNode;
}

// TODO: inline style은 css로 빼기
export function TokenLabel(props: TokenLabelProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      <span
        className={`${JS__TOKEN__DELETE_BUTTON__CLASS_NAME}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          color: '#888',
          marginRight: '4px',
        }}
      >
        {props.icon}
      </span>
      {`${props.token.text}`}
    </div>
  );
}

export function Search() {
  // next.js client component hook
  const pathname = usePathname();
  const router = useRouter();
  // fetched user data for auto-completion
  const { tagList, fetchingTagList } = useTagStore();
  const { getFolderList } = useTreeStore();
  // tokenizer + text input
  const [input, setInput] = useState('');
  const inputRef = useRef<TokenInputRef>(null);
  const inputTokenizer = useMemo(
    () => getStringTokenizer<SearchKey>(pattern),
    []
  );
  // token list + current token context
  const [tokens, setTokens] = useState<Token<SearchKey>[]>([]);
  const [tokenInputContext, setTokenInputContext] =
    useState<Token<SearchKey> | null>(null);

  /**
   * @description
   * 자동 완성을 통해 토큰 리스트를 추가하거나
   * X 버튼을 눌러 토큰 리스트를 삭제했을 경우,
   * 검색 api를 호출하기 위한 작업을 수행.
   */
  useEffect(
    function fixSearchQueryOnTokenListChange() {
      if (tokens.length < 1) return;
      doSearchWithTokensAndInput();
    },
    [tokens]
  );

  useEffect(
    function loadTagAndFolderList() {
      fetchingTagList();
      syncSearchInputStateWithUrl();
    },
    [pathname, fetchingTagList]
  );

  useEffect(
    function setAutocompleteModeByInput() {
      if (!input) {
        resetInputAndAutocompleteContext();
        return;
      }
      const lastWordToken = inputTokenizer.tokenize(input).getLastToken();
      if (lastWordToken) {
        setTokenInputContext(lastWordToken);
      }
    },
    [input, inputTokenizer]
  );

  /**
   * @description
   * URL (path name)과 검색 창의 ui 상태를 동기화
   */
  const syncSearchInputStateWithUrl = () => {
    // 왼쪽 폴더 클릭 시 검색 창을 초기화
    if (pathname !== ROUTES.SEARCH) {
      resetInputAndAutocompleteContext();
      setTokens([]);
      return;
    }
    // path-name과 query Param을 이용해서 state을 원복
    // TODO: 이 부분은 url 조작을 검증하는 과정이 추가되어야 한다.
    //       (ex. folderIdList에 id 값이 적절한지 체크) --> 잘못된 경우 idList에서 제거?
  };

  /**
   * @description
   * route to [search] page when search action is executed
   */
  const doSearchWithTokensAndInput = () => {
    router.push(`${ROUTES.SEARCH}?${exportSearchQuery()}`);
  };

  // TODO: 해당 함수는 외부로 빼기 (리팩토링)
  const exportSearchQuery = () => {
    return createQueryParameter(
      {
        key: 'folderIdList',
        values: tokens
          .filter((token) => token.key == 'FOLDER')
          .map((token) => token.id),
      },
      {
        key: 'tagIdList',
        values: tokens
          .filter((token) => token.key == 'TAG')
          .map((token) => token.id),
      },
      {
        key: 'searchTokenList',
        values: input.trim().split(' ').filter(Boolean), // remove empty string
      }
    );
  };

  const editTokenList = (newTokenValues: Token<SearchKey>[]) => {
    setTokens(newTokenValues);
  };

  const renderTokenLabel = (token: Token<SearchKey>) => {
    switch (token.key) {
      case 'FOLDER':
        return <TokenLabel token={token} icon={<FolderOpen size={'14px'} />} />;
      case 'TAG':
        return <TokenLabel token={token} icon={<Tag size={'14px'} />} />;
      case 'NONE':
      /* fall through */
      default:
        return;
    }
  };

  /**
   * @description
   * cmdk 아이템을 클릭해서 자동완성 이벤트가 발생했을 때 핸들러
   */
  const onAutocomplete = (item: TagType | FolderType) => () => {
    if (!tokenInputContext) return;
    setTokens((prev) => [
      ...prev,
      { key: tokenInputContext.key, text: item.name, id: item.id },
    ]);
    removeTokenFromInput(tokenInputContext);
  };

  /**
   * @description
   * 전체 input에서 특정 토큰에 해당하는 문자열만 제거
   * ex. 'hello hi #tag' --> '#tag' 제거 --> 'hello hi'
   */
  const removeTokenFromInput = (token: Token<SearchKey>) => {
    const newInput = input
      .replace(new RegExp(pattern[token.key] + token.text + '$'), '')
      .trim();
    setInput(newInput);
    inputRef.current?.setCreatorValue(newInput);
    inputRef.current?.focus();
  };

  /**
   * @description
   * 가장 마지막 Input을 초기화 하는 과정
   */
  const resetInputAndAutocompleteContext = () => {
    setInput('');
    setTokenInputContext(null);
    inputRef.current?.setCreatorValue('');
    inputRef.current?.focus();
  };

  /**
   * @description
   * react-token-input의 키 이벤트를 비활성화해야
   * 자동 토큰 생성 행위를 막을 수 있음.
   */
  const KeyEventConfig: SpecialKeyDownConfig = {
    onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
    onEscape: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
    onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
  };

  const isUnselectedItem = (item: TagType | FolderType) => {
    return !tokens.some((token) => token.id === item.id);
  };

  /**
   * @description
   * Command.Item의 value가 같으면 같은 Element로 취급되기 때문에,
   * { name + id } 조합으로 value를 유일하게 만들어야 한다.
   * 아래는 검색 시 id 값을 제거하도록 처리하는 과정.
   * (ex. "React 1", "React 2") --> "React" 이름으로 둘다 검색이 되야 함.
   */
  const distinguishCommandItemWithSameValue = (
    value: string,
    search: string
  ) => {
    const list = value.split(' ');
    list.pop();
    if (list.join('').includes(search)) return 1;
    return 0;
  };

  /**
   * @description
   * Enter 입력 시 검색 URL로 이동
   */
  const onCreatorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      doSearchWithTokensAndInput();
    }
  };

  return (
    <div className={searchWidgetLayoutStyle}>
      <div className={inputLayoutStyle}>
        <SearchIcon className={inputIconStyle} />
        <WrappedTokenInput
          ref={inputRef}
          disableCreateOnBlur
          tokenValues={tokens}
          onInputValueChange={setInput}
          specialKeyDown={KeyEventConfig}
          onGetIsTokenEditable={() => false}
          onCreatorKeyDown={onCreatorKeyDown}
          onTokenValuesChange={editTokenList}
          onGetTokenDisplayLabel={renderTokenLabel}
        />
      </div>
      <div className={autoCompleteLayoutStyle}>
        <Command
          label={'Search'}
          style={{ width: searchWidgetWidth }}
          filter={distinguishCommandItemWithSameValue}
        >
          <Command.Input // just for auto-completion, hidden from screen
            style={{ display: 'none' }}
            value={tokenInputContext?.text}
          />
          <Command.List>
            {tokenInputContext?.key === 'TAG' && (
              <>
                <Command.Empty>No tags found.</Command.Empty>
                {tagList.filter(isUnselectedItem).map((tag) => (
                  <Command.Item
                    key={tag.id}
                    className={listItemStyle}
                    value={tag.name + ' ' + tag.id}
                    onSelect={onAutocomplete(tag)}
                  >
                    <SelectedTagItem tag={tag} />
                  </Command.Item>
                ))}
              </>
            )}
            {tokenInputContext?.key === 'FOLDER' && (
              <>
                <Command.Empty>No folders found.</Command.Empty>
                {getFolderList()
                  .filter((folder) => folder.folderType !== 'ROOT')
                  .filter(isUnselectedItem)
                  .map((folder) => (
                    <Command.Item
                      key={folder.id}
                      className={listItemStyle}
                      value={folder.name + ' ' + folder.id}
                      onSelect={onAutocomplete(folder)}
                    >
                      <SelectedFolderItem folder={folder} />
                    </Command.Item>
                  ))}
              </>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
