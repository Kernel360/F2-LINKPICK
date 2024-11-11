import { v4 as uuidv4 } from 'uuid';
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
    const groups = Array.from(matches).map((d) => d.groups);
    const resultArray = new Array<Token<KeyType>>();

    groups.forEach((group, idx) => {
      if (!group) return;
      const tokenKey = this.keys.find((key) => group[key] !== undefined);
      if (!tokenKey || groups.length <= idx) {
        // 정규 표현식 구현상 마지막 그룹 매치는 '' 빈 문자열이다. 이를 무시해야 한다.
        return;
      }
      const token = { key: tokenKey, text: group[tokenKey], id: uuidv4() };
      resultArray.push(token);
    });
    return new PrefixTokenizeResult(resultArray);
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
  private readonly resultArray: Array<Token<KeyType>>;

  constructor(array: Array<Token<KeyType>>) {
    this.resultArray = array;
  }

  public getTokensByKey(key: KeyType): Array<Token<KeyType>> {
    return this.resultArray.filter((token) => token.key === key);
  }

  getLastToken(): Token<KeyType> | undefined {
    return this.resultArray.at(this.resultArray.length - 2);
  }
}
