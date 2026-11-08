# Decision log

Newest entries go at the top. Number entries sequentially and never rewrite an accepted entry; supersede it with a new one instead.

## 008. Migrate icons from Font Awesome to Tabler

- **Date:** 2026-11-08
- **Status:** Accepted

### Context

- Decision 007 proposed Lucide, but Lucide has no brand icons, so GitHub and LinkedIn would stay on Font Awesome.
- That leaves two icon sets in the header, one stroked and one filled.
- I want to drop Font Awesome fully.
- The sun icon in the theme toggle still looks like a gear, which started all this.

### Decision

- Replace Font Awesome with [Tabler Icons](https://tabler.io/icons), using the `@iconify-json/tabler` package.
- Tabler has the brand icons I need (`brand-github`, `brand-linkedin`) in the same outlined style as the rest.
- Read icon data at build time in `src/lib/icons.ts` through `getIcon(name)`. Nothing ships to the browser.
- Keep `Icon.astro` as the single place that renders icons.
- Credit Tabler Icons (MIT) somewhere visible, such as the README.
- Autumn uses a plain leaf. No set has a maple leaf.

### Alternatives considered

- **Lucide (decision 007):** a nice sun icon, but no brand icons. It needs Font Awesome's brand pack too, so two sets stay installed.
- **Keep Font Awesome's brand pack:** the smallest change, but it keeps a second set and a mix of filled and stroked icons.
- **[Simple Icons](https://simpleicons.org) for brands:** has GitHub but no LinkedIn, so it can't be the only source.
- **Bootstrap Icons:** has both brands, but it's filled, so the header would mix styles again.
- **Phosphor:** has both brands in an outlined style, and would also work. Tabler is the one I tried first.
- **Inline SVGs:** no dependency, but I'd have to source and credit each one by hand.

### Consequences

- Every icon shares one stroke style, brands included. The sun reads as a sun.
- `Icon.astro` only draws stroked icons, so the `fill-current` path goes away.
- Font Awesome and Lucide are both gone, with one icon dependency left.
- Tabler's license is MIT. It needs a credit, and the brand marks are trademarks of their owners. Using them as links to my own profiles is fine.
- GitHub and LinkedIn are outlined redraws, not the official logos.
- Tabler glyphs have padding inside their square, so they look small at the old 1rem size. Icons are 1.25rem now.
- Stroked icons look light next to bold text, so the project link labels drop from bold to medium.
- Every `Icon` call site needs a visual check after the move.

## 007. Migrate icons from Font Awesome to Lucide

- **Date:** 2026-11-08
- **Status:** Rejected, superseded by 008

### Context

- The site draws its icons from Font Awesome's free solid, regular, and brand packs through `src/components/Icon.astro`.
- The sun icon in the theme toggle at the top-right corner looks like a gear at a glance.
- Next to the other header buttons, it's hard to tell the theme toggle from a settings button.

### Decision

- Replace Font Awesome with [Lucide](https://lucide.dev), which has a sun icon that reads as a sun, with rays around a circle.
- Keep brand icons, like GitHub and LinkedIn, on Font Awesome's brand pack. Lucide has dropped its brand icons.
- Keep the `Icon` component as the single place that renders icons, so call sites barely change.

### Alternatives considered

- **Keep Font Awesome and swap only the sun:** the smallest change. It fixes the gripe but leaves the icon set inconsistent with itself.
- **Swap the sun for another Font Awesome icon:** the free packs have few sun variants, and none of them are clearly different from a gear at 16px.
- **Font Awesome's alternative sun icon:** it reads as a sun, but it isn't in the free packs. It needs a paid license.
- **[Simple Icons](https://simpleicons.org) for brands:** a full replacement for the brand pack, but it's one more dependency for two icons.

### Consequences

- The header icons share one stroke style and look more consistent.
- Lucide icons are stroked, while Font Awesome icons are filled, so `Icon.astro` has to support both, and `fill-current` styling doesn't carry over.
- Two icon packages stay installed, at least until brand icons have a replacement.
- Every `Icon` call site needs a visual check after the move.

## 006. Describe project links with a typed `links` array

- **Date:** 2026-11-08
- **Status:** Accepted

### Context

- Project cards took a `url` (secretly the GitHub link) plus one-off props like `demoUrl` and `themeUrl`.
- Each new link type meant a new prop and a new branch in the card.
- `isCooking` also changed the first link's label.

### Decision

- Give each project a `links` array of `{ kind, url }`.
- Resolve each `kind` to its label, icon, and aria label in one map, `PROJECT_LINK_DEFINITIONS` in `src/lib/projects.ts`.
- Render links in array order.
- Keep `isCooking` for the badge only.

### Alternatives considered

- **Bare `url[]`:** can't tell a link's label or icon, and keeps the "first URL is GitHub" assumption.
- **`{ label, url, icon }[]`:** flexible, but project data carries presentation and labels can drift.
- **Keyed object (`{ github?, demo? }`):** typed, but link order comes from the card and each new key needs a card change.
- **[Content collection](https://docs.astro.build/en/guides/content-collections/):** worth it once projects need long content or screenshots. Too big for this problem.

### Consequences

- A new link type is one map entry and one union member.
- Project data stays plain.
- Link order is controlled per project.

## 005. Organize components into subdirectories by feature

- **Date:** 2026-11-04
- **Status:** Accepted

### Context

- Component files used by the Experience and Projects pages and the navigation header are organized into subdirectories.
- The rest of the files sit directly in the `src/components/` directory.

### Decision

- Group components into subdirectories by the page or feature they belong to.
- Where components don't nest under one parent, group them by similarity instead, such as the seasonal effects.
- Components shared across many pages can stay at the root.

### Alternatives considered

- Flat directory structure
  - It's easy to add new files because I don't have to decide where to put them.
  - It works for a small number of files, but it doesn't scale.
- A folder for every page
  - It's tidy, but it forces unrelated components together.

### Consequences

- Browsing `src/components/` will be easier because related files sit together.
- Moving a component means updating the import paths in the files that use it. Most imports use the `@/components/...` alias, so each move touches only a few files.
- Each new component requires a decision about where it belongs.
- A component used by one page today may be shared later, which means moving it back to the root.

## 004. Add seasonal themes

- **Date:** 2026-10-31
- **Status:** Accepted

### Context

- It was October 31st, Halloween, in the afternoon. I noticed that GitHub and other sites get a Halloween look for the day.
- My first idea was to add the same Halloween look.
- I don't like waiting a whole year to see that look again.

### Decision

- Make the site's theme follow the seasons instead of a single holiday.
- Pick the palette from the visitor's local date, so no rebuild is needed when a season starts or ends.
- Start with autumn, then add winter, spring, and summer.
- Add support for user overrides later.

### Alternatives considered

- **One-day Halloween theme:** what other sites do. It's fun, but it only shows up once a year.

### Consequences

- The site changes look four times a year without any manual work.
- Each season needs its own light and dark palettes.
- Visitors who don't want the seasonal look need a way to override it.

## 003. Adopt Neobrutalism

- **Date:** 2026-10-28
- **Status:** Accepted

### Context

- The site uses a muted Gruvbox theme with serif headings.
- I want a bolder look with more personality.

### Decision

- Adopt Neobrutalism: hard borders, offset shadows, and card layouts.
- Use Space Grotesk for headings, nav, and brand, and Inter for body text.
- Switch to a pastel neon palette.
- Drop styles that don't fit, like glassmorphism.

### Alternatives considered

- **Keep Gruvbox:** the status quo. It works, but it's plain.

### Consequences

- Components get restyled to match.
- The look is less subtle, so it may feel loud on a content-heavy site.

## 002. Migrate styling to Tailwind CSS

- **Date:** 2026-09-27
- **Status:** Accepted

### Context

- All styles live in one hand-written stylesheet, `public/css/style.css`.
- Writing plain CSS for every component feels verbose.

### Decision

- Adopt Tailwind CSS v4 through `@tailwindcss/vite`.
- Style components inline with Tailwind's utilities and shorthands instead of writing separate CSS rules.
- Expose the palette variables to Tailwind through `@theme inline`.
- Shared concerns that don't fit utilities, like palettes and design tokens, stay in CSS files under `src/styles`.

### Alternatives considered

- **Plain CSS:** the status quo. It works, but I want less boilerplate per component.

### Consequences

- Most component styling moves into markup, so the global stylesheet shrinks.
- Class lists in templates will get long. Use `@apply` where utilities get awkward, like pseudo-elements and descendant rules.
- Tailwind's preflight reset changes browser defaults. Restore some of them, like list markers and heading sizes.
- Some CSS stays, so this won't remove hand-written styles entirely.

## 001. Title of the decision

- **Date:** 2026-09-17
- **Status:** Accepted

### Context

- I needed to bootstrap a personal site as efficiently as possible.
- To get started, I needed to decide which framework and which template to use.

### Decision

- I decided to use [Astro](https://astro.build) for my personal portfolio and blogging site.
- Astro has a [themes directory](https://astro.build/themes/) with many free options to choose from. One theme quickly caught my attention, so I went with Josh Ruggles' [Astro Palette](https://astro.build/themes/details/astro-palette/) theme.

### Alternatives considered

- **Next.js**: This is one of the most popular options out there when it comes to hosting content-rich sites. I have no issues with this one. I could've picked this.
- **Gatsby.js**: Upon doing a quick research, Gastby only have a limited amount of options when it comes to themes that caters to my liking.

### Consequences

The options below are decent but the quick metric in Astro's home page regarding performance got me.
