import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { postSlug } from '../lib/posts';
import { SITE_DESCRIPTION, SITE_NAME } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: `RSS — ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${postSlug(post)}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
