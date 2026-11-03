# Coding conventions

## Naming

- No shorthand variable names. Use `option`, `event`, `separator`, `closeButton`, not `opt`, `e`, `sep`, `closeBtn`.
- Names say what the thing is. Qualify generic names, e.g. `cursorIndex`, `targetIndex`, `targetOption`, not `idx` or `target`.
- Name functions that return a value with a `get` prefix, e.g. `getVisibleOptions`, `getDefaultPalette`.

## Types

- Declare return types on named functions (`: void`, `: string`, `: HTMLButtonElement[]`).
- Annotate collection variables, e.g. `const options: HTMLButtonElement[]`.

## Style

- Pass only variables or function calls as arguments where possible. Compute long or complex expressions into a named variable first. Short ones are fine inline.
- Declare a variable once. Merge branches that differ only by a step or direction.
- No code or CSS comments.

## Checks

- Run `bunx astro check` and `bunx prettier --check` on changed files.

# Decision log

Past project decisions live in the file below. Consult it before changing anything it covers, and add a new entry when a significant decision is made.

@../DECISIONS.md
