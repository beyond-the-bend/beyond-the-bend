# 🎥 THE SANCTUARY: VIDEO WORKFLOW GUIDE
**Beyond the Bend Yoga**

This guide covers the end-to-end process of creating, editing, and branding your 1-hour class recordings using **Canva, Descript, and your Custom Video Tool.**

---

## phase 1: The Canva Designs (One-Time Setup)
Create your branded Intros and Outros. Since these are only 5-15 seconds, Canva is the fastest way to get a beautiful look.

### Brand Specs
- **Fonts:** Playfair Display (Headlines), Lato (Body/Instruction text).
- **Colors:** Sage (#A8B5A2), Warm Sand (#E6D5C7), or Soft Blush (#E8C4C4).
- **Rule:** No dashes (—). Use a vertical bar (|) or just a space.
- **Animations:** Use "Fade" or "Dissolve" for a calm, unhurried transition.

### The Intro Layout (3 Scenes)
*   **Scene 1 (5s):** Logo + [Class Style Name] (e.g., *Restorative Yoga*).
*   **Scene 2 (5s):** "Take a quiet moment to gather what you need: a blanket, a pillow, or blocks. Choose anything that helps you feel supported."
*   **Scene 3 (5s):** "If music helps you settle, feel free to play a favorite song. To begin, find a lying down position. There is nothing to fix. We will begin in a moment."

### Exporting
1.  Export as **MP4** (1080p).
2.  Name them clearly: `Restorative_Intro.mp4`, `Gentle_Hatha_Intro.mp4`, etc.
3.  Place them in: `C:\BTB\Video-Processor\assets_intro`

---

## phase 2: The Descript Edit (For Every Class)
This is where you do the "surgical" editing to make the class high-quality and unhurried.

1.  **Import Raw Footage:** Upload your 75-minute class.
2.  **Filler Word Removal:** Use the "Remove Filler Words" tool to zap the "ums" and "ahs."
3.  **Condensing:** Trim the 75 minutes down to a clean **60 minutes**. 
    - *Tip: Look for long pauses or repetitive instructions to trim safely.*
4.  **Export:** Export as a single **MP4**. Name it by date: `2025-02-21_SomaticVinyasa.mp4`.
5.  **Move:** Place this file in: `C:\BTB\Video-Processor\raw_footage`

---

## phase 3: The "Magic" Stitch (FFmpeg Tool)
Now we glue the branding onto the edited class without having to wait for another long render.

1.  **Open the Folder:** `C:\BTB\Video-Processor`
2.  **Run the Tool:** Right-click **`Process-Videos.ps1`** and choose **"Run with PowerShell."**
3.  **Select Your Intro:** 
    - The screen will show your 4 intros (Restorative, Hatha, etc.).
    - Type the **number** of the intro you want and hit **Enter**.
4.  **Select Your Outro:** (Do the same for your Outro file).
5.  **Wait:** In about 60 seconds, the "stitch" will be done.

---

## phase 4: The Final Review
1.  **Find Your Video:** Go to `C:\BTB\Video-Processor\finished_videos`.
2.  **Verify:** Open the video and check:
    - Does the correct intro play?
    - Does it transition smoothly to your footage?
    - Is the audio clear?
3.  **Upload:** Upload to the **GHL Membership Area**.

---

### Quick Troubleshooting
- **Failing?** If the script fails, it is usually because the Intro and Class video are different sizes (e.g., one is Square and one is Widescreen). Ensure both are exported as 1080p (1920x1080).
- **New Intro?** If you create a new style of class, just drop the new Intro MP4 into `assets_intro` and the script will automatically add it to the list next time you run it.

*With warmth and gratitude,*
*Laura ❤️*
