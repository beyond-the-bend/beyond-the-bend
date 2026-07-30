const fs = require('fs');

const file = 'C:/BTB/Tech_and_Web/Sanctuary_Deploy/sanctuary_livestreams.html';
let content = fs.readFileSync(file, 'utf8');

// Find the horizontal-scroller CSS blocks in the inline stylesheet and replace them with grid CSS.
const scrollerStyleBlock = `.horizontal-scroller {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    padding-bottom: 24px;
    margin-right: -24px;
    padding-right: 24px;
    /* smooth scrolling on touch devices */
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
}

.horizontal-scroller::-webkit-scrollbar {
    height: 6px;
}

.horizontal-scroller::-webkit-scrollbar-track {
    background: transparent;
}

.horizontal-scroller::-webkit-scrollbar-thumb {
    background-color: var(--border);
    border-radius: 10px;
}

.horizontal-scroller .video-card {
    flex: 0 0 320px;
    scroll-snap-align: start;
    cursor: pointer;
    background: transparent;
    border: none;
    box-shadow: none;
}

.horizontal-scroller .video-card:hover {
    transform: none;
    box-shadow: none;
}`;

const gridStyleBlock = `.horizontal-scroller {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 32px 24px;
    padding-bottom: 32px;
}

.horizontal-scroller .video-card {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border: none;
    box-shadow: none;
}`;

// Normalize line endings to do standard replacement
content = content.replace(/\r\n/g, '\n');
const normalizedScroller = scrollerStyleBlock.replace(/\r\n/g, '\n');
const normalizedGrid = gridStyleBlock.replace(/\r\n/g, '\n');

if (content.includes(normalizedScroller)) {
    content = content.replace(normalizedScroller, normalizedGrid);
    fs.writeFileSync(file, content, 'utf8');
    // Also save it to Codex_Concept_Play so they are in sync
    fs.writeFileSync('C:/BTB/Tech_and_Web/New_Website/Codex_Concept_Play/sanctuary_livestreams.html', content, 'utf8');
    console.log('Successfully changed layout to grid in both locations!');
} else {
    console.log('Error: Could not locate the exact horizontal-scroller CSS block in sanctuary_livestreams.html');
}
