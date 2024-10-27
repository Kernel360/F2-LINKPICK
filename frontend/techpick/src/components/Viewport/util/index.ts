import { StreamImpl } from './stream/StreamImpl';
import { PrefixTokenizerFactoryImpl } from './tokenizer/PrefixTokenizerImpl';

/**
 *
 * @param pattern
 * @returns
 */
export function StringTokenizer(pattern: TokenPrefixPattern): PrefixTokenizer {
  return new PrefixTokenizerFactoryImpl().addPattern(pattern).build();
}

export function Stream<T>(source: T[]) {
  return new StreamImpl(source);
}
