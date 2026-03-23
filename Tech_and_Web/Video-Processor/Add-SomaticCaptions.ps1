# ============================================================
# Add-SomaticCaptions.ps1 — Final Version with Gentle Fade
# ============================================================

$vid = "C:\BTB\Remotion-Video-Processor\public\Somatic Vinyasa.mp4"
$mus = "C:\BTB\Remotion-Video-Processor\public\lofi_music.mp3"
$out = "C:\BTB\Video-Processor\Output\Somatic_Vinyasa_Final.mp4"
$filterScript = "C:\BTB\Video-Processor\somatic_filter.txt"

New-Item -ItemType Directory -Force -Path "C:\BTB\Video-Processor\Output" | Out-Null

$f = "C\:/Windows/Fonts/georgia.ttf"

# Fade helper: 1s fade in, 0.5s fade out
# Usage: fade "START" "END"
function fade($s, $e) {
    return "if(lt(t,$s),0,if(lt(t,$($s+1)),(t-$s)/1,if(lt(t,$($e-0.5)),1,if(lt(t,$e),($e-t)/0.5,0))))"
}

# Shared style (no box — just a soft shadow for a gentle floating feel)
$style = "fontfile='$f':fontcolor=white:shadowcolor=black@0.7:shadowx=2:shadowy=2:x=(w-text_w)/2"

# Each line: text, start, end, fontsize, y position
$lines = @(
    @{ t = "The fire is lit."; s = 1; e = 6; sz = 64; y = "h*0.70" },
    @{ t = "The mats are waiting."; s = 6; e = 11; sz = 64; y = "h*0.70" },
    @{ t = "The room already knows."; s = 11; e = 17; sz = 60; y = "h*0.70" },
    @{ t = "This is what it feels like before."; s = 17; e = 22; sz = 60; y = "h*0.70" },
    @{ t = "Before the breath deepens."; s = 22; e = 26; sz = 60; y = "h*0.67" },
    @{ t = "Before the body remembers."; s = 26; e = 30; sz = 60; y = "h*0.73" },
    @{ t = "This is Somatic Vinyasa."; s = 30; e = 37; sz = 72; y = "h*0.70" },
    @{ t = "Join us Monday nights  6\:00 to 7\:15"; s = 37; e = 41; sz = 52; y = "h*0.70" },
    @{ t = "Beginning April 6th"; s = 41; e = 44; sz = 48; y = "h*0.76" },
    @{ t = "Laura Harvey  Beyond the Bend Yoga"; s = 44; e = 48; sz = 46; y = "h*0.70" }
)

# Build the filter chain
$chain = "[0:v]"
foreach ($line in $lines) {
    $a = fade $line.s $line.e
    $enable = "enable='between(t,$($line.s-0.5),$($line.e))'"
    $chain += "drawtext=$style`:text='$($line.t)':fontsize=$($line.sz):y=$($line.y):alpha='$a':$enable,"
}
# Remove trailing comma, close the chain
$chain = $chain.TrimEnd(',') + "[captioned]"

$audio = "[0:a]volume=0.08[va];[1:a]volume=0.92,afade=t=out:st=45:d=3[ma];[va][ma]amix=inputs=2:duration=first[audio]"

$noBom = New-Object System.Text.UTF8Encoding $False
[System.IO.File]::WriteAllText($filterScript, "$chain;$audio", $noBom)

Write-Host "Building your video with gentle fades... please wait." -ForegroundColor Cyan

& ffmpeg -y `
    -i $vid `
    -i $mus `
    -filter_complex_script $filterScript `
    -map "[captioned]" -map "[audio]" `
    -c:v libx264 -crf 22 -preset fast `
    -c:a aac -b:a 192k `
    -metadata:s:v:0 rotate=0 `
    $out

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Done! Your video is ready at:" -ForegroundColor Green
    Write-Host $out -ForegroundColor Yellow
}
else {
    Write-Host "Something went wrong." -ForegroundColor Red
}
