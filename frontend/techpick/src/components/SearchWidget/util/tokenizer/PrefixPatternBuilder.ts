import type { Prefix, TokenPrefixPattern } from './PrefixTokenizer.type';

type MatchPair<KeyType> = { prefix: Prefix; key: KeyType };

type Build = {
  build: () => TokenPrefixPattern<string>;
};

export class PrefixPatternBuilder<KeyType extends string> {
  private static EMPTY_PREFIX = '';
  private pattern: Record<KeyType, Prefix> = {} as Record<KeyType, Prefix>;

  public match({
    prefix,
    key,
  }: MatchPair<KeyType>): PrefixPatternBuilder<KeyType> {
    this.pattern[key] = prefix;
    return this;
  }

  public ifNoneMatch(tokenKey: KeyType): Build {
    this.pattern[tokenKey] = PrefixPatternBuilder.EMPTY_PREFIX;
    return {
      build: () => this.pattern,
    };
  }
}
