import { getCollection } from 'astro:content';
import { postSlug } from '@/lib/posts';

export type SearchEntry = {
  title: string;
  description: string;
  tags: string[];
  body: string;
  url: string;
};

export async function GET(): Promise<Response> {
  const posts = await getCollection('blog');
  const entries: SearchEntry[] = posts
    .filter((post) => !post.data.draft)
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags,
      body: post.body ?? '',
      url: `/blog/${postSlug(post)}/`,
    }));

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' },
  });
}
