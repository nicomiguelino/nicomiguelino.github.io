---
title: 'How I leverage Claude Code to streamline my Notetaking'
description: "In this post, I'll share my journey from adopting Notion as my go-to notetaking tool to leveraging my coding tool of choice to make my notetaking experience a breeze."
date: 2026-09-28
tags:
  - Notion
  - Claude Code
---

## Picking a notetaking tool

I tried several notetaking tools before I settled on [Notion](https://www.notion.com/), including [Evernote](https://evernote.com/) and, later, [OneNote](https://onenote.cloud.microsoft/), but they were too simple for my use case. I spent a couple of years with OneNote before I came across Notion.

Notion offers more flexibility, which makes organizing my thoughts much easier. It supports:

- Code snippets
- Unlimited page nesting
- Markdown
- Calendars and boards

## Notion as my second brain

Every time I need to capture something like a high-priority task or a frequently-used Linux command, I log it in Notion. Under normal circumstances, this is fine. In situations where a task demands focused and uninterrupted work, switching to Notion to take notes feels like a major context switch&mdash;I'm coding with focus, an idea pops up, and I switch to Notion to take note of it. The moment I go back to my code editor and terminal, I almost forget where I left off. I'm also guilty of getting sidetracked by small decisions, like which heading type to use, which emoji to give a new page, and what color some text should be.

## Connecting Claude Code to Notion via MCP

I once worked on a task that required moving certain parts of a large GitHub repository into multiple, separate repositories. It wasn't a simple migration where I could call it a day once everything was moved into place. I still needed to make sure that the workflows (e.g., testing, linting, formatting, building, and deploying) were intact. I perform better when I write things down. My first option was to track the migrations in a spreadsheet. The second was to use Notion.

Anthropic released the [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol), which made it possible to establish connections between AI-powered tools like Claude or Cursor and data sources like Notion or Slack. With this, I figured that I could glue these tools together to make my workflow more efficient. Luckily, Notion lets you connect to it via MCP with a one-line command:

```
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

You can find more details [here](https://developers.notion.com/guides/mcp/get-started-with-mcp#claude-code).

With this, I rarely have to leave my terminal (I code in Neovim, too) whenever I want to write things down. I just prompt Claude to take notes for me and check the results in Notion afterwards.

## Takeaway

The best coding and notetaking setup is the one that doesn't pull you out of what you're doing. I probably won't stop saying this&mdash;let's use AI responsibly. I mentioned in my previous posts that this situation is comparable to how we copied and pasted code from Stack Overflow about a decade ago. We can even go back thousands of years, to when [Socrates, as recorded by Plato, worried that writing](https://conradkottak.substack.com/p/socrates-writing-and-ai) would make people rely on it instead of their own memory and understanding. The tools change, but the responsibility to think stays with us.
