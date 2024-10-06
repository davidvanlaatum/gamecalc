import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import failOnConsole from 'vitest-fail-on-console';
import 'vite-plugin-commonjs';

failOnConsole();

afterEach(() => {
  cleanup();
});
