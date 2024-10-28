import { StreamImpl } from './stream/StreamImpl';
import { PrefixTokenizerFactoryImpl } from './tokenizer/PrefixTokenizerImpl';
import type {
  Tokenizer,
  TokenPrefixPattern,
} from './tokenizer/PrefixTokenizer.type';

/**
 *
 * @param pattern
 * @returns
 */
export function StringTokenizer(pattern: TokenPrefixPattern): Tokenizer {
  return new PrefixTokenizerFactoryImpl().addPattern(pattern).build();
}

export function Stream<T>(source: T[]) {
  return new StreamImpl(source);
}
