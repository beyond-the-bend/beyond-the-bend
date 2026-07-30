// Remove duplicate cards for the 4 overlap IDs.
// These IDs appear twice — the second occurrence (the old-duration duplicate) should be removed.
const fs = require('fs');
const html = fs.readFileSync('C:\\BTB\\Tech_and_Web\\New_Website\\Codex_Concept_Play\\sanctuary_livestreams.html', 'utf8');

const dupeIds = [
  'ffb6c597-def3-439d-bc31-4674c52b7520',  // June 8 Vinyasa
  '490ba9c0-26ec-434f-8520-f41e339ec0bc',  // June 9 Restorative AM
  '9ed0102b-e93b-4fc9-903e-dace00ffa1c1',  // June 9 Restorative PM
  'ee5871fd-7b33-427e-a762-a4eb661433d9'   // June 10 Hatha
];

let fixed = html;
for (const id of dupeIds) {
  // Match a full video-card div for this ID
  const cardRegex = new RegExp(
    '\\s*<div class="video-card" id="card-' + id + '" data-video-id="' + id + '">[\\s\\S]*?</div>\\s*</div>\\s*</div>',
    'g'
  );
  const matches = [...fixed.matchAll(cardRegex)];
  if (matches.length >= 2) {
    // Remove the SECOND occurrence (old version with wrong duration)
    const secondMatch = matches[1];
    fixed = fixed.slice(0, secondMatch.index) + fixed.slice(secondMatch.index + secondMatch[0].length);
    console.log(`Removed duplicate for ${id}`);
  } else {
    console.log(`Only ${matches.length} occurrence(s) for ${id} - skipping`);
  }
}

fs.writeFileSync('C:\\BTB\\Tech_and_Web\\New_Website\\Codex_Concept_Play\\sanctuary_livestreams.html', fixed, 'utf8');
console.log('Done. Duplicates removed.');

// Verify
const check = fs.readFileSync('C:\\BTB\\Tech_and_Web\\New_Website\\Codex_Concept_Play\\sanctuary_livestreams.html', 'utf8');
const newBadges = (check.match(/new-badge/g) || []).length;
const pendingIds = (check.match(/PENDING-/g) || []).length;
console.log(`New badges: ${newBadges}, Pending IDs: ${pendingIds}`);
