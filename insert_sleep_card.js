const fs = require('fs');
const file = 'C:/BTB/Tech_and_Web/New_Website/Codex_Concept_Play/sanctuary_meditations.html';
let content = fs.readFileSync(file, 'utf8');

const targetId = `<div class="video-card" id="card-imagine-bigger-audio"`;
const newCardHtml = `                    <div class="video-card" id="card-sleep-meditation-audio" data-audio-file="assets/Sleep_Meditation.mp3" data-title="Deep Sleep Practice" data-subtitle="Guided Rest" data-cover="assets/sleep_meditation_thumb.png">
                        <div class="video-thumbnail">
                            <img src="assets/sleep_meditation_thumb.png" alt="Deep Sleep Practice" loading="lazy">
                            <div class="new-badge">New</div>
                            <div class="completed-badge">✓ Completed</div>
                            <div class="play-overlay"><span class="play-icon">&#9658;</span></div>
                            <span class="duration-badge">8 min</span>
                        </div>
                        <div class="video-meta">
                            <h3>Deep Sleep Practice</h3>
                            <p>Guided Rest</p>
                        </div>
                    </div>

                    ${targetId}`;

content = content.replace(targetId, newCardHtml);
fs.writeFileSync(file, content, 'utf8');
console.log('Sleep card injected successfully!');
