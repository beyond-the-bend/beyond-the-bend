---
name: BTB Course Creator
description: Builds stunning, SPA-style digital courses that match the Beyond the Bend newsletter aesthetic. Always creates them in the dedicated C:\BTB\Courses\ directory to prevent confusion.
---

# BTB Course Creator Skill

The Beyond the Bend (BTB) digital courses are NOT built inside GoHighLevel or complex Learning Management Systems. They are simple, stunning, single-page standalone HTML applications that function like a beautiful digital book. They use Javascript to gracefully fade between chapters.

## 1. Directory Rules (CRITICAL)
To prevent confusion between Cursor, Claude, and Gemini, **ALL new courses must be created inside the dedicated top-level Courses folder.**
**Required Path:** \`c:\\BTB\\Courses\\<Your_Course_Name>\\\`
Do NOT save courses inside `Tech_and_Web` or `newsletters`. 

Each course should have its own folder containing:
- \`portal.html\` (The actual course page)
- \`assets/\` (A subfolder for the course's specific images, PDFs, and MP3s)

## 2. Design Aesthetic
- **Background:** The soft sales-page gradient \`linear-gradient(135deg, #f0f4ee 0%, #e8ddd4 50%, #e8c4c4 100%)\`
- **Reading Column:** A neat, centered white box (\`max-width: 680px\`) mimicking her famous newsletter aesthetic.
- **Colors:**
  - Dark Forest Text: \`#3F4A3C\`
  - Sage/Olive Accent: \`#6B8063\`
  - Light Sage Accent: \`#A8B5A2\`
  - Blush Rose (buttons): \`#cbb4af\`
- **Typography:** Playfair Display for headings & quotes, Lato for body copy (1.8x line height).

## 3. How to Execute This Skill
When the user asks you to create a new course:
1. Identify the course title, number of modules/chapters, and the text for each module.
2. View the \`course-template.html\` file located right next to this \`SKILL.md\` file in the \`.agents\\skills\\btb-course-creator\\\` folder.
3. Use that exact HTML/CSS/JS architecture as your base.
4. Replace the template variables (e.g. \`{COURSE_TITLE}\`, \`{LESSON_TITLE}\`, \`{CONTENT}\`) with the new course content.
5. Save the finished file to \`C:\\BTB\\Courses\\<Course_Name>\\portal.html\`.
6. Ensure the JavaScript router properly scales up to the new \`totalLessons\` count.

Do NOT deviate from this visual standard unless explicitly requested. This preserves the tranquil, deeply branded BTB experience.
