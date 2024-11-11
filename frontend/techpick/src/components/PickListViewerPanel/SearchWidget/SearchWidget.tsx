import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Command } from 'cmdk';
import { FolderOpen, Tag } from 'lucide-react';
import WrappedTokenInput, {
  KEY_DOWN_HANDLER_CONFIG_OPTION,
  TokenInputRef,
} from 'react-customize-token-input';
import { SelectedTagItem } from '@/components';
import { listItemStyle } from '@/components/PickListViewerPanel/SearchWidget/SearchWidget.css';
import { Token } from '@/components/PickListViewerPanel/util/tokenizer/PrefixTokenizer.type';
import { useTreeStore } from '@/stores/dndTreeStore/dndTreeStore';
import { useTagStore } from '@/stores/tagStore';
import { getStringTokenizer } from '../util';
import { PrefixPatternBuilder } from '../util/tokenizer/PrefixPatternBuilder';
import { FolderType, TagType } from '@/types';

import './tokenInput.css';

type SearchKey = 'TAG' | 'FOLDER' | 'NONE';

const pattern = new PrefixPatternBuilder<SearchKey>()
  .match({ prefix: 'folder:', key: 'FOLDER' })
  .match({ prefix: '#', key: 'TAG' })
  .ifNoneMatch('NONE')
  .build();

interface TokenLabelProps {
  token: Token<SearchKey>;
  icon?: React.ReactNode;
}

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
      {props.icon}
      {`${props.token.text}`}
    </div>
  );
}

export function SearchWidget() {
  // tokenizer
  const [input, setInput] = useState('');
  const inputRef = useRef<TokenInputRef>(null);
  const inputTokenizer = useMemo(
    () => getStringTokenizer<SearchKey>(pattern),
    []
  );
  // inputs refs
  const [tokens, setTokens] = useState<Token<SearchKey>[]>([]);
  const [tokenInputContext, setTokenInputContext] =
    useState<Token<SearchKey> | null>(null);
  // user data to use in recommendation
  const { tagList, fetchingTagList } = useTagStore();
  const { getFolderList, getFolders } = useTreeStore();

  useEffect(
    function loadTagAndFolderList() {
      fetchingTagList(); // fetch tag list
      getFolders(); // fetch folder list
    },
    [fetchingTagList, getFolders]
  );

  useEffect(
    function setAutocompleteModeByInput() {
      if (!input) {
        resetInputContext();
        return;
      }
      const currentToken = inputTokenizer.tokenize(input).getLastToken();
      currentToken && setTokenInputContext(currentToken);
    },
    [input, inputTokenizer]
  );

  useEffect(
    function onTokenListChange() {
      if (tokens.length <= 0) return;
      console.log(tokens);
      // TODO: convert token lists to global search state
    },
    [tokens]
  );

  const buildTokenIfNotAutocomplete = (input: string): Token<SearchKey> => {
    return {
      key: 'NONE',
      text: input,
      id: -1,
    };
  };

  const editTokenList = (newTokenValues: Token<SearchKey>[]) => {
    setTokens(newTokenValues);
    resetInputContext();
  };

  const renderTokenLabel = (token: Token<SearchKey>) => {
    switch (token.key) {
      case 'FOLDER':
        return <TokenLabel token={token} icon={<FolderOpen size={'14px'} />} />;
      case 'TAG':
        return <TokenLabel token={token} icon={<Tag size={'14px'} />} />;
      case 'NONE':
      default:
        return <>{`${token.text}`}</>;
    }
  };

  const onAutocompleteSelect = (item: TagType | FolderType) => () => {
    if (!tokenInputContext) return;
    setTokens((prev) => [
      ...prev,
      { key: tokenInputContext.key, text: item.name, id: item.id },
    ]);
    resetInputContext();
  };

  const resetInputContext = () => {
    setInput('');
    setTokenInputContext(null);
    inputRef.current?.setCreatorValue('');
    inputRef.current?.focus();
  };

  const setKeyEvent = (key?: SearchKey) => {
    return key && key !== 'NONE'
      ? { onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF }
      : { onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.ON };
  };

  return (
    <Command
      style={{ width: '70%' }} // TODO: change to css.ts + 화면 크기에 따라 맞추기
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      label={'Search'}
    >
      <Command.Input // just for auto-completion
        style={{ display: 'none' }}
        value={tokenInputContext?.text}
      />
      <WrappedTokenInput
        ref={inputRef}
        tokenValues={tokens}
        specialKeyDown={setKeyEvent(tokenInputContext?.key)}
        onTokenValuesChange={editTokenList}
        onBuildTokenValue={buildTokenIfNotAutocomplete}
        onGetTokenDisplayLabel={renderTokenLabel}
        onInputValueChange={setInput}
      />
      <Command.List>
        {tokenInputContext?.key === 'TAG' &&
          tagList.map((tag) => (
            <Command.Item
              key={tag.id}
              className={listItemStyle}
              value={tag.name}
              onSelect={onAutocompleteSelect(tag)}
              keywords={[tag.name]}
            >
              <SelectedTagItem tag={tag} />
            </Command.Item>
          ))}
        {tokenInputContext?.key === 'FOLDER' &&
          getFolderList().map((folder) => (
            <Command.Item
              key={folder.id}
              className={listItemStyle}
              value={folder.name}
              onSelect={onAutocompleteSelect(folder)}
              keywords={[folder.name]}
            >
              {folder.name /* TODO: 폴더 아이템 컴포넌트로 수정 할 것 */}
            </Command.Item>
          ))}
      </Command.List>
    </Command>
  );
}
