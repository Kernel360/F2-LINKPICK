import { getEntries } from '@/components/PickListViewerPanel/types/common.type';
import type {
  Prefix,
  TokenizerFactory,
  Token,
  TokenizeResult,
  TokenPrefixPattern,
  Tokenizer,
} from './PrefixTokenizer.type';

/**
 * @description
 *  Prefix 기준으로 문자열을 Split하는 토크나이저 구현체입니다.
 */
export class PrefixTokenizerFactory<KeyType extends string>
  implements TokenizerFactory<KeyType>
{
  private readonly patterns: Map<KeyType, Prefix> = new Map();

  addPattern(pattern: TokenPrefixPattern<KeyType>): TokenizerFactory<KeyType> {
    for (const [key, value] of getEntries(pattern)) {
      if (this.patterns.has(key)) {
        throw new Error('패턴 Key는 중복될 수 없습니다.');
      }
      this.patterns.set(key, value);
    }
    return this;
  }
  removePattern(
    pattern: TokenPrefixPattern<KeyType>
  ): TokenizerFactory<KeyType> {
    getEntries(pattern).forEach(([key, _]) => this.patterns.delete(key));
    return this;
  }
  build(): Tokenizer<KeyType> {
    return new PrefixTokenizer(this.patterns);
  }
}

class PrefixTokenizer<KeyType extends string> implements Tokenizer<KeyType> {
  private readonly keys: KeyType[];
  private readonly regex: RegExp;

  constructor(patterns: Map<KeyType, Prefix>) {
    this.keys = Array.from(patterns.keys());
    this.regex = PrefixTokenizer.createRegex(patterns);
  }

  tokenize(str: string): TokenizeResult<KeyType> {
    const matches = str.matchAll(this.regex);
    const arr = Array.from(matches);
    const groups = arr.map((d) => d.groups);

    const map = new Map<KeyType, Array<Token>>();
    this.keys.forEach((key) => map.set(key, []));

    let lastTokenInfo: { key: KeyType; token: Token } | undefined;
    groups.forEach((group, idx) => {
      if (!group) return;
      const tokenKey = this.keys.find((key) => group[key] !== undefined);
      if (!tokenKey) return;
      map.get(tokenKey)?.push(group[tokenKey]);
      // 구현상 마지막 매치는 항상 '' 빈 문자열이다. 따라서 뒤에서 2번째 것을 마지막 토큰으로 처리
      if (idx === groups.length - 2) {
        lastTokenInfo = { key: tokenKey, token: group[tokenKey] };
      }
    });
    return new PrefixTokenizeResult(map, lastTokenInfo);
  }

  /**
   * @description 주어진 패턴에 맞춰 정규표현식을 생성합니다.
   * - BaseGroup     : _prefix_(?<_key_>\S+)
   * - Full Pattern  : BaseGroup | BaseGroup | ...
   * @see {@link <a href="./example.png"> Example </a>}
   */
  private static createRegex(patterns: Map<string, Prefix>): RegExp {
    return new RegExp(
      Array.from(patterns)
        .map(([tokenKey, prefix]) => this.createCaptureGroup(tokenKey, prefix))
        .join('|'),
      'g'
    );
  }

  private static createCaptureGroup(tokenKey: string, prefix: string): string {
    return `${prefix}(?<${tokenKey}>\\S*)`;
  }
}

class PrefixTokenizeResult<KeyType extends string>
  implements TokenizeResult<KeyType>
{
  private readonly resultMap: Map<KeyType, Array<Token>>;
  private readonly lastTokenInfo?: { key: KeyType; token: Token };

  constructor(
    map: Map<KeyType, Array<Token>>,
    lastTokenInfo?: { key: KeyType; token: Token }
  ) {
    this.resultMap = map;
    this.lastTokenInfo = lastTokenInfo;
  }

  public getTokensByKey(key: KeyType): Array<Token> {
    if (this.resultMap.has(key)) {
      return this.resultMap.get(key) as Array<Token>;
    }
    return [];
  }

  getLastTokenInfo(): { key: KeyType; token: Token } | undefined {
    return this.lastTokenInfo;
  }
}
