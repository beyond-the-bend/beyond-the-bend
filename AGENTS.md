# Agent Instructions (Shared Source of Truth)

**This file is the single source of truth for ALL AI agents working in this project.**
Whether you are Claude, Gemini, Codex, or any other model - read and follow THIS file.
Do NOT rely on CLAUDE.md, GEMINI.md, or CODEX.md for instructions. Those files exist only to redirect you here.

Read this entire file before starting any task.

## Self-Correcting Rules Engine

This file contains a growing ruleset that improves over time. **At session start, read the entire "Learned Rules" section before doing anything.**

### How it works

1. When the user corrects you or you make a mistake, **immediately append a new rule** to the "Learned Rules" section at the bottom of this file.
2. Rules are numbered sequentially and written as clear, imperative instructions.
3. Format: `N. [CATEGORY] Never/Always do X - because Y.`
4. Categories: `[STYLE]`, `[CODE]`, `[ARCH]`, `[TOOL]`, `[PROCESS]`, `[DATA]`, `[UX]`, `[OTHER]`
5. Before starting any task, scan all rules below for relevant constraints.
6. If two rules conflict, the higher-numbered (newer) rule wins.
7. Never delete rules. If a rule becomes obsolete, append a new rule that supersedes it.

### When to add a rule

- User explicitly corrects your output ("no, do it this way")
- User rejects a file, approach, or pattern
- You hit a bug caused by a wrong assumption about this codebase
- User states a preference ("always use X", "never do Y")

### Rule format example

```
14. [CODE] Always use `bun` instead of `npm` - user preference, bun is installed globally.
15. [STYLE] Never add emojis to commit messages - project convention.
16. [ARCH] API routes live in `src/server/routes/`, not `src/api/` - existing codebase pattern.
```

---

## Learned Rules

<!-- New rules are appended below this line. Do not edit above this section. -->
1. [PROCESS] Always write learned rules to AGENTS.md, never to CLAUDE.md, GEMINI.md, or CODEX.md - those are redirect files only. AGENTS.md is the single source of truth.
2. [PROCESS] Always keep simple context tasks light and fast unless the user asks for a deep pass - because this workspace should not feel slow or heavy for easy questions.
