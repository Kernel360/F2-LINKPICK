export type TokenKey = string;
export type Token = string;
export type Prefix = string;

export type TokenPrefixPattern = Record<TokenKey, Prefix>;

export interface TokenizerFactory {
  addPattern(pattern: TokenPrefixPattern): TokenizerFactory;
  removePattern(pattern: TokenPrefixPattern): TokenizerFactory;
  build(): Tokenizer;
}

export interface Tokenizer {
  tokenize(str: string): TokenizeResult;
}

export interface TokenizeResult {
  getTokens(key: TokenKey): Array<Token>;
}
