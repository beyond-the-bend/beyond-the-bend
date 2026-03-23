# ============================================================
# Make-AllFormats.ps1
# Creates Square and Landscape versions from the Somatic Vinyasa video
# Vertical is already done: Somatic_Vinyasa_Final.mp4
# ============================================================

$vertical = "C:\BTB\Video-Processor\Output\Somatic_Vinyasa_Final.mp4"
$original = "C:\BTB\Remotion-Video-Processor\public\Somatic Vinyasa.mp4"
$mus = "C:\BTB\Remotion-Video-Processor\public\lofi_music.mp3"
$square = "C:\BTB\Video-Processor\Output\Somatic_Vinyasa_Square.mp4"
$landscape = "C:\BTB\Video-Processor\Output\Somatic_Vinyasa_Landscape.mp4"
$filterFile = "C:\BTB\Video-Processor\landscape_filter.txt"

$f = "C\:/Windows/Fonts/georgia.ttf"

# ----------------------------------------------------------
# 1. SQUARE (1080x1080) — crop centre from the vertical
# ----------------------------------------------------------
Write-Host "Creating Square version (1080x1080)..." -ForegroundColor Cyan

& ffmpeg -y -i $vertical `
    -vf "crop=1080:1080:0:(ih-1080)/2" `
    -c:v libx264 -crf 22 -preset fast `
    -c:a aac -b:a 192k `
    $square

if ($LASTEXITCODE -eq 0) {
    Write-Host "Square done: $square" -ForegroundColor Green
}
else {
    Write-Host "Square failed." -ForegroundColor Red
}

# ----------------------------------------------------------
# 2. LANDSCAPE (1920x1080) — re-process original, no rotation
# Captions repositioned for wide screen (text in lower third)
# ----------------------------------------------------------
Write-Host ""
Write-Host "Creating Landscape version (1920x1080)..." -ForegroundColor Cyan

function fade($s, $e) {
    return "if(lt(t,$s),0,if(lt(t,$($s+1)),(t-$s)/1,if(lt(t,$($e-0.5)),1,if(lt(t,$e),($e-t)/0.5,0))))"
}

$style = "fontfile='$f':fontcolor=white:shadowcolor=black@0.7:shadowx=2:shadowy=2:x=(w-text_w)/2"

# Same captions, same timing — adjusted font sizes for 1920x1080
$lines = @(
    @{ t = "The fire is lit."; s = 1; e = 6; sz = 58; y = "h*0.78" },
    @{ t = "The mats are waiting."; s = 6; e = 11; sz = 58; y = "h*0.78" },
    @{ t = "The room already knows."; s = 11; e = 17; sz = 54; y = "h*0.78" },
    @{ t = "This is what it feels like before."; s = 17; e = 22; sz = 54; y = "h*0.78" },
    @{ t = "Before the breath deepens."; s = 22; e = 26; sz = 54; y = "h*0.76" },
    @{ t = "Before the body remembers."; s = 26; e = 30; sz = 54; y = "h*0.82" },
    @{ t = "This is Somatic Vinyasa."; s = 30; e = 37; sz = 66; y = "h*0.78" },
    @{ t = "Join us Monday nights  6\:00 to 7\:15"; s = 37; e = 41; sz = 44; y = "h*0.78" },
    @{ t = "Beginning April 6th"; s = 41; e = 44; sz = 42; y = "h*0.85" },
    @{ t = "Laura Harvey  Beyond the Bend Yoga"; s = 44; e = 48; sz = 40; y = "h*0.78" }
)

$chain = "[0:v]"
foreach ($line in $lines) {
    $a = fade $line.s $line.e
    $enable = "enable='between(t,$($line.s-0.5),$($line.e))'"
    $chain += "drawtext=$style`:text='$($line.t)':fontsize=$($line.sz):y=$($line.y):alpha='$a':$enable,"
}
$chain = $chain.TrimEnd(',') + "[captioned]"
$audio = "[0:a]volume=0.08[va];[1:a]volume=0.92,afade=t=out:st=45:d=3[ma];[va][ma]amix=inputs=2:duration=first[audio]"

$noBom = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText($filterFile, "$chain;$audio", $noBom)

# -noautorotate prevents ffmpeg from rotating — gives us the native landscape frames
& ffmpeg -y -noautorotate `
    -i $original `
    -i $mus `
    -filter_complex_script $filterFile `
    -map "[captioned]" -map "[audio]" `
    -c:v libx264 -crf 22 -preset fast `
    -c:a aac -b:a 192k `
    $landscape

if ($LASTEXITCODE -eq 0) {
    Write-Host "Landscape done: $landscape" -ForegroundColor Green
}
else {
    Write-Host "Landscape failed." -ForegroundColor Red
}

Write-Host ""
Write-Host "All three versions are ready in:" -ForegroundColor Yellow
Write-Host "C:\BTB\Video-Processor\Output\" -ForegroundColor Yellow
