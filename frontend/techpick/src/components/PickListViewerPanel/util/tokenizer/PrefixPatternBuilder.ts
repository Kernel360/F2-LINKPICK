import type {
  Prefix,
  TokenKey,
  TokenPrefixPattern,
} from './PrefixTokenizer.type';

type MatchPair = { prefix: Prefix; key: TokenKey };

type Build = { build: () => TokenPrefixPattern };

export class PrefixPatternBuilder {
  private static EMPTY_PREFIX = '';
  private pattern: TokenPrefixPattern = {};

  public match({ prefix, key }: MatchPair): PrefixPatternBuilder {
    this.pattern[`${key}`] = prefix;
    return this;
  }

  public ifNoneMatch(tokenKey: string): Build {
    this.pattern[`${tokenKey}`] = PrefixPatternBuilder.EMPTY_PREFIX;
    return {
      build: () => this.pattern,
    };
  }
}
