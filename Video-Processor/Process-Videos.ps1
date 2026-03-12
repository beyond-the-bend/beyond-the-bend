$ffmpegPath = "C:\Users\coach\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"

$baseDir = "C:\BTB\Video-Processor"
$introDir = "$baseDir\assets_intro"
$outroDir = "$baseDir\assets_outro"
$inputDir = "$baseDir\raw_footage"
$outputDir = "$baseDir\finished_videos"

Clear-Host
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   BEYOND THE BEND VIDEO PROCESSOR" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Select Intro
$introFiles = Get-ChildItem -Path $introDir -File | Where-Object { $_.Extension -match 'mp4|mov|m4v' }
$selectedIntro = $null

if ($introFiles.Count -eq 0) {
    Write-Host "WARNING: No Intro files found in $introDir. Proceeding without intro." -ForegroundColor Yellow
}
elseif ($introFiles.Count -eq 1) {
    $selectedIntro = $introFiles[0]
}
else {
    Write-Host "Please select the Intro for this batch:" -ForegroundColor Cyan
    for ($i = 0; $i -lt $introFiles.Count; $i++) {
        Write-Host "[$($i + 1)] $($introFiles[$i].Name)"
    }
    $choice = Read-Host "Enter number"
    $selectedIntro = $introFiles[([int]$choice - 1)]
}

# 2. Select Outro
$outroFiles = Get-ChildItem -Path $outroDir -File | Where-Object { $_.Extension -match 'mp4|mov|m4v' }
$selectedOutro = $null

if ($outroFiles.Count -eq 0) {
    Write-Host "WARNING: No Outro files found in $outroDir. Proceeding without outro." -ForegroundColor Yellow
}
elseif ($outroFiles.Count -eq 1) {
    $selectedOutro = $outroFiles[0]
}
else {
    Write-Host "`nPlease select the Outro for this batch:" -ForegroundColor Cyan
    for ($i = 0; $i -lt $outroFiles.Count; $i++) {
        Write-Host "[$($i + 1)] $($outroFiles[$i].Name)"
    }
    $choiceOutro = Read-Host "Enter number"
    $selectedOutro = $outroFiles[([int]$choiceOutro - 1)]
}

# 3. Find Main Videos
$mainVideos = Get-ChildItem -Path $inputDir -File | Where-Object { $_.Extension -match 'mp4|mov|m4v' }

if ($mainVideos.Count -eq 0) {
    Write-Host "`nERROR: No footage found in 'raw_footage' folder!" -ForegroundColor Red
    Write-Host "Place your 1-hour class videos in: $inputDir"
    pause
    exit
}

Write-Host "`nReady to process $($mainVideos.Count) video(s)." -ForegroundColor Green
if ($selectedIntro) { Write-Host "Intro: $($selectedIntro.Name)" -ForegroundColor Gray }
if ($selectedOutro) { Write-Host "Outro: $($selectedOutro.Name)" -ForegroundColor Gray }
Write-Host "------------------------------------------"

foreach ($video in $mainVideos) {
    $outputFile = Join-Path $outputDir "FINISHED_$($video.Name)"
    Write-Host "Processing: $($video.Name)..." -NoNewline
    
    # Create temp concat file
    $concatList = Join-Path $baseDir "list.txt"
    $listContent = ""
    if ($selectedIntro) { $listContent += "file '$($selectedIntro.FullName)'`r`n" }
    $listContent += "file '$($video.FullName)'`r`n"
    if ($selectedOutro) { $listContent += "file '$($selectedOutro.FullName)'`r`n" }
    
    $listContent | Out-File -FilePath $concatList -Encoding ascii -Force

    # Run FFmpeg (High Quality Sync Mode)
    # This re-encodes the video to ensure audio and video stay perfectly in sync
    # even when frame rates don't match (e.g., 50fps intro vs 30fps footage).
    # -preset veryfast keeps it relatively quick while maintaining quality.
    $ffmpegArgs = "-i `"$($selectedIntro.FullName)`" -i `"$($video.FullName)`" -i `"$($selectedOutro.FullName)`" -filter_complex `"[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]`" -map `"[v]`" -map `"[a]`" -c:v libx264 -preset veryfast -crf 22 -c:a aac -b:a 192k -y `"$outputFile`""
    
    Start-Process -FilePath $ffmpegPath -ArgumentList $ffmpegArgs -Wait -NoNewWindow

    if (Test-Path $outputFile) {
        Write-Host " DONE!" -ForegroundColor Green
    }
    else {
        Write-Host " FAILED!" -ForegroundColor Red
    }
}

# Cleanup
if (Test-Path $concatList) { Remove-Item $concatList }

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "All videos processed! Check 'finished_videos'." -ForegroundColor Green
pause
