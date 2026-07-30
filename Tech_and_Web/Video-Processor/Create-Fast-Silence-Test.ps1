param(
    [Parameter(Mandatory = $true)]
    [string]$InputVideo,

    [Parameter(Mandatory = $true)]
    [string]$OutputVideo,

    [Parameter(Mandatory = $true)]
    [double[]]$SegmentBoundaries
)

$ErrorActionPreference = "Stop"

$ffmpegPath = "C:\Users\coach\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"
$processorDir = "C:\BTB\Tech_and_Web\Video-Processor"
$tempDir = Join-Path $processorDir "_fast_silence_test_temp"
$concatList = Join-Path $tempDir "concat_list.txt"

function Format-Seconds {
    param([double]$Seconds)
    return ([Math]::Max(0, $Seconds)).ToString("0.###", [Globalization.CultureInfo]::InvariantCulture)
}

if (Test-Path -LiteralPath $tempDir) {
    Remove-Item -LiteralPath $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

if (($SegmentBoundaries.Count % 2) -ne 0) {
    throw "SegmentBoundaries must contain start/end pairs."
}

$concatLines = New-Object System.Collections.Generic.List[string]
$partIndex = 0

for ($i = 0; $i -lt $SegmentBoundaries.Count; $i += 2) {
    $start = $SegmentBoundaries[$i]
    $end = $SegmentBoundaries[$i + 1]
    if ($end -le $start) {
        continue
    }

    $partFile = Join-Path $tempDir ("part_{0:000}.mp4" -f $partIndex)
    Write-Host "Creating part $partIndex..."
    & $ffmpegPath -hide_banner -ss (Format-Seconds $start) -to (Format-Seconds $end) -i $InputVideo -map 0:v:0 -map 0:a:0 -c copy -avoid_negative_ts make_zero -y $partFile
    if ($LASTEXITCODE -ne 0) {
        throw "Could not create part $partIndex."
    }

    $concatLines.Add("file '$($partFile.Replace("'", "'\''"))'")
    $partIndex++
}

Set-Content -Path $concatList -Value $concatLines -Encoding ascii

Write-Host "Combining preview..."
& $ffmpegPath -hide_banner -f concat -safe 0 -i $concatList -c copy -y $OutputVideo
if ($LASTEXITCODE -ne 0) {
    throw "Could not combine preview."
}

Write-Host "Done: $OutputVideo" -ForegroundColor Green
