# BTB Active System Map

Last updated: July 14, 2026

Purpose: give Laura and any AI assistant a safe, current map of what is active, what is reference-only, and what should not be touched casually.

This document is documentation only. It does not move, rename, delete, or change production files.

## Core Principle

The Sanctuary is live and working. Stripe/subscription access is working. People have signed up.

Do not reorganize the live system just to make the folders look cleaner.

## Current Source of Truth

Current working project:

`C:\BTB`

The old OneDrive mirror is not current:

`C:\Users\coach\OneDrive\Documents\New folder (5)\beyond-the-bend`

Use the OneDrive mirror only as historical/reference material unless Laura explicitly asks otherwise.

## High-Level System Areas

### 1. Live Sanctuary / Membership System

Primary folder:

`C:\BTB\Tech_and_Web\Sanctuary_Deploy`

Role:

- live gated Sanctuary deployment
- Stripe checkout/subscription flow
- login/sign-in/account access code
- Vercel deployment configuration
- API endpoints for auth, checkout, portal return, subscription management, logout

Status:

- active production system
- do not move or clean up without explicit approval

Do not casually edit:

- `api\`
- `login.html`
- `signin.html`
- `vercel.json`
- `netlify.toml`
- `.vercel\`
- `.env.local`
- package/deployment files
- any auth, Stripe, JWT, checkout, or subscription code

### 2. New Public Website / Design Workspace

Primary folder:

`C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play`

Role:

- current public website design/build direction
- evolved from Cursor's original concept
- Laura-approved direction from June 23, 2026
- includes homepage and Sanctuary/public-facing page concepts

Status:

- active working design area
- safer than `Sanctuary_Deploy` for website design edits
- still should be edited intentionally, not broadly cleaned

Related start-here file:

`C:\BTB\Tech_and_Web\New_Website\START_HERE.md`

### 3. Original Cursor Concept

Folder:

`C:\BTB\Tech_and_Web\New_Website\Cursor_Concept`

Role:

- original Cursor one-page concept
- design reference only
- contains early homepage, styles, and tree/bend logo concept

Status:

- preserve as reference
- do not treat as current production
- do not delete just because newer work exists

### 4. Earlier Website Builds and Source Material

Folders:

- `C:\BTB\Tech_and_Web\website`
- `C:\BTB\Tech_and_Web\New_Website\Active_Build`
- `C:\BTB\Tech_and_Web\New_Website\Reference_From_GoHighLevel`

Role:

- older pages
- GoHighLevel reference exports
- historical design/source material
- content that may still be useful while rebuilding independent pages

Status:

- reference/source material
- do not assume these are safe to delete
- some files may still be connected to old previews, workflows, or copied content

### 5. GoHighLevel Material

Primary folder:

`C:\BTB\Tech_and_Web\GoHighLevel_Custom_HTML`

Role:

- GHL paste-ready HTML
- older custom HTML material
- campaign/workshop/custom-page references

Status:

- transition/reference system
- Laura is moving away from GHL, but do not delete until all dependencies are confirmed replaced

### 6. Email / CRM Transition

Current business direction:

- Kit was tried but feels too complicated
- Laura prefers MailerLite because it feels simpler and cleaner
- GoHighLevel is likely temporary unless specific dependencies remain

Files/folders may reference:

- GoHighLevel
- Kit
- MailerLite planning still to be created

Status:

- system decision in transition
- do not rip out GHL or Kit references until automations, forms, and lists are confirmed migrated

### 7. Content and Marketing

Primary folders:

- `C:\BTB\Content`
- `C:\BTB\Content\newsletters`
- `C:\BTB\Content\Substack`
- `C:\BTB\Content\Workshops`
- `C:\BTB\Content\Private_Somatic_Work`

Role:

- newsletters
- Substack essays
- workshop copy/campaigns
- private somatic work content
- web blocks and announcement drafts

Status:

- active content area
- okay to add new drafts here when asked
- do not reorganize old newsletter/workshop files without a separate cleanup plan

### 8. Brand Assets

Primary folder:

`C:\BTB\Brand_Assets`

Role:

- logos
- Laura photos
- brand voice
- campaign graphics
- visual identity references

Status:

- active asset/reference area
- new images of Laura should likely go here first, then be copied into website-specific asset folders when used

### 9. Bunny / Video / Media Pipeline

Primary areas:

- `C:\BTB\Tech_and_Web\Bunny_Upload`
- `C:\BTB\Tech_and_Web\Video-Processor`
- `C:\BTB\Tech_and_Web\Remotion-Video-Processor`

Role:

- video processing
- upload manifests/logs
- Bunny CDN media pipeline

Status:

- do not clean up automatically
- logs and manifests may be useful for diagnosing uploaded Sanctuary media

### 10. Agent Skills and Automation

Primary folders:

- `C:\BTB\.agents`
- `C:\BTB\Tech_and_Web\Newsletter_Automation`
- `C:\BTB\Tech_and_Web\Scripts`
- `C:\BTB\Tech_and_Web\ghl-mcp`

Role:

- agent-specific skills
- newsletter conversion automation
- GoHighLevel/MCP tooling
- scripts and local helpers

Status:

- advanced/support tooling
- do not edit unless the task is specifically about automations or agent setup

## Known Drift / Confusion Points

These are not problems to fix immediately. They are things to be aware of.

1. There are multiple website folders.
   - This is why agents must be told the exact folder before editing.

2. Some older docs still say `Active_Build` is the current website area.
   - Current newer guidance points to `Codex_Concept_Play`.

3. `Sanctuary_Deploy` and `Codex_Concept_Play` may contain similar pages.
   - Production/member-access work belongs in `Sanctuary_Deploy`.
   - Design/public-site exploration belongs in `Codex_Concept_Play`.

4. Some local assets may be missing or referenced from other systems.
   - Do not assume broken local preview images mean production is broken.

5. The old OneDrive folder is behind the current `C:\BTB` project.
   - Do not copy from OneDrive into `C:\BTB` without checking first.

## Active / Reference / Do Not Touch Summary

### Active

- `C:\BTB\Tech_and_Web\Sanctuary_Deploy`
- `C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play`
- `C:\BTB\Content`
- `C:\BTB\Brand_Assets`

### Reference / Source Material

- `C:\BTB\Tech_and_Web\New_Website\Cursor_Concept`
- `C:\BTB\Tech_and_Web\New_Website\Active_Build`
- `C:\BTB\Tech_and_Web\New_Website\Reference_From_GoHighLevel`
- `C:\BTB\Tech_and_Web\website`
- old OneDrive `beyond-the-bend` mirror

### Do Not Touch Without Explicit Permission

- `C:\BTB\Tech_and_Web\Sanctuary_Deploy`
- any `.env` or `.env.local`
- Stripe/API/auth/JWT/Vercel/Netlify files
- member login or checkout flows
- Bunny/CDN keys, upload logs, and deployment configuration

## Recommended Safe Cleanup Approach

Do not clean by moving files yet.

Safe cleanup sequence:

1. Document active vs reference folders.
2. Label stale docs.
3. Create an archive proposal.
4. Back up the whole project.
5. Move only non-production files.
6. Test the live Sanctuary after any approved cleanup.

Until then, prefer documentation over reorganization.
