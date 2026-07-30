# BTB AI Agent Workflow Plan

Last updated: July 14, 2026

Purpose: help Laura use Cursor, Codex, and Anti Gravity together without scrambling the working Sanctuary, Stripe, website, or email systems.

## Guiding Rule

One source of truth. One active task. Clear folder boundaries.

No AI agent should move, rename, delete, or "clean up" files unless Laura explicitly approves that exact action.

## Current Safety Context

The Sanctuary is live and working.

People have signed up.

Stripe/subscription access is working.

MailerLite migration is being considered because Kit feels too complicated.

Because of that, the safest default is:

- read first
- summarize findings
- edit only approved files
- never casually touch production membership/access files

## Agent Roles

### Cursor

Best role:

- project manager
- safety reviewer
- system mapper
- careful implementation partner
- final review before deployment

Use Cursor for:

- understanding the whole project
- checking what changed
- mapping active vs old folders
- reviewing Codex/Anti Gravity output
- writing handoff docs
- carefully editing website/docs when the scope is clear
- validating that no production files were touched unexpectedly

Avoid using Cursor for:

- broad automatic cleanup unless there is a written cleanup plan
- production edits without a backup/test path

### Codex

Best role:

- focused coding assistant
- page/component builder
- bug fixer
- small implementation tasks

Use Codex for:

- "Edit this one page"
- "Fix this CSS issue"
- "Build this one landing page section"
- "Connect this MailerLite embed on this specific page"
- "Make this button point to this approved link"
- "Refactor this specific file without touching anything else"

Codex instructions should always include:

- exact folder
- exact files allowed
- exact files forbidden
- whether the task is read-only or edit-allowed

### Anti Gravity

Best role:

- creative exploration
- design alternatives
- brand/copy variations
- bigger conceptual thinking

Use Anti Gravity for:

- new page concepts
- layout ideas
- Sanctuary member experience ideas
- copy variations
- visual direction
- campaign ideas

Avoid using Anti Gravity for:

- production deployment changes
- Stripe/auth/member access work
- broad file cleanup
- changing live Sanctuary files without Cursor review

## Folder Rules for Agents

### Public Website Design Work

Default folder:

`C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play`

Use for:

- homepage design
- public website content
- non-production visual changes
- future page buildouts

### Live Sanctuary / Production Membership Work

Default folder:

`C:\BTB\Tech_and_Web\Sanctuary_Deploy`

Use only when the task is explicitly about:

- live Sanctuary
- login
- member access
- Stripe checkout
- subscription management
- production deployment

Extra rule:

Cursor should review before and after any change here.

### Original Cursor Design Reference

Folder:

`C:\BTB\Tech_and_Web\New_Website\Cursor_Concept`

Use for:

- reference only
- comparing design direction
- recovering older visual ideas

Do not edit unless Laura explicitly asks to revise the Cursor concept itself.

### Older Site / GHL Reference

Folders:

- `C:\BTB\Tech_and_Web\website`
- `C:\BTB\Tech_and_Web\New_Website\Active_Build`
- `C:\BTB\Tech_and_Web\New_Website\Reference_From_GoHighLevel`
- `C:\BTB\Tech_and_Web\GoHighLevel_Custom_HTML`

Use for:

- extracting copy
- comparing old pages
- finding links/forms/content
- migration reference

Do not assume these are current.

## Production Risk Levels

### Low Risk

Usually safe with normal review:

- editing draft docs
- creating planning notes
- creating new design-only files
- changing copy in non-production concept files
- creating MailerLite planning docs
- creating read-only audits

### Medium Risk

Needs clear scope and after-change review:

- editing `Codex_Concept_Play` pages
- changing links on public pages
- adding MailerLite forms
- changing newsletter signup flow
- changing images/assets used by the public website

### High Risk

Needs explicit approval and ideally backup/testing:

- editing `Sanctuary_Deploy`
- changing Stripe checkout or subscription logic
- changing login/auth/member access
- changing Vercel/Netlify config
- editing `.env` files
- changing Bunny/CDN media paths
- replacing Kit/GHL automation paths with MailerLite

## Standard Workflow

Use this workflow for any task that might affect the website or systems.

### Step 1. Identify the Task Type

Ask:

- Is this design?
- Is this copy/content?
- Is this production Sanctuary?
- Is this payment/auth/email?
- Is this cleanup?

### Step 2. Choose the Agent

- Design exploration: Anti Gravity
- Focused code implementation: Codex
- Safety review / system understanding: Cursor
- Production-sensitive changes: Cursor first, then Codex only with narrow instructions if needed

### Step 3. Set Folder Boundaries

Always specify:

- "Work only in this folder..."
- "You may edit only these files..."
- "Do not touch these folders..."

### Step 4. Read Before Editing

For any meaningful task, the agent should first report:

- what files it inspected
- what it believes is current
- what it proposes to change
- what risks it sees

### Step 5. Edit Small

Prefer small edits:

- one page
- one form
- one section
- one workflow

Avoid sweeping refactors.

### Step 6. Review

After changes, require:

- list of files changed
- summary of exactly what changed
- whether production/member access was touched
- whether tests/previews were run

### Step 7. Cursor Review Before Deploy

Before deploying, publishing, or copying into `Sanctuary_Deploy`, ask Cursor to review:

- changed files
- affected links/forms
- production risks
- rollback plan

## Prompt Templates

### Read-Only Audit Prompt

```text
Work in C:\BTB.

This is read-only. Do not edit, move, rename, delete, or create files.

Task:
[describe what to inspect]

Pay special attention to:
[folders/files]

Do not touch:
- C:\BTB\Tech_and_Web\Sanctuary_Deploy
- any .env files
- any Stripe, auth, API, Vercel, Netlify, or member-access files

Return:
1. files inspected
2. current understanding
3. risks or stale items
4. recommended next steps
```

### Safe Public Website Edit Prompt

```text
Work only in:
C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play

You may edit only:
[specific files]

Do not touch:
- C:\BTB\Tech_and_Web\Sanctuary_Deploy
- any .env files
- any Stripe/auth/API/Vercel/Netlify files
- any GoHighLevel or MailerLite production settings

Task:
[specific change]

Before editing, summarize what you plan to change.

After editing, list every changed file.
```

### Production Sanctuary Prompt

Use only when necessary.

```text
This task may affect the live Sanctuary.

Work only in:
C:\BTB\Tech_and_Web\Sanctuary_Deploy

Do not make broad cleanup changes.

Task:
[specific production issue]

Before editing:
1. identify the exact files involved
2. explain the risk
3. explain the rollback plan
4. wait for approval

After editing:
1. list files changed
2. explain exactly what changed
3. explain how to test login/checkout/member access
```

### MailerLite Migration Prompt

```text
Work in C:\BTB.

Goal:
Plan or implement the MailerLite migration without breaking the working Sanctuary.

Do not remove or disable GoHighLevel, Kit, Stripe, or Sanctuary files unless explicitly approved.

Task:
[specific MailerLite task]

First identify:
1. current form/email/list dependency
2. replacement MailerLite flow
3. what should remain temporarily as backup
4. test steps before switching live links
```

### Cleanup Planning Prompt

```text
Work in C:\BTB.

This is cleanup planning only.

Do not move, rename, delete, or edit production files.

Task:
Create a proposed cleanup/archive plan for:
[folder or area]

Return:
1. active files/folders
2. reference-only files/folders
3. likely archive candidates
4. files that must not be touched
5. questions for Laura before any cleanup
```

## Recommended Division of Labor

### If Laura wants a new page

1. Anti Gravity explores layout/copy directions.
2. Laura picks a direction.
3. Codex builds the page in `Codex_Concept_Play`.
4. Cursor reviews before anything goes live.

### If Laura wants a form connected

1. Cursor maps the current form and risk.
2. Codex adds the MailerLite embed or link in the approved file.
3. Cursor reviews the changed file and tests the flow.
4. Laura confirms before replacing old links.

### If Laura wants Sanctuary changes

1. Cursor audits first.
2. Decide whether change belongs in `Codex_Concept_Play` or `Sanctuary_Deploy`.
3. If production, make the smallest possible change.
4. Test login, access, checkout/subscription if relevant.

### If Laura wants cleanup

1. Cursor creates a read-only cleanup map.
2. Laura approves specific archive/move actions.
3. Back up first.
4. Move only low-risk/reference files.
5. Re-test the live system.

## MailerLite / GoHighLevel Transition Guidance

Do not cancel or remove GoHighLevel just because MailerLite feels better.

First confirm:

1. all contacts are exported/imported
2. newsletter signup works
3. Sanctuary interest/founding member flow works
4. workshop flow works
5. livestream update flow works
6. essential automations are recreated
7. old GHL forms/links are no longer receiving live traffic

Once those are confirmed, GHL can likely become temporary backup and then be retired.

## "Do Not Scramble The Project" Rules

1. Do not let two agents edit the same file at the same time.
2. Do not let one agent edit `Sanctuary_Deploy` while another edits deployment/config/auth files.
3. Do not ask for broad cleanup during live launch periods.
4. Do not mix design exploration and production deployment in the same task.
5. Do not rely on memory. Read the current files first.
6. Do not assume the OneDrive mirror is current.
7. Do not delete old folders until they are archived and the live system is tested.

## Practical Weekly Rhythm

### Monday / Planning

- Cursor reviews current priorities.
- Decide which folder each task belongs in.

### Build Sessions

- Codex handles narrow build tasks.
- Anti Gravity handles creative options.
- Cursor reviews and documents.

### Before Any Live Change

- Cursor checks changed files.
- Laura confirms.
- Deploy/test only after review.

### End of Week

- Write a short handoff note:
  - what changed
  - what is live
  - what is draft
  - what not to touch
  - next steps

## Final Rule

When in doubt, pause and ask Laura before changing anything.

The project can be cleaned and simplified over time. It does not need to be cleaned by disturbing the live system.
