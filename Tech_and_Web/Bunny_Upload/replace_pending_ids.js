// Replace all PENDING-xxxx placeholder IDs in the HTML with real Bunny video IDs
const fs = require('fs');

const htmlFile = 'C:\\BTB\\Tech_and_Web\\New_Website\\Codex_Concept_Play\\sanctuary_livestreams.html';

// Map from placeholder ID => real Bunny ID
// Derived from the manifest final voice mix rows
const idMap = {
  // June 08 Vinyasa (was already on page, now replaced with final voice mix)
  'ffb6c597-def3-439d-bc31-4674c52b7520': 'b89e4031-1f94-47f5-a2bc-f2e14a0b1a75',
  // June 09 AM Restorative
  '490ba9c0-26ec-434f-8520-f41e339ec0bc': '6d605ef1-3067-40ba-b9fa-85ba9f998c5e',
  // June 09 PM Restorative
  '9ed0102b-e93b-4fc9-903e-dace00ffa1c1': '341947e7-6ba4-4d5b-b848-182adcc31b65',
  // June 10 Hatha
  'ee5871fd-7b33-427e-a762-a4eb661433d9': '6c9f83c3-0f27-4fb3-90d4-c5228e3c67eb',
  // 12 new PENDING IDs
  'PENDING-2026-06-15': '0e7970c7-ef40-4ace-8774-4428dbebcd5d',
  'PENDING-2026-06-22': 'bfa74711-2e94-48b1-955d-f2dcf97ce746',
  'PENDING-2026-06-16': '777dd161-015b-42b5-b2e8-fd15a6d83115',   // AM (Morning) - June 16 AM
  'PENDING-2026-06-23': '1b82dafd-55ec-4fcc-bab9-443104301666',   // AM (Morning) - June 23 AM  
  'PENDING-2026-07-07': '4eaa216c-3a7b-4716-ab42-69801d4b359b',
  'PENDING-2026-06-17': '3a182086-671e-44fc-b5be-2c220b7edbb2',
  'PENDING-2026-06-24': '041fc8a8-7d36-40fe-a8e2-320dbfd323ee',
  'PENDING-2026-07-01': 'bebb1b16-88ac-4b53-aa17-5a8bd2f2da35',
  'PENDING-2026-07-08': 'b5824274-9bf2-42f0-83da-bee48f3848b7',
  'PENDING-2026-07-15': '0bb2d9db-f053-4ac0-81f3-a1a2a580bf56',
};

// The June 16 PM and June 23 PM have the same date prefix as AM so they share the same PENDING key.
// We need to handle these specially — they appear twice in the HTML.
// June 16 PM => a2598edf-d20a-48d3-90d7-c17b93dda8b6
// June 23 PM => 15525dc2-a303-48c2-bd31-94d089665dcf

let html = fs.readFileSync(htmlFile, 'utf8');

// First pass: replace all unique PENDING IDs that only appear once
for (const [placeholder, realId] of Object.entries(idMap)) {
  const regex = new RegExp(placeholder.replace(/-/g, '\\-'), 'g');
  const count = (html.match(regex) || []).length;
  if (count > 0) {
    html = html.replace(regex, realId);
    console.log(`Replaced ${placeholder} => ${realId} (${count} occurrences)`);
  }
}

// Now handle the two PENDING IDs that were used for both AM and PM on the same date.
// After the first pass, June 16 AM is now 777dd161 and June 23 AM is now 1b82dafd.
// BUT June 16 PM and June 23 PM were never given unique PENDING IDs — they shared the same
// PENDING-2026-06-16 and PENDING-2026-06-23 keys.
// In the HTML the Evening sessions show "(Evening)" in the <p> tag.
// We need to find those Evening cards and fix their IDs.

// Fix June 16 Evening: find card that has June 16, 2026 (Evening) in meta
html = html.replace(
  /id="card-777dd161-015b-42b5-b2e8-fd15a6d83115"([^>]*)data-video-id="777dd161-015b-42b5-b2e8-fd15a6d83115"([\s\S]*?)June 16, 2026 \(Evening\)/,
  (match) => match
    .replace(/id="card-777dd161-015b-42b5-b2e8-fd15a6d83115"/, 'id="card-a2598edf-d20a-48d3-90d7-c17b93dda8b6"')
    .replace(/data-video-id="777dd161-015b-42b5-b2e8-fd15a6d83115"/, 'data-video-id="a2598edf-d20a-48d3-90d7-c17b93dda8b6"')
);
console.log('Fixed June 16 Evening => a2598edf');

// Fix June 23 Evening
html = html.replace(
  /id="card-1b82dafd-55ec-4fcc-bab9-443104301666"([^>]*)data-video-id="1b82dafd-55ec-4fcc-bab9-443104301666"([\s\S]*?)June 23, 2026 \(Evening\)/,
  (match) => match
    .replace(/id="card-1b82dafd-55ec-4fcc-bab9-443104301666"/, 'id="card-15525dc2-a303-48c2-bd31-94d089665dcf"')
    .replace(/data-video-id="1b82dafd-55ec-4fcc-bab9-443104301666"/, 'data-video-id="15525dc2-a303-48c2-bd31-94d089665dcf"')
);
console.log('Fixed June 23 Evening => 15525dc2');

// Also update thumbnail URLs from local assets/ to CDN for the new thumbnails
// (These were set to assets/ temporarily; now point to CDN)
html = html.replace(/src="assets\/thumb_vinyasa_5\.png"/g, 'src="https://btb-assets.b-cdn.net/assets/thumb_vinyasa_5.png"');
html = html.replace(/src="assets\/thumb_vinyasa_6\.png"/g, 'src="https://btb-assets.b-cdn.net/assets/thumb_vinyasa_6.png"');
html = html.replace(/src="assets\/thumb_restorative_5\.png"/g, 'src="https://btb-assets.b-cdn.net/assets/thumb_restorative_5.png"');
html = html.replace(/src="assets\/thumb_restorative_6\.png"/g, 'src="https://btb-assets.b-cdn.net/assets/thumb_restorative_6.png"');
html = html.replace(/src="assets\/thumb_hatha_5\.png"/g, 'src="https://btb-assets.b-cdn.net/assets/thumb_hatha_5.png"');
html = html.replace(/src="assets\/thumb_hatha_6\.png"/g, 'src="https://btb-assets.b-cdn.net/assets/thumb_hatha_6.png"');
console.log('Updated thumbnail URLs to CDN paths');

fs.writeFileSync(htmlFile, html, 'utf8');
console.log('\n✅ All placeholder IDs replaced with real Bunny IDs!');

// Verify no PENDING IDs remain
const remaining = (html.match(/PENDING-/g) || []).length;
console.log(`Remaining PENDING placeholders: ${remaining}`);
