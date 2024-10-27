/**
 *
 */
export class PrefixTokenizerFactoryImpl implements PrefixTokenizerFactory {
  // TODO: 중복된 설정 값이 들어온다면 ?
  private readonly patterns: Map<TokenKey, Prefix> = new Map();

  addPattern(pattern: TokenPrefixPattern): PrefixTokenizerFactory {
    Object.entries(pattern).forEach((p) => {
      if (this.patterns.has(p[0])) {
        throw new Error('패턴 Key는 중복될 수 없습니다.');
      }
      this.patterns.set(p[0], p[1]);
    });
    return this;
  }
  removePattern(pattern: TokenPrefixPattern): PrefixTokenizerFactory {
    Object.entries(pattern).forEach((p) => this.patterns.delete(p[0]));
    return this;
  }
  build(): PrefixTokenizer {
    return new PrefixTokenizerImpl(this.patterns);
  }
}

class PrefixTokenizerImpl implements PrefixTokenizer {
  private readonly keys: TokenKey[];
  private readonly regex: RegExp;

  constructor(patterns: Map<TokenKey, Prefix>) {
    this.keys = Array.from(patterns.keys());
    this.regex = PrefixTokenizerImpl.createRegex(patterns);
  }

  tokenize(str: string): TokenizeResult {
    const matches = str.matchAll(this.regex);
    const arr = Array.from(matches);
    const groups = arr.map((d) => d.groups);

    const map = new Map<TokenKey, Array<Token>>();
    this.keys.forEach((key) => map.set(key, []));

    groups.forEach((group) => {
      if (!group) return;
      this.keys.forEach((key) => {
        group[key] != undefined && map.get(key)?.push(group[key]);
      });
    });
    return new TokenizeResultImpl(map);
  }

  /**
   * - BaseGroup     : _prefix_(?<_key_>\S+)
   * - Full Pattern  : BaseGroup | BaseGroup | ...
   * @see {@link <a href="./example.png"> Example </a>}
   */
  private static createRegex(patterns: Map<TokenKey, Prefix>): RegExp {
    return new RegExp(
      Array.from(patterns)
        .map(([tokenKey, prefix]) => this.createCaptureGroup(tokenKey, prefix))
        .join('|'),
      'g'
    );
  }

  private static createCaptureGroup(
    tokenKey: keyof TokenPrefixPattern,
    prefix: string
  ): string {
    return `${prefix}(?<${tokenKey}>\\S+)`;
  }
}

class TokenizeResultImpl implements TokenizeResult {
  private readonly resultMap: Map<TokenKey, Array<Token>>;
  constructor(map: Map<TokenKey, Array<Token>>) {
    this.resultMap = map;
  }

  public getTokens(key: TokenKey): Array<Token> {
    if (this.resultMap.has(key)) {
      return this.resultMap.get(key) as Array<Token>;
    }
    return [];
  }
}
