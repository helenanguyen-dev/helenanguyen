// @ts-check
import { defineConfig } from 'astro/config';
import rehypeCaseStudy from './src/lib/rehype-case-study.mjs';

// Project site: served at https://helenanguyen-dev.github.io/helenanguyen/
// If the repo moves to helenanguyen-dev.github.io (or a custom domain), set base to '/'.
export default defineConfig({
  site: 'https://helenanguyen-dev.github.io',
  base: '/helenanguyen/',
  markdown: {
    rehypePlugins: [rehypeCaseStudy],
  },
});
