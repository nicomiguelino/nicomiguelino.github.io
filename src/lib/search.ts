import { PROJECTS_DESCRIPTION, SITE_DESCRIPTION } from '@/lib/site';

export type SearchEntry = {
  title: string;
  description: string;
  tags: string[];
  body: string;
  url: string;
};

export const PAGE_SEARCH_ENTRIES: SearchEntry[] = [
  {
    title: 'Home',
    description: SITE_DESCRIPTION,
    tags: [],
    body: "Hi, I'm Nico, a full-stack engineer who likes building things for the web, frontend or backend. I turn annoying problems into convenient tools, using engineering and creativity.",
    url: '/',
  },
  {
    title: 'Blog',
    description: "Notes on what I'm building, learning, and figuring out along the way",
    tags: [],
    body: 'All blog posts.',
    url: '/blog/',
  },
  {
    title: 'Tags',
    description: 'Posts grouped by tag',
    tags: [],
    body: 'Browse blog posts by tag.',
    url: '/tags/',
  },
  {
    title: 'Experience',
    description: 'My tech journey so far...',
    tags: ['career', 'resume', 'work'],
    body: 'Software Engineer at Screenly (October 2022 to September 2026): maintained Anthias, open-source digital signage, and led migrations from Python 2 to 3, Flask to Django, and CoffeeScript and Backbone.js to TypeScript and React. Maintained and migrated more than 30 Edge Apps that connect to Salesforce, Airtable, Grafana, and Slack through REST APIs. Co-initiated @screenly/edge-apps, an NPM package. Revived the browser extension and built the Zapier integration. Backend Engineer at Advanced Science and Technology Institute (May 2020 to June 2022): REST API changes and command-line tools for developers, QA engineers, and system administrators. Software Engineer at Nokia (February 2017 to April 2020): developed 5G features for an in-house 5G User Equipment simulator using test-driven development. Test Automation Engineer at Advanced Science and Technology Institute (July 2016 to December 2016): web application test automation with Jenkins, Selenium, and Python, plus user manuals and technical documentation.',
    url: '/experience/',
  },
  {
    title: 'Projects',
    description: PROJECTS_DESCRIPTION,
    tags: ['open source', 'github'],
    body: 'nicomiguelino.github.io: my personal portfolio and blog, and the site you are on right now. It has a Neobrutalist look and a palette that follows the seasons. Seasons: a season-aware Neobrutalist theme for Astro blogs. The idea came to me during a makeover of this site, and I thought: why not make it into a theme? The palette follows the calendar, with light and dark modes for every season. Neobrutalist Web Components (cooking): a library of Neobrutalist custom elements built with Lit and Vite. You can use them from TypeScript or from vanilla HTML, CSS, and JavaScript.',
    url: '/projects/',
  },
];
