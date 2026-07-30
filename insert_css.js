const fs = require('fs');
const file = 'C:/BTB/Tech_and_Web/New_Website/Codex_Concept_Play/sanctuary_meditations.html';
let content = fs.readFileSync(file, 'utf8');

const replacementCSS = `
.modal-content.audio-mode {
    background: var(--paper);
    max-width: 600px;
}

.modal-content.audio-mode .video-container {
    padding-top: 0;
    height: auto;
    overflow: visible;
}

.modal-content.audio-mode .modal-close {
    color: var(--ink);
}

.audio-player-wrapper {
    padding: 48px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.audio-player-wrapper img.audio-cover {
    width: 240px;
    height: 240px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 16px 32px rgba(47, 51, 45, 0.15);
    margin-bottom: 32px;
}

.audio-player-wrapper h3 {
    margin: 0 0 8px 0;
    font-family: "Literata", serif;
    font-size: 1.75rem;
    color: var(--ink);
    font-weight: 500;
}

.audio-player-wrapper p {
    margin: 0 0 32px 0;
    color: var(--muted);
    font-size: 1rem;
}

.audio-player-wrapper audio {
    width: 100%;
    max-width: 400px;
    outline: none;
}
</style>
`;

if (!content.includes('.audio-player-wrapper {')) {
    content = content.replace('</style>', replacementCSS);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Inserted CSS successfully!');
} else {
    console.log('CSS already exists');
}
