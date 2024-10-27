/**
 *
 */
type TokenKey = string;
type Token = string;
type Prefix = string;

type TokenPrefixPattern = Record<TokenKey, Prefix>;

interface PrefixTokenizerFactory {
  addPattern(pattern: TokenPrefixPattern): PrefixTokenizerFactory;
  removePattern(pattern: TokenPrefixPattern): PrefixTokenizerFactory;
  build(): PrefixTokenizer;
}

interface TokenizeResult {
  getTokens(key: TokenKey): Array<Token>;
}

interface PrefixTokenizer {
  tokenize(str: string): TokenizeResult;
}
