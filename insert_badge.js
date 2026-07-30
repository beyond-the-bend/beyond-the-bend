const fs = require('fs');
const file = 'C:/BTB/Tech_and_Web/New_Website/Codex_Concept_Play/sanctuary_meditations.html';
let content = fs.readFileSync(file, 'utf8');

const badgeHtml = `<div class="new-badge">New</div>\n                            <div class="completed-badge">`;
content = content.replace('<div class="completed-badge">', badgeHtml);

const css = `
.new-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: var(--clay);
    color: var(--paper);
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 2;
}
</style>
`;
content = content.replace('</style>', css);

fs.writeFileSync(file, content, 'utf8');
console.log('Badge injected successfully!');
