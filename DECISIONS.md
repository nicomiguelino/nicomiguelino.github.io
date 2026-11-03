# Decision log

Newest entries go at the top. Number entries sequentially and never rewrite an accepted entry; supersede it with a new one instead.

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
