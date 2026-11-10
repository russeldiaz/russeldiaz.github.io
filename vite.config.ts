import { defineConfig } from 'vitest/config';

// GitHub Pages serves the site from /<repo-name>/. Override with BASE_PATH
// (e.g. "/" for a custom domain or a <user>.github.io repo).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/art-portfolio/',
  test: {
    environment: 'jsdom',
  },
});
