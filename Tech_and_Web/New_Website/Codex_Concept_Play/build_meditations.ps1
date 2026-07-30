$content = Get-Content sanctuary_meditations.html -Raw

$newMain = @'
        <main class="app-main">
            <header class="app-header library-header">
                <div>
                    <h1>Meditations &amp; Audio</h1>
                    <p class="greeting-subtitle">A quiet space for grounded reflection, gentle allowing, and walking affirmations.</p>
                </div>
            </header>

            <section class="video-row-section">
                <div class="row-header">
                    <h2>Guided Meditations</h2>
                </div>
                <div class="horizontal-scroller">
                    
                    <div class="video-card" id="card-Allow_What_Is_Final" onclick="openVideoModal('assets/Allow_What_Is_Final.mp4')">
                        <div class="video-thumbnail">
                            <img src="assets/thumb_allow_what_is.png" alt="Allow What Is" loading="lazy">
                            <div class="completed-badge">✓ Completed</div>
                            <div class="play-overlay"><span class="play-icon">▶</span></div>
                            <span class="duration-badge">5 min</span>
                        </div>
                        <div class="video-meta">
                            <h3>Allow What Is</h3>
                            <p>Flowing Meditation</p>
                        </div>
                    </div>

                    <div class="video-card" id="card-Garden_Within" onclick="alert('The Garden Within is coming soon!')">
                        <div class="video-thumbnail">
                            <img src="assets/thumb_garden_within.png" alt="The Garden Within" loading="lazy">
                            <div class="completed-badge">✓ Completed</div>
                            <div class="play-overlay"><span class="play-icon">▶</span></div>
                            <span class="duration-badge">15 min</span>
                        </div>
                        <div class="video-meta">
                            <h3>The Garden Within</h3>
                            <p>Coming Soon</p>
                        </div>
                    </div>

                </div>
            </section>
        </main>
'@
$content = $content -replace '(?s)<main class="app-main">.*?</main>', $newMain

$newModal = @'
    <!-- Video Modal -->
    <div id="videoModal" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-modal" onclick="closeVideoModal()">&times; Close</button>
            </div>
            <div class="video-container" id="videoContainer">
                <video id="htmlVideo" controls autoplay style="width:100%; height:100%; background:black;"></video>
            </div>
            <div class="modal-actions">
                <button id="markCompleteBtn" class="btn primary" onclick="markCurrentVideoComplete()">Mark as Complete</button>
            </div>
        </div>
    </div>
'@
$content = $content -replace '(?s)<div id="videoModal" class="modal-overlay">.*?</div>\s*</div>\s*</div>', $newModal

$newScript = @'
    <script>
        const modal = document.getElementById('videoModal');
        const videoElement = document.getElementById('htmlVideo');
        let currentVideoId = null;

        document.addEventListener('DOMContentLoaded', () => {
            const completedStr = localStorage.getItem('btb_completed_videos') || '[]';
            const completedVideos = JSON.parse(completedStr);
            completedVideos.forEach(id => {
                const card = document.getElementById('card-' + id);
                if (card) card.classList.add('completed');
            });
        });

        function openVideoModal(videoUrl) {
            // Extract a simple ID from the URL for local storage tracking
            currentVideoId = videoUrl.split('/').pop().replace('.mp4', '');
            
            videoElement.src = videoUrl;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const completedStr = localStorage.getItem('btb_completed_videos') || '[]';
            const completedVideos = JSON.parse(completedStr);
            const btn = document.getElementById('markCompleteBtn');
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
            videoElement.pause();
            videoElement.src = '';
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
'@
$content = $content -replace '(?s)<script>.*?</script>', $newScript

$content | Set-Content sanctuary_meditations.html
