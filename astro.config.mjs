// @ts-check
import { defineConfig } from 'astro/config';
import rehypeCaseStudy from './src/lib/rehype-case-study.mjs';

// Served at the custom domain https://helenanguyen.me (see public/CNAME).
// The old https://helenanguyen-dev.github.io/helenanguyen/ address redirects here.
export default defineConfig({
  site: 'https://helenanguyen.me',
  base: '/',
  markdown: {
    rehypePlugins: [rehypeCaseStudy],
  },
});
