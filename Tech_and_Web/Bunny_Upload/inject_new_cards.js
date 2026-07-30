const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const outboxDir = 'D:\\Beyond the Bend Yoga Live Classes\\Outbox';
const htmlFile = 'C:\\BTB\\Tech_and_Web\\New_Website\\Codex_Concept_Play\\sanctuary_livestreams.html';

const videos = {
  '2026-06-08 Monday Somatic Vinyasa 17-44-45 (edited) (final voice mix).mp4': { type: 'vinyasa', date: 'June 08, 2026', title: 'Monday Somatic Vinyasa', id: 'ffb6c597-def3-439d-bc31-4674c52b7520', isNewCard: false },
  '2026-06-09 Tuesday Restorative 09-38-09 (edited) (final voice mix).mp4': { type: 'restorative', date: 'June 09, 2026 (Morning)', title: 'Tuesday Restorative', id: '490ba9c0-26ec-434f-8520-f41e339ec0bc', isNewCard: false },
  '2026-06-09 Tuesday Restorative 17-43-19 (edited) (final voice mix).mp4': { type: 'restorative', date: 'June 09, 2026 (Evening)', title: 'Tuesday Restorative', id: '9ed0102b-e93b-4fc9-903e-dace00ffa1c1', isNewCard: false },
  '2026-06-10 Wednesday Somatikatha 09-45-12 (edited) (final voice mix).mp4': { type: 'hatha', date: 'June 10, 2026', title: 'Wednesday Somatic Hatha', id: 'ee5871fd-7b33-427e-a762-a4eb661433d9', isNewCard: false },
  '2026-06-15 Monday Somatic Vinyasa 17-46-26 (edited) (final voice mix).mp4': { type: 'vinyasa', date: 'June 15, 2026', title: 'Monday Somatic Vinyasa', id: 'PENDING-june-15', isNewCard: true },
  '2026-06-16 Tuesday Restorative 09-50-17 (edited) (final voice mix).mp4': { type: 'restorative', date: 'June 16, 2026 (Morning)', title: 'Tuesday Restorative', id: 'PENDING-june-16-am', isNewCard: true },
  '2026-06-16 Tuesday Restorative 17-49-47 (edited) (final voice mix).mp4': { type: 'restorative', date: 'June 16, 2026 (Evening)', title: 'Tuesday Restorative', id: 'PENDING-june-16-pm', isNewCard: true },
  '2026-06-17 Wednesday Somatikatha 09-54-41 (edited) (final voice mix).mp4': { type: 'hatha', date: 'June 17, 2026', title: 'Wednesday Somatic Hatha', id: 'PENDING-june-17', isNewCard: true },
  '2026-06-22 Monday Somatic Vinyasa 17-43-33 (edited) (final voice mix).mp4': { type: 'vinyasa', date: 'June 22, 2026', title: 'Monday Somatic Vinyasa', id: 'PENDING-june-22', isNewCard: true },
  '2026-06-23 Tuesday Restorative 09-49-54 (edited) (final voice mix).mp4': { type: 'restorative', date: 'June 23, 2026 (Morning)', title: 'Tuesday Restorative', id: 'PENDING-june-23-am', isNewCard: true },
  '2026-06-23 Tuesday Restorative 17-50-48 (edited) (final voice mix).mp4': { type: 'restorative', date: 'June 23, 2026 (Evening)', title: 'Tuesday Restorative', id: 'PENDING-june-23-pm', isNewCard: true },
  '2026-06-24 Wednesday Somatikatha 09-39-55 (edited) (final voice mix).mp4': { type: 'hatha', date: 'June 24, 2026', title: 'Wednesday Somatic Hatha', id: 'PENDING-june-24', isNewCard: true },
  '2026-07-01 Wednesday Somatikatha 09-48-58 (edited) (final voice mix).mp4': { type: 'hatha', date: 'July 01, 2026', title: 'Wednesday Somatic Hatha', id: 'PENDING-july-01', isNewCard: true },
  '2026-07-07 Tuesday Restorative 17-53-38 (edited) (final voice mix).mp4': { type: 'restorative', date: 'July 07, 2026 (Evening)', title: 'Tuesday Restorative', id: 'PENDING-july-07-pm', isNewCard: true },
  '2026-07-08 Wednesday Somatikatha 09-51-36 (edited) (final voice mix).mp4': { type: 'hatha', date: 'July 08, 2026', title: 'Wednesday Somatic Hatha', id: 'PENDING-july-08', isNewCard: true },
  '2026-07-15 Wednesday Somatikatha 09-34-50 (edited) (final voice mix).mp4': { type: 'hatha', date: 'July 15, 2026', title: 'Wednesday Somatic Hatha', id: 'PENDING-july-15', isNewCard: true }
};

const vinyasaCards = [];
const restorativeCards = [];
const hathaCards = [];

let vinyasaThumbIdx = 5;
let restorativeThumbIdx = 5;
let hathaThumbIdx = 5;

for (const [filename, info] of Object.entries(videos)) {
  const filePath = path.join(outboxDir, filename);
  try {
    const durationStr = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`).toString().trim();
    info.duration = Math.round(parseFloat(durationStr));
    console.log(`${filename}: ${info.duration} min`);
  } catch (err) {
    console.error(`Error getting duration for ${filename}:`, err.message);
    info.duration = 60; // fallback
  }
  
  if (info.isNewCard) {
    let thumbUrl = '';
    if (info.type === 'vinyasa') {
      thumbUrl = `assets/thumb_vinyasa_${vinyasaThumbIdx}.png`;
      vinyasaThumbIdx = vinyasaThumbIdx === 5 ? 6 : 5;
      vinyasaCards.unshift(info);
    } else if (info.type === 'restorative') {
      thumbUrl = `assets/thumb_restorative_${restorativeThumbIdx}.png`;
      restorativeThumbIdx = restorativeThumbIdx === 5 ? 6 : 5;
      restorativeCards.unshift(info);
    } else if (info.type === 'hatha') {
      thumbUrl = `assets/thumb_hatha_${hathaThumbIdx}.png`;
      hathaThumbIdx = hathaThumbIdx === 5 ? 6 : 5;
      hathaCards.unshift(info);
    }
    info.thumbUrl = thumbUrl;
  }
}

const createCardHtml = (info) => {
    return `                    <div class="video-card" id="card-${info.id}" data-video-id="${info.id}"><div class="video-thumbnail"><img src="${info.thumbUrl}" alt="${info.title}" loading="lazy"><div class="new-badge">New</div><div class="completed-badge">✓ Completed</div><div class="play-overlay"><span class="play-icon">&#9658;</span></div><span class="duration-badge">${info.duration} min</span></div><div class="video-meta"><h3>${info.title}</h3><p>${info.date}</p></div></div>\n`;
};

const vinyasaHtml = vinyasaCards.map(createCardHtml).join('');
const restorativeHtml = restorativeCards.map(createCardHtml).join('');
const hathaHtml = hathaCards.map(createCardHtml).join('');

let htmlContent = fs.readFileSync(htmlFile, 'utf8');

const existingIds = [
  'ffb6c597-def3-439d-bc31-4674c52b7520',
  '490ba9c0-26ec-434f-8520-f41e339ec0bc',
  '9ed0102b-e93b-4fc9-903e-dace00ffa1c1',
  'ee5871fd-7b33-427e-a762-a4eb661433d9'
];

for (const id of existingIds) {
  const regex = new RegExp(`(id="card-${id}"[\\s\\S]*?<img [^>]+>)`);
  htmlContent = htmlContent.replace(regex, `$1\n                            <div class="new-badge">New</div>`);
}

const vinyasaSectionRegex = /(<h2[^>]*>Somatic Vinyasa<\/h2>[\s\S]*?<div class="horizontal-scroller">)/;
htmlContent = htmlContent.replace(vinyasaSectionRegex, `$1\n${vinyasaHtml}`);

const restorativeSectionRegex = /(<h2[^>]*>Restorative<\/h2>[\s\S]*?<div class="horizontal-scroller">)/;
htmlContent = htmlContent.replace(restorativeSectionRegex, `$1\n${restorativeHtml}`);

const hathaSectionRegex = /(<h2[^>]*>Somatic Hatha<\/h2>[\s\S]*?<div class="horizontal-scroller">)/;
htmlContent = htmlContent.replace(hathaSectionRegex, `$1\n${hathaHtml}`);

fs.writeFileSync(htmlFile, htmlContent, 'utf8');
console.log('HTML updated successfully!');
