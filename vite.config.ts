import { defineConfig } from 'vitest/config';

// The site is served from the root of https://russeldiaz.github.io/.
// Set BASE_PATH (e.g. "/some-repo/") only if it is ever hosted under a subpath.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  test: {
    environment: 'jsdom',
  },
});
