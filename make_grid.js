const fs = require('fs');
const file = 'C:/BTB/Tech_and_Web/New_Website/Codex_Concept_Play/sanctuary_meditations.html';
let content = fs.readFileSync(file, 'utf8');

// Replace the HTML class
content = content.replace('<div class="horizontal-scroller">', '<div class="video-grid">');

// We will inject the new .video-grid CSS and hide the old .horizontal-scroller by stripping it or just putting .video-grid above it.
// Actually, let's just append .video-grid to the end of the <style> block so it takes precedence.
const gridCSS = `
.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 32px 24px;
    padding-bottom: 32px;
}
.video-grid .video-card {
    cursor: pointer;
    background: transparent;
    border: none;
    box-shadow: none;
    width: 100%;
}
.video-grid .video-card:hover {
    transform: none;
    box-shadow: none;
}
</style>
`;
content = content.replace('</style>', gridCSS);

fs.writeFileSync(file, content, 'utf8');
console.log('Grid layout applied successfully!');
