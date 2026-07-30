const fs = require('fs');
const file = 'C:/BTB/Tech_and_Web/New_Website/Codex_Concept_Play/sanctuary_meditations.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/Deep Sleep Practice/g, 'Surrendering to Sleep');

fs.writeFileSync(file, content, 'utf8');
console.log('Title updated successfully!');
