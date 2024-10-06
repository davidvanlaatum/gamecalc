import 'vitest';
import { MedievalDynastyCalculator } from '@/data/MedievalDynasty';

interface CustomMatchers<R = MedievalDynastyCalculator> {
  toHaveNoErrors: () => R;
}

interface HTMLElementMatchers<R = HTMLElement> {
  toHaveExactlyTextContent: (text: string) => R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T>, HTMLElementMatchers<T> {}

  interface AsymmetricMatchersContaining extends CustomMatchers, HTMLElementMatchers<T> {}
}
