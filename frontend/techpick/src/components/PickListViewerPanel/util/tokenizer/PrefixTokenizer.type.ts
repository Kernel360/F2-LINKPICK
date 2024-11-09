export type Token = string;
export type Prefix = string;

export type TokenPrefixPattern<KeyType extends string> = Record<
  KeyType,
  Prefix
>;

export interface TokenizerFactory<KeyType extends string> {
  addPattern(pattern: TokenPrefixPattern<KeyType>): TokenizerFactory<KeyType>;
  removePattern(
    pattern: TokenPrefixPattern<KeyType>
  ): TokenizerFactory<KeyType>;
  build(): Tokenizer<KeyType>;
}

export interface Tokenizer<KeyType extends string> {
  tokenize(str: string): TokenizeResult<KeyType>;
}

export type TokenInfo<KeyType> = { key: KeyType; token: Token };

export interface TokenizeResult<KeyType extends string> {
  getTokensByKey(key: KeyType): Array<Token>;
  getLastTokenInfo(): TokenInfo<KeyType> | undefined;
}
