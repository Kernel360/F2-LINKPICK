import type {
  Prefix,
  TokenizerFactory,
  Token,
  TokenizeResult,
  TokenKey,
  TokenPrefixPattern,
  Tokenizer,
} from './PrefixTokenizer.type';

/**
 * @author 김민규
 * @description Prefix 기준으로 문자열을 Split하는 토크나이저 구현체입니다.
 */
export class PrefixTokenizerFactoryImpl implements TokenizerFactory {
  // TODO: 중복된 설정 값이 들어온다면 ?
  private readonly patterns: Map<TokenKey, Prefix> = new Map();

  addPattern(pattern: TokenPrefixPattern): TokenizerFactory {
    for (const [key, value] of Object.entries(pattern)) {
      if (this.patterns.has(key)) {
        throw new Error('패턴 Key는 중복될 수 없습니다.');
      }
      this.patterns.set(key, value);
    }
    return this;
  }
  removePattern(pattern: TokenPrefixPattern): TokenizerFactory {
    Object.entries(pattern).forEach(([key, _]) => this.patterns.delete(key));
    return this;
  }
  build(): Tokenizer {
    return new PrefixTokenizerImpl(this.patterns);
  }
}

class PrefixTokenizerImpl implements Tokenizer {
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
    return new PrefixTokenizeResultImpl(map);
  }

  /**
   * @description 주어진 패턴에 맞춰 정규표현식을 생성합니다.
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

class PrefixTokenizeResultImpl implements TokenizeResult {
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
