$filepath = "C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play\sanctuary_premium.html"
$html = [System.IO.File]::ReadAllText($filepath)

$html = $html.Replace("<title>Livestream Replays | The Sanctuary</title>", "<title>Premium Classes | The Sanctuary</title>")
$html = $html.Replace('class="nav-item active">Livestream Replays</a>', 'class="nav-item">Livestream Replays</a>')
$html = $html.Replace('class="nav-item">Directed Classes</a>', 'class="nav-item active">Premium Classes</a>')

$newMain = @"
<main class="app-main">
            <header class="app-header library-header">
                <div>
                    <h1>Premium Classes</h1>
                    <p class="greeting-subtitle">Intentionally filmed, guided movement practices.</p>
                </div>
            </header>            <section class="video-row-section">
                <div class="horizontal-scroller">                    
                    
                    <div class="video-card" id="card-b100d17d-4570-4fe7-b108-a2313a5f725c" onclick="openVideoModal('b100d17d-4570-4fe7-b108-a2313a5f725c')">
                        <div class="video-thumbnail">
                            <img src="assets/thumb_yoga_mountains.png" alt="Yoga in the Mountains" loading="lazy">
                            <div class="completed-badge">✓ Completed</div>
                            <div class="play-overlay"><span class="play-icon">▶</span></div>
                            <span class="duration-badge">Premium</span>
                        </div>
                        <div class="video-meta">
                            <h3>Yoga in the Mountains</h3>
                            <p>Premium Class</p>
                        </div>
                    </div>                    
                    
                    <div class="video-card" id="card-1187b1c7-3b19-4866-9665-9c5bd3c1c1fc" onclick="openVideoModal('1187b1c7-3b19-4866-9665-9c5bd3c1c1fc')">
                        <div class="video-thumbnail">
                            <img src="assets/thumb_pelvic_circles.png" alt="Pelvic Circles" loading="lazy">
                            <div class="completed-badge">✓ Completed</div>
                            <div class="play-overlay"><span class="play-icon">▶</span></div>
                            <span class="duration-badge">Premium</span>
                        </div>
                        <div class="video-meta">
                            <h3>Pelvic Circles</h3>
                            <p>Premium Class</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
"@

$html = [System.Text.RegularExpressions.Regex]::Replace($html, '(?s)<main class="app-main">.*?</main>', $newMain)
[System.IO.File]::WriteAllText($filepath, $html)
Write-Host "Updated HTML successfully"
