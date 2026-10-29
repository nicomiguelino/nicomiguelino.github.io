---
title: 'Using the Same Set of Claude Skills Across Multiple Repos'
description: "Claude skills are easy to set up in one repo. Keeping the same set working across many is the hard part. In this post, I'll share how I tackled it."
date: 2026-10-29
tags:
  - Claude Code
---

## The problem

I use Claude Code on my personal projects, including this site and a private one that I'll just call `some-private-project` for the sake of privacy. Both need the same skills: one for creating commits and another for opening pull requests. If each project carries its own copy, the directory structure looks like this:

```text
nicomiguelino.github.io/
└── .claude/
    └── skills/
        ├── commit/
        │   └── SKILL.md
        └── open-pr/
            └── SKILL.md
```

```text
some-private-project/
└── .claude/
    └── skills/
        ├── commit/
        │   └── SKILL.md
        └── open-pr/
            └── SKILL.md
```

Every time I tweak a skill in one project, I have to remember to copy the change into the other.

## Git submodules

My first instinct was to use Git submodules because I was familiar with them. I used to keep the shared files in a common repository, [`claude-skills`](https://github.com/nicomiguelino/claude-skills), that contains only the skills:

```text
claude-skills/
├── commit/
│   └── SKILL.md
├── open-pr/
│   └── SKILL.md
└── README.md
```

Then I mounted it at `.claude/skills` in each project:

```bash
git submodule add git@github.com:nicomiguelino/claude-skills.git .claude/skills
git commit -m "chore(claude): use shared skills submodule"
```

It worked, but it came with a few catches:

- Anyone who clones a project finds `.claude/skills` empty until they run `git submodule update --init`, or clone with `git clone --recurse-submodules`.
- Updating the skills means running `git submodule update --remote`, then committing the new submodule pointer in each project.
- If a project used to track `.claude/skills` as plain files, pulling the commit that swaps in the submodule can delete the submodule's files from the working tree.

Once I learned that I could've just used a Claude plugin, I created a new repository, [`claude-plugin`](https://github.com/nicomiguelino/claude-plugin), to replace it.

## Claude plugins

I did a quick read of the [plugins overview](https://code.claude.com/docs/en/plugins/overview) and the guide on [creating plugins](https://code.claude.com/docs/en/plugins/create). Here's what my plugin repository, `claude-plugin`, looks like:

```text
claude-plugin/
├── .claude-plugin/
│   ├── marketplace.json
│   └── plugin.json
├── skills/
│   ├── commit/
│   │   └── SKILL.md
│   └── open-pr/
│       └── SKILL.md
└── README.md
```

The `plugin.json` file describes the plugin:

```json
{
  "name": "nicomiguelino",
  "description": "A collection of common, general-purpose skills intended for personal use",
  "version": "1.0.3",
  "author": {
    "name": "Nico Miguelino"
  }
}
```

The `marketplace.json` file lets the repository be added as a marketplace:

```json
{
  "name": "nicomiguelino",
  "owner": {
    "name": "Nico Miguelino"
  },
  "plugins": [
    {
      "name": "nicomiguelino",
      "source": "./",
      "description": "A collection of common, general-purpose skills intended for personal use"
    }
  ]
}
```

Each skill is a `SKILL.md` file with a description in its frontmatter, followed by the instructions for Claude:

```markdown
---
description: Open a pull request for the current branch.
---

# Open PR

- Follow Conventional Commits for the PR title.
- Base branch is `main`.
```

## Using it in each project

To make the plugin available in a single project, I run the following from inside it:

```bash
claude plugin marketplace add nicomiguelino/claude-plugin --scope project
claude plugin install nicomiguelino@nicomiguelino --scope project
```

The `--scope project` flag writes the setup to `.claude/settings.json`, which I commit:

```json
{
  "enabledPlugins": {
    "nicomiguelino@nicomiguelino": true
  },
  "extraKnownMarketplaces": {
    "nicomiguelino": {
      "source": {
        "source": "github",
        "repo": "nicomiguelino/claude-plugin"
      }
    }
  }
}
```

This site and `some-private-project` use the same file. After cloning a project and trusting the folder, a collaborator only needs to run the install command once. Then the skills are available as `/nicomiguelino:commit` and `/nicomiguelino:open-pr`.

## What stays in CLAUDE.md

Plugins don't load `CLAUDE.md` or `.claude/rules/` files, so shared instructions have to live in a skill. That works out for my projects, because the instructions in their `CLAUDE.md` files are specific to each one:

- **This site:** coding conventions, such as naming, types, and style, plus the checks to run.
- **`some-private-project`:** how to create pull requests, plus the commands for running the backend, linting, and formatting.

The skills are what the projects share, and the `CLAUDE.md` files are what make each one different.

## What's next?

Looking back, I reached for Git submodules because they were familiar, not because they were the best fit. A plugin lives in one repository, and each project just points to it, with no copying and no submodule pointers to bump. If your shared files are mostly skills, agents, or hooks, start there. If you rely on `CLAUDE.md` or rules, keep them in each project.
