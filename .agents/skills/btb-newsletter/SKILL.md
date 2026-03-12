---
name: BTB Newsletter Creator
description: Creates a fully formatted Beyond the Bend Yoga newsletter in HTML, ready to paste into GoHighLevel. Uses the correct masthead banner template, brand colours, and section structure. Eliminates the back-and-forth correction cycle.
---

# Beyond the Bend Yoga — Newsletter Creation Skill

## Overview
This skill produces a finished, paste-ready HTML newsletter for Laura Harvey / Beyond the Bend Yoga. The "Seeing It Again" newsletter (`c:\BTB\newsletters\NEWSLETTER_SEEING_IT_AGAIN.html`) is the gold-standard reference. Always follow that file's structure exactly.

---

## Step 1 — Gather Content From the User

Before writing a single line of HTML, confirm you have ALL of the following:

1. **Personal intro** — The short 2–3 paragraph opening note from Laura (with contractions, warm tone, first person).
2. **Wellness Wisdom title** — The name of this week's essay (e.g. "Seeing It Again").
3. **Wellness Wisdom body** — The full essay text. Use contractions exactly as Laura writes them. Do NOT strip contractions or replace them with formal language.
4. **A photo/image** — Ask Laura if she has an image, OR generate one that fits the essay's mood. Place it between the "This Week's Wellness Wisdom" heading and the essay subtitle.
5. **Practice of the Week** — Title and body text.
6. **From the Studio section** (if applicable) — Class schedule, pricing, registration links, and any new class spotlight.
7. **A Closing Thought** — Short, poetic closing lines before the final sign-off.

> **Do NOT start writing the HTML until all sections are confirmed.** Ask for missing pieces one at a time rather than guessing.

---

## Step 2 — The Correct Template Structure

Use this EXACT structure. Do not improvise a different layout.

```
1. MASTHEAD BANNER (logo + "Reflections from / Beyond the Bend")
2. PERSONAL INTRO
3. WELLNESS WISDOM SECTION
   - h2: "This Week's Wellness Wisdom"
   - IMAGE (full width, rounded corners)
   - h3: Essay title (italic)
   - byline: "By Laura Harvey | Beyond the Bend Yoga"
   - Essay body paragraphs
4. FROM THE STUDIO (if applicable — place IMMEDIATELY after Wellness Wisdom)
   - Intro paragraph
   - Class schedule table
   - Sage green CTA button → beyondthebendyoga.ca/classes
   - New class spotlight card (dark forest green CTA button)
5. PRACTICE OF THE WEEK
6. A CLOSING THOUGHT + sign-off
7. FOOTER
```

---

## Step 3 — Critical Brand & Template Rules

### Logo / Masthead
- **Logo URL:** `https://storage.googleapis.com/msgsndr/t19sOv208p64ldeUjJug/media/697996aad119a57c1575bb7d.png`
- **Masthead text:**
  ```
  Reflections from        ← italic, 28px
  BEYOND THE BEND         ← uppercase, 32px, bold, sage green border top/bottom
  ```
- Header background: `#faf0f0`
- Header bottom border: `4px solid #556b2f`

### Brand Colours
| Name | Hex |
|------|-----|
| Forest green (headings, borders) | `#556b2f` |
| Sage green (buttons, accents) | `#A8B5A2` |
| Dark forest (secondary button) | `#3F4A3C` |
| Warm cream (highlight sections) | `#fcfbf9` |
| Light sage bg | `#eef2eb` or `#f4f7f2` |
| Body text | `#4a4a4a` |
| Page background | `#f7f7f5` |

### Typography
- **Headings:** Playfair Display, serif
- **Body:** Lato, Helvetica, Arial, sans-serif
- **h2 size:** 26px, color `#556b2f`, weight 600
- **h3 size:** 22px, color `#78866b`, weight 400, italic
- **Body text:** 16px, line-height 1.8
- Import fonts: `@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap');`

### Buttons
- **Primary (sage green):** `background-color: #A8B5A2; color: white; padding: 15px 30px; border-radius: 50px;`
- **Secondary (forest green):** `background-color: #3F4A3C; color: #F7F4EF; padding: 13px 28px; border-radius: 50px;`

### Class Schedule Table
- Each class gets its own `<tr>` row
- Day name in `#556b2f` bold
- Rows separated by `border-bottom: 1px solid #d8e4d0`
- New classes get a `<span class="new-badge">NEW</span>` pill (bg `#556b2f`, white text, border-radius 10px) — only on genuinely NEW classes
- Wednesday evenings Embodied Flow = NEW. Wednesday mornings Somatic Hatha = NOT new.

### GoHighLevel Merge Tags
- First name: `{{contact.first_name}}`
- Unsubscribe: `{{unsubscribe_link}}`

---

## Step 4 — Images

1. If Laura provides an image URL → use it directly.
2. If Laura uploads to GHL → she will paste the CDN URL (format: `https://assets.cdn.filesafe.space/t19sOv208p64ldeUjJug/media/[id].png`). Swap it into the `src` attribute.
3. If no image yet → generate one using `generate_image` that matches the essay's mood (calm, earthy, soft light, unhurried). Save a copy to `C:\BTB\newsletters\` with a descriptive name.
4. Image placement: **between** the `<h2>This Week's Wellness Wisdom</h2>` and the `<h3>[Essay Title]</h3>`.

---

## Step 5 — Writing Style Rules

- **Contractions:** Always preserve Laura's contractions (it's, I'm, we're, don't, etc.). Never replace with formal equivalents.
- **No em-dashes:** Laura prefers not to use — dashes in her copy. Use a comma or reword instead.
- **Tone:** Warm, unhurried, wise friend. First person. Never corporate.
- **The essay** should flow as written by Laura. Do not rewrite or "clean up" her voice.

---

## Step 6 — Output & File Naming

- Save the finished file to: `C:\BTB\newsletters\NEWSLETTER_[TOPIC_NAME].html`
- Use ALL_CAPS with underscores for the filename.
- After saving, provide the direct file link so Laura can preview it.
- Remind Laura to **select all → copy → paste into GHL Custom HTML block**.

---

## Reference File

The gold-standard completed newsletter is:
`c:\BTB\newsletters\NEWSLETTER_SEEING_IT_AGAIN.html`

When in doubt, open that file and match its structure exactly.

---

## Common Mistakes to Avoid

| ❌ Wrong | ✅ Right |
|---------|---------|
| Using the old table-based layout (NEWSLETTER_SCORIA) | Use the masthead/div layout from NEWSLETTER_SEEING_IT_AGAIN |
| Replacing contractions with formal language | Keep Laura's voice exactly as written |
| Adding NEW badge to existing classes | Only NEW classes get the badge |
| Forgetting the byline under the essay title | Always include "By Laura Harvey | Beyond the Bend Yoga" |
| Building HTML before all content is confirmed | Gather ALL sections first, then build once |
| Saving the image only to the Antigravity brain folder | Also copy to `C:\BTB\newsletters\` |
