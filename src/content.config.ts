import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    summary: z.string(),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    // Work-card tile: a colored background with a screen or a logo centered on it.
    tileBg: z.string().default('linear-gradient(135deg, #f0c27b 0%, #e8836b 100%)'),
    tileStyle: z.enum(['browser', 'logo']).default('browser'),
    tileImage: image().optional(),
    tileText: z.string().optional(),
    role: z.string(),
    year: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    // Set draft: true to hide a case study from the site without deleting it.
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
