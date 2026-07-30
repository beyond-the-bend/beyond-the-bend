$ffmpegPath = "C:\Users\coach\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"

$baseDir = "c:\BTB\Tech_and_Web\Video-Processor"
$introDir = "$baseDir\assets_intro"
$outroDir = "$baseDir\assets_outro"
$inputDir = "$baseDir\raw_footage"
$outputDir = "$baseDir\finished_videos"

Clear-Host
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   BEYOND THE BEND YOGA VIDEO PROCESSOR" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Ensure input and output folders exist
if (-not (Test-Path $inputDir)) { New-Item -ItemType Directory -Path $inputDir | Out-Null }
if (-not (Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir | Out-Null }

# Find Main Videos
$mainVideos = Get-ChildItem -Path $inputDir -File | Where-Object { $_.Extension -match 'mp4|mov|m4v' }

if ($mainVideos.Count -eq 0) {
    Write-Host ""
    Write-Host "No video files found in raw_footage folder!" -ForegroundColor Yellow
    Write-Host "Please place your trimmed videos from LosslessCut in this directory:"
    Write-Host $inputDir
    Write-Host ""
    pause
    exit
}

Write-Host "Found $($mainVideos.Count) video files to process." -ForegroundColor Green
Write-Host "=========================================="

foreach ($video in $mainVideos) {
    $filename = $video.Name
    $introFile = $null
    $classType = "Unknown"
    $dayOfWeek = $null
    
    # Try parsing date from filename (e.g. YYYY-MM-DD or YYYYMMDD)
    if ($filename -match '^(\d{4})[-_]?(\d{2})[-_]?(\d{2})') {
        $year = $Matches[1]
        $month = $Matches[2]
        $day = $Matches[3]
        $dateStr = "$year-$month-$day"
        
        try {
            $dateObj = [datetime]::ParseExact($dateStr, "yyyy-MM-dd", $null)
            $dayOfWeek = $dateObj.DayOfWeek
        }
        catch {
            # Failed to parse date, will fallback to keyword matching
        }
    }
    
    # Map class type and intro video based on Day of Week
    if ($dayOfWeek) {
        if ($dayOfWeek -eq 'Monday') {
            $classType = "Somatic Vinyasa"
            $introFile = Join-Path $introDir "Somatic_Vinyasa_Intro.mp4"
        }
        elseif ($dayOfWeek -eq 'Tuesday') {
            $classType = "Restorative"
            $introFile = Join-Path $introDir "Restorative_Intro.mp4"
        }
        elseif ($dayOfWeek -eq 'Wednesday') {
            $classType = "Somatic Hatha"
            $introFile = Join-Path $introDir "Somatic_Hatha_Intro.mp4"
        }
    }
    
    # Fallback to keyword matching if date parsing was not matching class days
    if (-not $introFile) {
        if ($filename -match 'vinyasa') {
            $classType = "Somatic Vinyasa (Keyword Match)"
            $introFile = Join-Path $introDir "Somatic_Vinyasa_Intro.mp4"
        }
        elseif ($filename -match 'restorative') {
            $classType = "Restorative (Keyword Match)"
            $introFile = Join-Path $introDir "Restorative_Intro.mp4"
        }
        elseif ($filename -match 'hatha') {
            $classType = "Somatic Hatha (Keyword Match)"
            $introFile = Join-Path $introDir "Somatic_Hatha_Intro.mp4"
        }
    }
    
    # If still not found, ask user to select or use Hatha as default
    if (-not $introFile) {
        Write-Host "Could not auto detect class type for: $filename" -ForegroundColor Yellow
        Write-Host "Please select class type:"
        Write-Host "[1] Somatic Vinyasa (Monday)"
        Write-Host "[2] Restorative (Tuesday)"
        Write-Host "[3] Somatic Hatha (Wednesday)"
        $choice = Read-Host "Enter choice (1, 2, or 3)"
        
        if ($choice -eq "1") {
            $classType = "Somatic Vinyasa (Manual Selection)"
            $introFile = Join-Path $introDir "Somatic_Vinyasa_Intro.mp4"
        }
        elseif ($choice -eq "2") {
            $classType = "Restorative (Manual Selection)"
            $introFile = Join-Path $introDir "Restorative_Intro.mp4"
        }
        else {
            $classType = "Somatic Hatha (Manual Selection)"
            $introFile = Join-Path $introDir "Somatic_Hatha_Intro.mp4"
        }
    }
    
    $outroFile = Join-Path $outroDir "Rising_Moon_Outro.mp4"
    $outputFile = Join-Path $outputDir "FINISHED_$filename"
    
    Write-Host ""
    Write-Host "Processing: $filename" -ForegroundColor Cyan
    Write-Host "Detected Class: $classType" -ForegroundColor Gray
    Write-Host "Selected Intro: $(Split-Path $introFile -Leaf)" -ForegroundColor Gray
    Write-Host "Selected Outro: $(Split-Path $outroFile -Leaf)" -ForegroundColor Gray
    
    # Check that assets exist
    if (-not (Test-Path $introFile)) {
        Write-Host "ERROR: Intro file not found at $introFile" -ForegroundColor Red
        continue
    }
    if (-not (Test-Path $outroFile)) {
        Write-Host "ERROR: Outro file not found at $outroFile" -ForegroundColor Red
        continue
    }
    
    Write-Host "Rendering video (re-encoding for perfect sync)..." -ForegroundColor Yellow
    
    $ffmpegArgs = "-i `"$introFile`" -i `"$($video.FullName)`" -i `"$outroFile`" -filter_complex `"[0:v][0:a][1:v][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]`" -map `"[v]`" -map `"[a]`" -c:v libx264 -preset veryfast -crf 22 -c:a aac -b:a 192k -y `"$outputFile`""
    
    Start-Process -FilePath $ffmpegPath -ArgumentList $ffmpegArgs -Wait -NoNewWindow
    
    if (Test-Path $outputFile) {
        Write-Host "SUCCESS: Finished video saved to finished_videos folder" -ForegroundColor Green
    }
    else {
        Write-Host "FAILED: Could not process $filename" -ForegroundColor Red
    }
    Write-Host "=========================================="
}

Write-Host ""
Write-Host "All videos processed successfully!" -ForegroundColor Green
pause
