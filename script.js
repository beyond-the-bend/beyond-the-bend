const fs = require('fs');
const file = 'C:/BTB/Tech_and_Web/New_Website/Codex_Concept_Play/sanctuary_meditations.html';
let content = fs.readFileSync(file, 'utf8');

const regex = /\/\/ Event delegation for video cards.*<\/body>/s;
const replacement = `// Event delegation for video cards (GoHighLevel safe)
        document.addEventListener('click', function(e) {
            const card = e.target.closest('.video-card[data-video-id], .video-card[data-audio-file]');
            if (card) {
                openVideoModal(card);
            }
        });

        function openVideoModal(card) {
            const videoId = card.getAttribute('data-video-id');
            const audioFile = card.getAttribute('data-audio-file');
            const videoContainer = document.getElementById('videoContainer');
            const modalContent = document.querySelector('.modal-content');
            const btn = document.getElementById('markCompleteBtn');

            if (audioFile) {
                currentVideoId = audioFile;
                modalContent.classList.add('audio-mode');
                videoContainer.innerHTML = \`
                    <div class="audio-player-wrapper">
                        <img src="\${card.getAttribute('data-cover')}" alt="Cover Art" class="audio-cover">
                        <h3>\${card.getAttribute('data-title')}</h3>
                        <p>\${card.getAttribute('data-subtitle')}</p>
                        <audio controls autoplay>
                            <source src="\${audioFile}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                \`;
            } else if (videoId) {
                currentVideoId = videoId;
                modalContent.classList.remove('audio-mode');
                const videoUrl = \`https://iframe.mediadelivery.net/embed/\${LIBRARY_ID}/\${videoId}?autoplay=true&preload=true\`;
                videoContainer.innerHTML = \`<iframe id="bunnyIframe" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true" src="\${videoUrl}"></iframe>\`;
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const completedStr = localStorage.getItem('btb_completed_videos') || '[]';
            const completedVideos = JSON.parse(completedStr);
            if (completedVideos.includes(currentVideoId)) {
                btn.textContent = "Completed ✓";
                btn.classList.add('secondary');
                btn.classList.remove('primary');
            } else {
                btn.textContent = "Mark as Complete";
                btn.classList.add('primary');
                btn.classList.remove('secondary');
            }
        }

        function closeVideoModal() {
            modal.classList.remove('active');
            const videoContainer = document.getElementById('videoContainer');
            videoContainer.innerHTML = \`<iframe id="bunnyIframe" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe>\`;
            document.body.style.overflow = '';
            currentVideoId = null;
        }
        
        function markCurrentVideoComplete() {
            if (!currentVideoId) return;
            let completedStr = localStorage.getItem('btb_completed_videos') || '[]';
            let completedVideos = JSON.parse(completedStr);
            if (!completedVideos.includes(currentVideoId)) {
                completedVideos.push(currentVideoId);
                localStorage.setItem('btb_completed_videos', JSON.stringify(completedVideos));
                const card = document.getElementById('card-' + currentVideoId);
                if (card) card.classList.add('completed');
            }
            closeVideoModal();
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeVideoModal();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeVideoModal();
        });
    </script>
</body>`;

content = content.replace(regex, replacement);
fs.writeFileSync(file, content, 'utf8');
