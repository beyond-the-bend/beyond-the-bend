---
name: BTB GoHighLevel Link Preservation
description: Ensures local .html filenames are preserved in navigation links and never prematurely converted to slugs.
---

# BTB GoHighLevel Link Preservation

When creating or modifying navigation links across Beyond the Bend web projects:

1. **NEVER prematurely convert local filenames to slugs**. Do not change links like `sanctuary_courses.html` to `/courses` or `courses` on the assumption that it is better for GoHighLevel.
2. **Preserve exact local file paths**. Keep the links exactly matching the names of the files on disk (e.g., `href="sanctuary_courses.html"`). This ensures the files remain interconnected and testable on a local computer.
3. **GoHighLevel compatibility**. When the user uploads these files to GoHighLevel, they will configure the GoHighLevel URL paths to exactly match the filenames we preserved (e.g., they will set the step path to `sanctuary_courses.html`).
4. **Exception**. Only change links to slugs IF the user explicitly provides a confirmed, live GoHighLevel URL path and asks you to change it. Otherwise, assume local preview mode.
