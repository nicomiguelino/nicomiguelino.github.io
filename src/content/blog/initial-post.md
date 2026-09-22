---
title: 'git commit -m "initial post"'
description: "My personal site finally gets the makeover it deserves. Here's the story of how I built it."
date: 2026-09-18
tags:
  - General
  - Astro
draft: false
---

## The story so far

The site has been sitting untouched for a while. It began in 2017 as a simple [Jekyll](https://jekyllrb.com/) blog. About a year later, I discovered React and promised myself I'd migrate to it, but the migration kept slipping through the cracks. When I finally found the time, three years on, I rebuilt it in Angular instead. The [old version](https://nicomiguelino.github.io/about-legacy/) is still up.

Then I stumbled onto [Astro](https://astro.build/). It felt familiar coming from React and Jekyll, and writing posts stayed refreshingly simple: create a Markdown file, add some metadata, write, and publish.

Thanks to a theme called [Astro Palette](https://astro.build/themes/details/astro-palette/), I finally have a working prototype. On top of that, it's easily customizable.

## What I like about Astro

Full disclosure: I'm not trying to hype up Astro here. I was looking for something that ticked most of the items on my checklist, and it happened to be the one.

I've been comfortable with writing content using Markdown for a while now. With that supported, I don't need to learn a new markup language that has a steep learning curve. On top of that, updating metadata like date, description, and tags is fairly straightforward.

Astro comes with file-based routing out of the box, which means that the URLs are based on the project's directory structure. Unlike other frameworks where there's a separate configuration layer for managing URL mappings, Astro doesn't need one. This degree of intuitiveness lets you focus on other aspects like writing content or redesigning your site.

## On using artificial intelligence

With AI-assisted coding becoming more common, it's easy to fall into the temptation of having tools like Claude generate almost 100% of the content for you. In this project, I'm trying to do my best not to fully rely on AI. Doing so will suck the life out of this site. I must admit that when I was first introduced to tools like these&mdash;Copilot, Cursor, and now Claude&mdash;I was amazed. My mindset was that I paid a premium for these subscriptions, so I must utilize 100% of them.

Everything seemed to be fine until I realized something over the years. I became so dependent on AI that it does all of the thinking now. It's no different from what I used to do almost a decade ago: search Google, click a page like Stack Overflow, and blindly copy and paste snippets into my code editor. **_Same thing, different font._**

## What's next?

The site's code is [open source](https://github.com/nicomiguelino/nicomiguelino.github.io), and you can see in the repository that it has Claude-related files. However, I intend to only use them occasionally in situations like coming up with a commit message or opening a new PR. When writing posts, I'll lean on them sparingly in instances where I need the grammar and cohesiveness of my content checked.

Expect frequent tweaks to the design over the coming weeks, along with more posts.
