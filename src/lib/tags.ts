import type { CollectionEntry } from 'astro:content';

export const skills = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Python',
  'Bash',
  'Git',
  'GitHub Actions',
  'Docker',
  'PostgreSQL',
  'Redis',
  'GraphQL',
  'REST APIs',
  'Linux',
  'React',
  'Tailwind',
  'Django',
  'Vite',
  'SQLite',
];

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export interface TagInfo {
  slug: string;
  name: string;
  count: number;
}

export function getAllTags(posts: CollectionEntry<'blog'>[]): TagInfo[] {
  const bySlug = new Map<string, TagInfo>();

  for (const skill of skills) {
    const slug = slugifyTag(skill);
    if (slug) bySlug.set(slug, { slug, name: skill, count: 0 });
  }

  for (const post of posts) {
    if (post.data.draft) continue;
    const seen = new Set<string>();
    for (const tag of post.data.tags) {
      const slug = slugifyTag(tag);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      const existing = bySlug.get(slug);
      if (existing) existing.count += 1;
      else bySlug.set(slug, { slug, name: tag, count: 1 });
    }
  }

  return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
}
