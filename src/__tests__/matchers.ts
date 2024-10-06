import { expect } from 'vitest';
import { MedievalDynastyCalculator } from '@/data/MedievalDynasty';

expect.extend({
  toHaveNoErrors(calc: MedievalDynastyCalculator) {
    const log: string[] = [];
    calc.fixErrors(log);
    return {
      pass: log.length === 0,
      message: () => `Expected no errors, but found:\n${log.join('\n')}`,
    };
  },
  toHaveExactlyTextContent(element: HTMLElement, text: string) {
    return {
      pass: element.textContent === text,
      message: () => `Expected text content to be exactly`,
      actual: element.textContent,
      expected: text,
    };
  },
});

export {};
