export type Token<KeyType extends string> = {
  key: KeyType; // key of token (classified by prefix)
  text: string; // content of token
  id: string | number; // unique id of token
};
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

export interface TokenizeResult<KeyType extends string> {
  getTokensByKey(key: KeyType): Array<Token<KeyType>>;
  getLastToken(): Token<KeyType> | undefined;
}
