const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const htmlFile = 'C:\\BTB\\Tech_and_Web\\New_Website\\Codex_Concept_Play\\sanctuary_livestreams.html';
const manifestFile = 'C:\\BTB\\Tech_and_Web\\Bunny_Upload\\sanctuary-live-studio-upload-manifest.csv';
const outboxDir = 'D:\\Beyond the Bend Yoga Live Classes\\Outbox';

// ===== Parse the manifest CSV =====
const csvText = fs.readFileSync(manifestFile, 'utf8');
const lines = csvText.trim().split('\n');
const headers = lines[0].replace(/\r$/, '').split('","').map(h => h.replace(/^"|"$/g, ''));

const allRows = lines.slice(1).map(line => {
  const vals = line.replace(/\r$/, '').split('","').map(v => v.replace(/^"|"$/g, ''));
  const row = {};
  headers.forEach((h, i) => row[h] = vals[i] || '');
  return row;
});

// ===== Only include uploaded or pending_replace rows that have Bunny IDs (existing cards) =====
const existingRows = allRows.filter(r =>
  (r.Status === 'uploaded' || r.Status === 'pending_replace') && r.BunnyVideoId
);

// New cards (pending, no Bunny ID yet)
const newRows = allRows.filter(r => r.Status === 'pending' && !r.BunnyVideoId);

// ===== Get durations for the 16 final voice mix videos =====
const finalVoiceMixFiles = allRows.filter(r =>
  r.Status === 'pending' || r.Status === 'pending_replace'
);

const durationCache = {};
for (const row of finalVoiceMixFiles) {
  try {
    const dur = execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${row.FullPath}"`,
      { timeout: 30000 }
    ).toString().trim();
    const mins = Math.round(parseFloat(dur) / 60);
    durationCache[row.FullPath] = mins;
    console.log(`Duration: ${row.Title} => ${mins} min`);
  } catch (e) {
    durationCache[row.FullPath] = 60;
    console.log(`Duration fallback: ${row.Title} => 60 min`);
  }
}

// ===== Helpers =====
const thumbCycle = {
  'Somatic Vinyasa': ['thumb_vinyasa.png', 'thumb_vinyasa_2.png', 'thumb_vinyasa_3.png', 'thumb_vinyasa_4.png'],
  'Restorative': ['thumb_restorative.png', 'thumb_restorative_2.png', 'thumb_restorative_3.png', 'thumb_restorative_4.png'],
  'Somatic Hatha': ['thumb_hatha.png', 'thumb_hatha_2.png', 'thumb_hatha_3.png', 'thumb_hatha_4.png']
};

const newThumbCycle = {
  'Somatic Vinyasa': ['thumb_vinyasa_5.png', 'thumb_vinyasa_6.png'],
  'Restorative': ['thumb_restorative_5.png', 'thumb_restorative_6.png'],
  'Somatic Hatha': ['thumb_hatha_5.png', 'thumb_hatha_6.png']
};

function parseDate(title) {
  // Title format: "2026-06-08 Monday Somatic Vinyasa 17-44-45"
  const match = title.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return new Date(0);
  return new Date(match[1], match[2] - 1, match[3]);
}

function formatDate(title) {
  const d = parseDate(title);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
  const day = String(d.getDate()).padStart(2, '0');
  return `${months[d.getMonth()]} ${day}, ${d.getFullYear()}`;
}

function getTimeOfDay(title) {
  const hourMatch = title.match(/(\d{2})-\d{2}-\d{2}$/);
  if (!hourMatch) return '';
  const hour = parseInt(hourMatch[1]);
  return hour < 12 ? 'Morning' : 'Evening';
}

function getDisplayTitle(classType) {
  if (classType === 'Somatic Vinyasa') return 'Monday Somatic Vinyasa';
  if (classType === 'Restorative') return 'Tuesday Restorative';
  if (classType === 'Somatic Hatha') return 'Wednesday Somatic Hatha';
  return classType;
}

function getAlt(classType) {
  if (classType === 'Somatic Vinyasa') return 'Somatic Vinyasa';
  if (classType === 'Restorative') return 'Restorative';
  if (classType === 'Somatic Hatha') return 'Somatic Hatha';
  return classType;
}

function getDuration(classType) {
  return classType === 'Restorative' ? 75 : 60;
}

// Check if there are multiple sessions on the same date for Restorative
function needsTimeLabel(rows, row) {
  const dateStr = row.Title.substring(0, 10);
  const sameDate = rows.filter(r => r.Title.substring(0, 10) === dateStr);
  return sameDate.length > 1;
}

function buildCard(videoId, thumbUrl, alt, duration, title, dateLabel, isNew, indent) {
  const newBadge = isNew ? '<div class="new-badge">New</div>' : '';
  return `${indent}<div class="video-card" id="card-${videoId}" data-video-id="${videoId}"><div class="video-thumbnail"><img src="${thumbUrl}" alt="${alt}" loading="lazy">${newBadge}<div class="completed-badge">✓ Completed</div><div class="play-overlay"><span class="play-icon">&#9658;</span></div><span class="duration-badge">${duration} min</span></div><div class="video-meta"><h3>${title}</h3><p>${dateLabel}</p></div></div>`;
}

// ===== Build sections =====
const indent = '                    ';

function buildSection(sectionTitle, classType, existingCards, newCards) {
  let html = '';
  html += `            <section class="video-row-section">\n`;
  html += `                <div class="row-header">\n`;
  html += `                    <h2>${sectionTitle}</h2>\n`;
  html += `                    <span class="view-all" style="cursor: default; text-decoration: none; font-size: 0.8rem;">Scroll to see more &rarr;</span>\n`;
  html += `                </div>\n`;
  html += `                <div class="horizontal-scroller">`;

  // Combine and sort all cards newest first
  const allCards = [];

  // New cards first (these are the 12 brand new ones + 4 replacement markers)
  for (const row of newCards) {
    allCards.push({ row, isNew: true });
  }

  // Existing cards
  for (const row of existingCards) {
    // Check if this existing card is being replaced by a final voice mix
    const isReplacement = allRows.some(r =>
      r.Status === 'pending_replace' && r.BunnyVideoId === row.BunnyVideoId
    );
    allCards.push({ row, isNew: isReplacement }); // Mark as "New" if being replaced with better audio
  }

  // Sort newest first by date
  allCards.sort((a, b) => parseDate(b.row.Title) - parseDate(a.row.Title));

  // Deduplicate: if a date+time already exists as a new card AND an existing card, keep the existing Bunny ID but mark as new
  // Actually, the existing cards for June 8, 9, 10 should keep their Bunny IDs but get a "New" badge
  // The truly new ones (pending) need placeholder IDs

  let thumbIdx = 0;
  const allRowsForSection = allCards.map(c => c.row);
  
  for (const card of allCards) {
    const row = card.row;
    const isNew = card.isNew;

    let thumbUrl;
    if (isNew && row.Status === 'pending') {
      // Brand new card, use new thumbnails
      const newThumbs = newThumbCycle[classType];
      thumbUrl = `assets/${newThumbs[thumbIdx % newThumbs.length]}`;
    } else {
      // Existing card or replacement, use CDN thumbnails
      const thumbs = thumbCycle[classType];
      thumbUrl = `https://btb-assets.b-cdn.net/assets/${thumbs[thumbIdx % thumbs.length]}`;
    }
    thumbIdx++;

    const videoId = row.BunnyVideoId || `PENDING-${row.Title.substring(0, 10)}`;
    const alt = getAlt(classType);
    const duration = durationCache[row.FullPath] || getDuration(classType);
    const title = getDisplayTitle(classType);
    
    let dateLabel = formatDate(row.Title);
    if (classType === 'Restorative' && needsTimeLabel(allRowsForSection, row)) {
      const tod = getTimeOfDay(row.Title);
      if (tod) dateLabel += ` (${tod})`;
    }

    html += buildCard(videoId, thumbUrl, alt, duration, title, dateLabel, isNew, indent);
  }

  html += `                </div>\n`;
  html += `            </section>`;
  return html;
}

// ===== Group rows by class type =====
function getRowsByType(rows, type) {
  return rows.filter(r => r.ClassType === type).sort((a, b) => parseDate(b.Title) - parseDate(a.Title));
}

const existingVinyasa = getRowsByType(existingRows, 'Somatic Vinyasa');
const existingRestorative = getRowsByType(existingRows, 'Restorative');
const existingHatha = getRowsByType(existingRows, 'Somatic Hatha');

const newVinyasa = getRowsByType(newRows, 'Somatic Vinyasa');
const newRestorative = getRowsByType(newRows, 'Restorative');
const newHatha = getRowsByType(newRows, 'Somatic Hatha');

console.log(`\nExisting: Vinyasa=${existingVinyasa.length}, Restorative=${existingRestorative.length}, Hatha=${existingHatha.length}`);
console.log(`New: Vinyasa=${newVinyasa.length}, Restorative=${newRestorative.length}, Hatha=${newHatha.length}`);

// ===== Build all three sections =====
const vinyasaSection = buildSection('Somatic Vinyasa', 'Somatic Vinyasa', existingVinyasa, newVinyasa);
const restorativeSection = buildSection('Restorative', 'Restorative', existingRestorative, newRestorative);
const hathaSection = buildSection('Somatic Hatha', 'Somatic Hatha', existingHatha, newHatha);

// ===== Read the damaged HTML and rebuild =====
let html = fs.readFileSync(htmlFile, 'utf8');

// Find the break point: after the greeting-subtitle line
const breakMarker = '<p class="greeting-subtitle">Unedited recordings of our live studio sessions. Real, gentle, and grounded.</p>';
const breakIdx = html.indexOf(breakMarker);

if (breakIdx === -1) {
  console.error('Could not find break marker in HTML!');
  process.exit(1);
}

// Find the end of the break marker line
const afterBreak = breakIdx + breakMarker.length;

// Find the modal section (which is intact)
const modalMarker = '    <!-- Video Modal Overlay -->';
const modalIdx = html.indexOf(modalMarker);

if (modalIdx === -1) {
  console.error('Could not find modal marker in HTML!');
  process.exit(1);
}

// Reconstruct the file
const beforeBreak = html.substring(0, afterBreak);
const afterModal = html.substring(modalIdx);

const newContent = beforeBreak + '\n' +
  '                </div>\n' +
  '            </header>' +
  vinyasaSection + '\n' +
  restorativeSection + '\n' +
  hathaSection + '\n' +
  '        </main>\n' +
  '    </div>\n\n' +
  afterModal;

fs.writeFileSync(htmlFile, newContent, 'utf8');
console.log('\n✅ HTML file rebuilt successfully!');
console.log(`Total file size: ${newContent.length} bytes`);
