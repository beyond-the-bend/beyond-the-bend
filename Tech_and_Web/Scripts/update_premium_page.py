import re

filepath = r"C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play\sanctuary_premium.html"

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

# Update title
html = html.replace("<title>Livestream Replays | The Sanctuary</title>", "<title>Premium Classes | The Sanctuary</title>")

# Update active nav state
html = html.replace('class="nav-item active">Livestream Replays</a>', 'class="nav-item">Livestream Replays</a>')
html = html.replace('class="nav-item">Directed Classes</a>', 'class="nav-item active">Premium Classes</a>')

# The main content to inject
new_main_content = """<main class="app-main">
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
        </main>"""

# Replace everything from <main class="app-main"> to </main>
html = re.sub(r'<main class="app-main">.*?</main>', new_main_content, html, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated sanctuary_premium.html successfully.")
