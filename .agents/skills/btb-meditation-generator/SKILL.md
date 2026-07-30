---
name: btb-meditation-generator
description: >
  Fully automates the production and publication of Beyond the Bend Sanctuary Meditations.
  This skill handles the new audio-first approach: boosting voice, looping background music,
  generating an MP4 for Opus Clip (Instagram), rendering an MP3 for the Sanctuary, generating
  mature cover art, and perfectly formatting the frontend HTML to publish the new audio card.
---

# BTB Sanctuary Meditation Publisher

## Overview
This skill is the single source of truth for generating and publishing new Meditation content for the Sanctuary. It guarantees that audio is mixed properly, cover art is beautiful and demographically appropriate, and the HTML is injected flawlessly into the website without breaking the UI or layouts.

## Dependencies
- `ffmpeg` (for audio processing, boosting, looping, and video generation)

## Workflow

When the user asks you to process a new meditation audio file, follow these precise steps:

### 1. Locate the Raw Files
Find the raw voice audio and (if provided) the background music in `C:\BTB\Tech_and_Web\Video-Processor\raw_footage`. 
- *Note: If the user provides a file that already has music mixed in, you can skip steps 2 and 3.*

### 2. Audio Processing & Mixing (FFMPEG)
If the audio is just raw voice:
- Boost the voice volume by 3.0x (`volume=3.0`).
- Loop the background music to match the exact duration of the voice file.
- Mix them together using ffmpeg.

### 3. Generate Opus Clip Video (For Social Media)
The user explicitly wants an MP4 video version of every new meditation purely for social media marketing (to drop into Opus Clip).
- Combine the mixed audio with a looping scenic background video (e.g. ocean waves).
- Save this `.mp4` into the `Output` folder for her to use.

### 4. Extract Sanctuary MP3
The Sanctuary website now uses a custom, highly-styled Audio Player instead of video for the actual meditations.
- Convert the final mixed audio into a high-quality `.mp3` file (192k bitrate).
- Save it to `C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play\assets`.
- Check the final duration of the file in minutes (e.g., using `ffprobe`).

### 5. Generate Thumbnail Art
Use the `generate_image` tool to create cover art for the audio player.
- **Critical Guidelines:** Always ensure the aesthetic is serene, peaceful, and warm (earthy tones: pale pink, soft clay, sage green). 
- If depicting a person, the subject MUST be 50+ years old (e.g., silver/grey hair, mature features) as this is Laura's target market. No young models!
- Save the final image to `assets/{meditation_name}_thumb.png`.

### 6. Inject the HTML Audio Card
You must use a Node script (`fs.readFileSync` and `fs.writeFileSync`) to safely inject the new meditation into `C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play\sanctuary_meditations.html` to avoid PowerShell string-escaping bugs.

Append a new `<div class="video-card">` to the `.video-grid` list, maintaining this exact structure:
```html
<div class="video-card" id="card-{unique_id}-audio" data-audio-file="assets/{Meditation_Name}.mp3" data-title="{Title}" data-subtitle="Guided Practice" data-cover="assets/{thumbnail_name}.png">
    <div class="video-thumbnail">
        <img src="assets/{thumbnail_name}.png" alt="{Title}" loading="lazy">
        <div class="new-badge">New</div>
        <div class="completed-badge">✓ Completed</div>
        <div class="play-overlay"><span class="play-icon">&#9658;</span></div>
        <span class="duration-badge">{Duration} min</span>
    </div>
    <div class="video-meta">
        <h3>{Title}</h3>
        <p>Guided Practice</p>
    </div>
</div>
```
*(Remember to put the `new-badge` on the new card, and if you want to be extra helpful, you can remove it from older cards).*

### 7. Report Success
Inform the user that the MP4 is ready for Opus Clip, the MP3 is live on the Sanctuary, the thumbnail has been generated honoring the 50+ demographic, and the website layout is perfectly intact. Tell them to refresh the page to listen!
