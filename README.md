# Nico Miguelino

## Getting started

```sh
npm install
npm run dev       # dev server on :4321
npm run build     # astro build + pagefind index
npm run preview   # preview the production build
npm run check     # astro type checking
```

Search queries the Pagefind index in `dist/`, so run `npm run build` once before search will return results in dev.

## Customizing

Site-wide values (name, URL, description, job title, and LinkedIn profile) live in `src/lib/site.ts`. Everything else to customize:

- `src/components/Layout.astro`: social links, footer
- `src/pages/about.astro`: bio
- `src/lib/tags.ts`: skills list for the marquee, which also seeds the `/tags/` archive
- `src/lib/palette.ts`: the palette applied before a visitor picks one, per `prefers-color-scheme`
- `public/robots.txt` and `public/.well-known/security.txt`: domain and contact (static files, so they can't import from `site.ts`)
- `public/assets/og.png`: social preview image, 1200x630 (a plain placeholder is included)

Comments stay disabled unless you run a Remark42 instance. The configuration is at the bottom of `src/pages/blog/[slug].astro`; remove the comments section there if you don't want it.

## Writing posts

Posts are markdown files in `src/content/blog/` with `title`, `description`, `date`, optional `tags`, and optional `draft` frontmatter. Each tag links to its archive page under `/tags/`. `initial-post.md` shows the frontmatter and the supported markdown.

## Project structure

```
src/
  components/     Layout (nav, search, theme switcher), TypedLede, SkillsMarquee
  content/blog/   posts as markdown
  lib/            post and tag helpers, skills list, default palette, site constants
  pages/          index (home), blog/, tags/, about, 404, rss
public/
  css/style.css   all styling, including palette definitions
  assets/         font, og image
```

## License

[AGPL-3.0-or-later](LICENSE).

With thanks to:

- [herdr](https://github.com/ogulcancelik/herdr) by Oğulcan Çelik, the website theme this one grew out of, and the reason it is AGPL-3.0-or-later
- Palettes, each from its upstream project and used under that project's licence:
  [Catppuccin](https://github.com/catppuccin/palette),
  [Tokyo Night](https://github.com/enkia/tokyo-night-vscode-theme),
  [Dracula and Alucard](https://github.com/dracula/dracula-theme),
  [Nord](https://github.com/nordtheme/nord),
  [Gruvbox](https://github.com/morhetz/gruvbox),
  [One Dark and One Light](https://github.com/atom/one-dark-syntax),
  [Solarized](https://github.com/altercation/solarized),
  [Kanagawa](https://github.com/rebelot/kanagawa.nvim),
  [Rose Pine](https://github.com/rose-pine/neovim),
  [Vesper](https://github.com/raunofreiberg/vesper),
  [Everforest](https://github.com/sainnhe/everforest),
  [Ayu](https://github.com/ayu-theme/ayu-colors),
  [GitHub](https://github.com/primer/github-vscode-theme),
  [Monokai](https://github.com/tanvirtin/monokai.nvim),
  [Night Owl and Light Owl](https://github.com/sdras/night-owl-vscode-theme),
  [Oxocarbon](https://github.com/nyoom-engineering/oxocarbon),
  [Poimandres](https://github.com/drcmda/poimandres-theme) and
  [Palenight](https://github.com/whizkydee/vscode-palenight-theme).
  All are MIT except Gruvbox, which declares MIT/X11 in its README. Terminal is not
  derived from a published scheme.
- Font: [JetBrains Mono](https://www.jetbrains.com/lp/mono/), under the [SIL Open Font License 1.1](https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt)
- Search: [Pagefind](https://pagefind.app) (MIT)
