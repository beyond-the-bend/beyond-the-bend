const fs = require('fs');
const file = 'C:/BTB/Tech_and_Web/New_Website/Codex_Concept_Play/sanctuary_meditations.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove it from the orientation card
content = content.replace('<div class="new-badge">New</div>\n                            <div class="completed-badge">', '<div class="completed-badge">');
// Handle encoding weirdness if necessary, wait, let's just use regex for the removal
content = content.replace(/<div class="new-badge">New<\/div>\s*<div class="completed-badge">/g, '<div class="completed-badge">');

// 2. Add it to the Imagine Something Bigger card
const targetHtml = `<img src="assets/imagine_bigger_thumb.png" alt="Imagine Something Bigger" loading="lazy">\n                            <div class="completed-badge">`;
const replacementHtml = `<img src="assets/imagine_bigger_thumb.png" alt="Imagine Something Bigger" loading="lazy">\n                            <div class="new-badge">New</div>\n                            <div class="completed-badge">`;
content = content.replace(targetHtml, replacementHtml);

fs.writeFileSync(file, content, 'utf8');
console.log('Badge fixed successfully!');
