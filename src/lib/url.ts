// Prefix internal links with the site's base path (e.g. /helenanguyen/ on GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`;
