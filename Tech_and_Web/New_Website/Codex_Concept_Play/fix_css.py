import re
import os

path = r"C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play\styles.css"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# We know the content from line 785 is:
# body.sanctuary-app {
#     background: var(--soft);
#     margin: 0;
# (broken stuff here up to .sidebar-footer {)

correct_css = """body.sanctuary-app {
    background: var(--soft);
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
}

.app-layout {
    display: flex;
    height: 100vh;
}

/* Sidebar */
.app-sidebar {
    width: 280px;
    background: var(--paper);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 32px 0;
    flex-shrink: 0;
}

.sidebar-brand {
    padding: 0 32px 32px;
}

.sidebar-logo {
    height: 96px;
    width: auto;
    max-width: 100%;
}

.sidebar-nav {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.nav-item {
    padding: 12px 32px;
    text-decoration: none;
    color: var(--muted);
    font-weight: 500;
    transition: all 0.2s ease;
    border-left: 3px solid transparent;
}

.nav-item:hover {
    color: var(--ink);
    background: rgba(185, 129, 120, 0.05); /* faint rose */
}

.nav-item.active {
    color: var(--clay);
    border-left-color: var(--clay);
    background: rgba(185, 129, 120, 0.08);
}

.sidebar-footer {"""

# Replace everything from 'body.sanctuary-app {' to '.sidebar-footer {'
content = re.sub(r'body\.sanctuary-app \{.*?\.sidebar-footer \{', correct_css, content, flags=re.DOTALL)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("CSS fixed successfully.")
