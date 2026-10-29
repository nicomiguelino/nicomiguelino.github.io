# Nico Miguelino

## Getting started

Clone the repo:

```sh
git clone git@github.com:nicomiguelino/nicomiguelino.github.io.git
cd nicomiguelino.github.io
```

If you use Claude Code, install the project plugin once:

```sh
claude plugin install nicomiguelino@nicomiguelino --scope project
```

Then install and run:

```sh
npm install
npm run dev           # dev server on :4321
npm run build         # production build
npm run preview       # preview the production build
npm run check         # astro type checking
npm run lint:check    # lint with ESLint
npm run lint:fix      # lint and apply safe fixes
npm run format:check  # check formatting with Prettier
npm run format:fix    # format files with Prettier
```

> [!NOTE]
> `npm install` also sets up a Husky pre-commit hook that runs `lint:check`, `format:check`, and `check`. Fix failures before committing.

## Customizing

Site-wide values (name, URL, description, job title, and LinkedIn profile) live in `src/lib/site.ts`. Everything else to customize:

- `src/components/header/index.astro` and `src/components/Footer.astro`: social links, footer
- `src/lib/palette.ts`: the neon palettes (light and dark) applied per `prefers-color-scheme` until a visitor uses the theme toggle
- `src/lib/colors.ts`: the color tokens listed on the `/colors/` page; add a token here when you add one to `src/styles/palettes.css`
- `public/robots.txt` and `public/.well-known/security.txt`: domain and contact (static files, so they can't import from `site.ts`)
- `public/assets/og.png`: social preview image, 1200x630 (a plain placeholder is included)

Comments stay disabled unless you run a Remark42 instance. The configuration is at the bottom of `src/pages/blog/[slug].astro`; remove the comments section there if you don't want it.

## Writing posts

Posts are markdown files in `src/content/blog/` with `title`, `description`, `date`, optional `tags`, and optional `draft` frontmatter. Each tag links to its archive page under `/tags/`. `initial-post.md` shows the frontmatter and the supported markdown.

## Project structure

```
src/
  components/     # reusable UI: layout, header, page hero, post card, search, theme toggle
  content/blog/   # posts as markdown
  lib/            # post and tag helpers, palette names, color token list, site constants
  pages/          # index (home), blog/, experience/, colors/, tags/, 404, rss
  styles/         # global styles, design tokens, neon palette definitions (Tailwind CSS)
public/
  assets/         # font, og image
```

## License

[AGPL-3.0-or-later](LICENSE).

With thanks to:

- [herdr](https://github.com/ogulcancelik/herdr) by Oğulcan Çelik, the website theme this one grew out of, and the reason it is AGPL-3.0-or-later
- Style: [Neubrutalism](https://neubrutalism.com/), the design style behind the hard borders, offset shadows, and bold colors
- Font: [JetBrains Mono](https://www.jetbrains.com/lp/mono/), under the [SIL Open Font License 1.1](https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt)
- Search: [Fuse.js](https://www.fusejs.io) (Apache-2.0)
