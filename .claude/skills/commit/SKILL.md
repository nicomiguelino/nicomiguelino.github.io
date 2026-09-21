---
description: Create a git commit for the current changes.
---

# Commit

- Follow Conventional Commits for the commit message (`type(scope): subject`).
- Commit message body is optional.
- If a body is present, use bullet points only, limited to 1-3 bullets. Keep each bullet short and simple.
- After pushing, check whether the current branch has an open PR (`gh pr view --json number,url,body`). If it does, update the PR description (`gh pr edit --body`) so it reflects all changes on the branch, including the new commit. Follow the `open-pr` skill's body conventions (bullets, `###` section headers, no "Test plan" section). Leave the PR title and draft status unchanged unless asked.
- If there is no associated PR, skip this step.
