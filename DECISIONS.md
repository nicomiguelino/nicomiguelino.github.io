# Decision log

Newest entries go at the top. Number entries sequentially and never rewrite an accepted entry; supersede it with a new one instead.

## 002. Add linting and formatting

- **Date:** 2026-09-22
- **Status:** Accepted

### Context

- I'm picky about things like indentation and unused identifiers.
- I'd rather spend my time on design and functionality than on nitpicking style by hand.
- Linting and formatting is also standard practice in established open-source repos.

### Decision

- I added ESLint (with `typescript-eslint` and `eslint-plugin-astro`) for linting and Prettier (with `prettier-plugin-astro`) for formatting.
- I added `lint` and `format` scripts, each with a check and a fix variant.
- I added a GitHub Actions workflow so the checks run in the pipeline.

### Alternatives considered

- **Biome:** a single tool for linting and formatting. I could've used it, or other alternatives.
- **ESLint and Prettier:** I picked these because I'm already familiar with them and they're mature.

### Consequences

- Style issues are caught automatically, so reviews can focus on design and functionality.
- The existing files were reformatted once to match the new rules.

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
