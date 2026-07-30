$htmlFiles = Get-ChildItem -Path "C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play\*.html"

foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # 1. Update the sidebar navigation from "Directed Classes" to "Premium Classes" and link it
    $content = $content.Replace('<a href="#" class="nav-item">Directed Classes</a>', '<a href="sanctuary_premium.html" class="nav-item">Premium Classes</a>')
    
    # Also handle if it's active
    $content = $content.Replace('<a href="#" class="nav-item active">Directed Classes</a>', '<a href="sanctuary_premium.html" class="nav-item active">Premium Classes</a>')

    # 2. Update the Dashboard card in sanctuary.html
    if ($file.Name -eq 'sanctuary.html') {
        # The card currently links to href="#"
        # We can find the block by replacing the href in the card that has Premium Classes
        $content = [System.Text.RegularExpressions.Regex]::Replace($content, '<a href="#" class="category-card">(\s*<div class="card-image">\s*<img src="assets/premium_classes.png")', '<a href="sanctuary_premium.html" class="category-card">$1')
    }
    
    [System.IO.File]::WriteAllText($file.FullName, $content)
}

Write-Host "Updated all navigation links."
