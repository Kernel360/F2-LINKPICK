import { BatchStream } from './stream/BatchStream.type';
import { BatchStreamImpl } from './stream/BatchStreamImpl';
import { PrefixTokenizerFactory } from './tokenizer/PrefixTokenizerImpl';
import type {
  Tokenizer,
  TokenPrefixPattern,
} from './tokenizer/PrefixTokenizer.type';

/**
 * @description
 *  Utility 구현체를 반환하는 메서드입니다.
 *  함수로 한번 감싸줘서, 사용 코드에서 상세 구현을 숨기려고 했습니다.
 */
export function getStringTokenizer<KeyType extends string>(
  pattern: TokenPrefixPattern<KeyType>
): Tokenizer<KeyType> {
  return new PrefixTokenizerFactory<KeyType>().addPattern(pattern).build();
}

export function getStream<T>(source: T[]): BatchStream<T> {
  return new BatchStreamImpl(source);
}
