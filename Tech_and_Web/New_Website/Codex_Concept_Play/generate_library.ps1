$csv = Import-Csv "C:\BTB\Tech_and_Web\Bunny_Upload\sanctuary-live-studio-upload-manifest.csv"
$uploaded = $csv | Where-Object { $_.Status -eq 'uploaded' -and $_.BunnyVideoId -ne '' } | Sort-Object Title -Descending

$htmlTop = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Livestream Replays | The Sanctuary</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body class="sanctuary-app">
    <div class="app-layout">
        <!-- Sidebar Navigation -->
        <aside class="app-sidebar">
            <div class="sidebar-brand">
                <a href="index.html" aria-label="Beyond the Bend home">
                    <img src="assets/beyond-the-bend-original-logo.svg" alt="Beyond the Bend Logo" class="sidebar-logo">
                </a>
            </div>
            <nav class="sidebar-nav">
                <a href="sanctuary.html" class="nav-item">Dashboard</a>
                <a href="#" class="nav-item active">Livestream Replays</a>
                <a href="#" class="nav-item">Directed Classes</a>
                <a href="#" class="nav-item">Meditation Hub</a>
                <a href="#" class="nav-item">Courses</a>
                <a href="#" class="nav-item">Reflective Tools</a>
            </nav>
            <div class="sidebar-footer">
                <a href="#" class="nav-item">Account</a>
                <a href="#" class="nav-item">Log Out</a>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="app-main">
            <header class="app-header library-header">
                <div>
                    <h1>Livestream Replays</h1>
                    <p class="greeting-subtitle">Unedited recordings of our live studio sessions. Real, gentle, and grounded.</p>
                </div>
            </header>
"@

$htmlBottom = @"
        </main>
    </div>

    <!-- Video Modal Overlay -->
    <div id="videoModal" class="modal-overlay">
        <div class="modal-content">
            <button class="modal-close" onclick="closeVideoModal()" aria-label="Close video">&times;</button>
            <div class="video-container">
                <iframe id="bunnyIframe" src="" loading="lazy" style="border:0;position:absolute;top:0;height:100%;width:100%;" allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowfullscreen="true"></iframe>
            </div>
            <div class="modal-actions">
                <button id="markCompleteBtn" class="button primary" onclick="markCurrentVideoComplete()">Mark as Complete</button>
            </div>
        </div>
    </div>

    <script>
        const LIBRARY_ID = '656394';
        const modal = document.getElementById('videoModal');
        const iframe = document.getElementById('bunnyIframe');
        let currentVideoId = null;

        // Initialize completed states on load
        document.addEventListener('DOMContentLoaded', () => {
            const completedStr = localStorage.getItem('btb_completed_videos') || '[]';
            const completedVideos = JSON.parse(completedStr);
            completedVideos.forEach(id => {
                const card = document.getElementById('card-' + id);
                if (card) {
                    card.classList.add('completed');
                }
            });
        });

        function openVideoModal(videoId) {
            currentVideoId = videoId;
            const videoUrl = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}?autoplay=true&preload=true`;
            iframe.src = videoUrl;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Check if already completed and update button text
            const completedStr = localStorage.getItem('btb_completed_videos') || '[]';
            const completedVideos = JSON.parse(completedStr);
            const btn = document.getElementById('markCompleteBtn');
            if (completedVideos.includes(videoId)) {
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
                
                // Update UI on the card
                const card = document.getElementById('card-' + currentVideoId);
                if (card) {
                    card.classList.add('completed');
                }
            }
            closeVideoModal();
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    </script>
</body>
</html>
"@

function Get-CategorySection {
    param($Title, $ClassType, $ThumbBase, $Duration)
    $videos = $uploaded | Where-Object { $_.ClassType -eq $ClassType }
    if ($videos.Count -eq 0) { return "" }
    
    $section = @"
            <section class="video-row-section">
                <div class="row-header">
                    <h2>$Title</h2>
                    <a href="#" class="view-all">View all</a>
                </div>
                <div class="horizontal-scroller">
"@
    $i = 0
    foreach ($v in $videos) {
        $id = $v.BunnyVideoId
        
        # parse title to get date and day
        $dateStr = ""
        $dayStr = ""
        if ($v.Title -match "^(\d{4}-\d{2}-\d{2}) (\w+) ") {
            $date = [datetime]::ParseExact($matches[1], 'yyyy-MM-dd', $null)
            $dateStr = $date.ToString("MMMM dd, yyyy")
            $dayStr = $matches[2]
        }
        $displayTitle = "$dayStr $Title"

        $thumbNum = ($i % 4) + 1
        $thumbFile = if ($thumbNum -eq 1) { "assets/thumb_$ThumbBase.png" } else { "assets/thumb_${ThumbBase}_${thumbNum}.png" }
        
        $section += @"
                    <div class="video-card" id="card-$id" onclick="openVideoModal('$id')">
                        <div class="video-thumbnail">
                            <img src="$thumbFile" alt="$Title" loading="lazy">
                            <div class="completed-badge">✓ Completed</div>
                            <div class="play-overlay"><span class="play-icon">▶</span></div>
                            <span class="duration-badge">$Duration min</span>
                        </div>
                        <div class="video-meta">
                            <h3>$displayTitle</h3>
                            <p>$dateStr</p>
                        </div>
                    </div>
"@
        $i++
    }

    
    $section += @"
                </div>
            </section>
"@
    return $section
}

$vinyasa = Get-CategorySection -Title "Somatic Vinyasa" -ClassType "Somatic Vinyasa" -ThumbBase "vinyasa" -Duration "60"
$restorative = Get-CategorySection -Title "Restorative" -ClassType "Restorative" -ThumbBase "restorative" -Duration "75"
$hatha = Get-CategorySection -Title "Somatic Hatha" -ClassType "Somatic Hatha" -ThumbBase "hatha" -Duration "60"

$finalHtml = $htmlTop + $vinyasa + $restorative + $hatha + $htmlBottom
Set-Content -Path "C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play\sanctuary_livestreams.html" -Value $finalHtml -Encoding UTF8
