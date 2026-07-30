$content = Get-Content sanctuary_meditations.html -Raw

$newModal = @'
    <!-- Video Modal -->
    <div id="videoModal" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-modal" onclick="closeVideoModal()">&times; Close</button>
            </div>
            <div class="video-container" id="videoContainer">
                <iframe id="bunnyIframe" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe>
            </div>
            <div class="modal-actions">
                <button id="markCompleteBtn" class="btn primary" onclick="markCurrentVideoComplete()">Mark as Complete</button>
            </div>
        </div>
    </div>
'@
$content = $content -replace '(?s)<!-- Video Modal -->.*?</div>\s*</div>\s*</div>', $newModal

$newScript = @'
    <script>
        const LIBRARY_ID = '656394';
        const modal = document.getElementById('videoModal');
        const iframe = document.getElementById('bunnyIframe');
        let currentVideoId = null;

        document.addEventListener('DOMContentLoaded', () => {
            const completedStr = localStorage.getItem('btb_completed_videos') || '[]';
            const completedVideos = JSON.parse(completedStr);
            completedVideos.forEach(id => {
                const card = document.getElementById('card-' + id);
                if (card) card.classList.add('completed');
            });
        });

        function openVideoModal(videoId) {
            currentVideoId = videoId;
            const videoUrl = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}?autoplay=true&preload=true`;
            
            iframe.src = videoUrl;
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
            iframe.src = '';
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

$content = $content -replace "onclick=`"openVideoModal\('assets/Allow_What_Is_Final\.mp4'\)`"", "onclick=`"openVideoModal('51a99f5a-c218-4c72-bfd4-aaceefaa4569')`""
$content = $content -replace 'id="card-Allow_What_Is_Final"', 'id="card-51a99f5a-c218-4c72-bfd4-aaceefaa4569"'

$content | Set-Content sanctuary_meditations.html
