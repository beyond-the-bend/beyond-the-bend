# BTB Workspace Modularization Project

**Status:** Planning — gathering requirements
**Priority:** High
**Created:** 2026-03-18

## Goal

Break the monolithic `C:\BTB` workspace (~17GB) into focused, independent workspaces so each AI agent session and editing context is lean and relevant.

## Working Draft — Proposed Workspaces

| Workspace | Contents | Notes |
|---|---|---|
| **btb-website** | Website files + Sanctuary membership content | Existing GitHub repo; Sanctuary content serves the membership site |
| **btb-content** | Substack essays, newsletters, meditations | Writing & publishing workflow |
| **btb-video** | Remotion project, video scripts, raw/finished videos | Intro/outro processing pipeline |
| **btb-business** | Strategy, finances, brand assets, operations docs | Admin/ops hub |

> Structure is draft — pending answers to clarifying questions below.

## Open Questions

See conversation for full list. Key decisions needed:

- [ ] Sibling folders vs. nested under a parent?
- [ ] Which workspaces need git?
- [ ] Where does ghl-mcp belong?
- [ ] What can be deleted/archived?
- [ ] Shared AGENTS.md or per-workspace?
- [ ] Brand asset access across workspaces?

## Migration Plan

_To be filled in once questions are answered._

## Log

- **2026-03-18** — Project created. Clarifying questions sent to Laura.
