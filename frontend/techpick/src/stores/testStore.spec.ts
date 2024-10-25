// store.test.ts
import { describe, expect, it } from '@jest/globals';
import useStore from './testStore';

describe('Zustand Store', () => {
  it('should initialize with default state', () => {
    const { count } = useStore.getState();
    expect(count).toBe(0);
  });

  it('should increment count', () => {
    const increment = useStore.getState().increment;
    increment();
    const { count } = useStore.getState();
    expect(count).toBe(1);
  });
});
