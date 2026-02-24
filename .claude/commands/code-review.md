---
description: Reviews uncommitted changes made on the current branch. It will coordinate two reviewer subagents in parallel: a11y-reviewer, civic-flow-code-reviewer.
allowed-tools: Bash(git diff), Bash(git diff --staged)
---

## Context:

- Current git diff (unstaged): !`git diff`
- Current git diff (staged): !`git diff --staged`

## Your Task:

You are coordinating a full review of the current branch changes for the CivicFlow project. Your job is to:

1. Collect the full diff from the context above (combining staged and unstaged changes).
2. Launch **both** of the following subagents **in parallel** using the Task tool, passing the full diff to each:
   - `a11y-reviewer` — reviews for WCAG 2.1/2.2 and WAI-ARIA compliance
   - `civic-flow-code-reviewer` — reviews for code quality, architecture, and best practices
3. Wait for both agents to complete.
4. Present both results clearly to the user, separated by agent name.

### Rules:

- Always launch both agents simultaneously in a single message (parallel Task tool calls).
- Pass the complete diff as context to each agent so they can review independently.
- If there are no changes (empty diff), inform the user and do not launch the subagents.
- Do not summarize or editorialize the agents' output — present it as-is.
- Label each section clearly:

---

### Accessibility Review (a11y-reviewer)

[output from a11y-reviewer]

---

### Code Quality Review (civic-flow-code-reviewer)

[output from civic-flow-code-reviewer]

---

Rules:

- Do NOT edit any files yet.
- Do NOT run formatting-only changes unless they fix a cited issue.

Finish by asking:
"Do you want me to implement the action plan now?"

Wait for user confirmation before making any changes.
