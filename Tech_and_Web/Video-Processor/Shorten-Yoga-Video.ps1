param(
    [Parameter(Mandatory = $true)]
    [string]$InputVideo,

    [Parameter(Mandatory = $true)]
    [string]$StartTime,

    [Parameter(Mandatory = $true)]
    [string]$EndTime,

    [double]$DetectSilenceLongerThanSeconds = 420,
    [double]$KeepLongSilenceSeconds = 240,
    [string]$SilenceThreshold = "-35dB",
    [string]$OutputVideo = ""
)

$ErrorActionPreference = "Stop"

$ffmpegPath = "C:\Users\coach\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"
$ffprobePath = "C:\Users\coach\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffprobe.exe"
$processorDir = "C:\BTB\Tech_and_Web\Video-Processor"
$outputDir = Join-Path $processorDir "finished_videos"
$tempDir = Join-Path $processorDir "_silence_test_temp"

function Convert-ToSeconds {
    param([string]$TimeValue)

    if ($TimeValue -match '^\d+(\.\d+)?$') {
        return [double]$TimeValue
    }

    $parts = $TimeValue.Split(":")
    if ($parts.Count -eq 2) {
        return ([double]$parts[0] * 60) + [double]$parts[1]
    }
    if ($parts.Count -eq 3) {
        return ([double]$parts[0] * 3600) + ([double]$parts[1] * 60) + [double]$parts[2]
    }

    throw "Time '$TimeValue' must look like 10:23, 01:02:03, or seconds."
}

function Format-Seconds {
    param([double]$Seconds)
    return ([Math]::Max(0, $Seconds)).ToString("0.###", [Globalization.CultureInfo]::InvariantCulture)
}

if (!(Test-Path -LiteralPath $InputVideo)) {
    throw "Input video not found: $InputVideo"
}

if (!(Test-Path -LiteralPath $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}
if (Test-Path -LiteralPath $tempDir) {
    Remove-Item -LiteralPath $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

$inputItem = Get-Item -LiteralPath $InputVideo
$startSeconds = Convert-ToSeconds $StartTime
$endSeconds = Convert-ToSeconds $EndTime
if ($endSeconds -le $startSeconds) {
    throw "End time must be after start time."
}

if ([string]::IsNullOrWhiteSpace($OutputVideo)) {
    $baseName = [IO.Path]::GetFileNameWithoutExtension($inputItem.Name)
    $OutputVideo = Join-Path $outputDir "$baseName`_silence_test.mp4"
}

$trimmedVideo = Join-Path $tempDir "trimmed_input.mp4"
$logFile = Join-Path $tempDir "silence_log.txt"
$concatList = Join-Path $tempDir "concat_list.txt"

Write-Host "Creating trimmed working copy..."
& $ffmpegPath -hide_banner -ss (Format-Seconds $startSeconds) -to (Format-Seconds $endSeconds) -i $InputVideo -map 0:v:0 -map 0:a:0 -c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 192k -y $trimmedVideo
if ($LASTEXITCODE -ne 0) {
    throw "Could not create trimmed working copy."
}

$durationRaw = & $ffprobePath -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $trimmedVideo
$durationSeconds = [double]::Parse($durationRaw, [Globalization.CultureInfo]::InvariantCulture)

Write-Host "Finding long quiet sections..."
& $ffmpegPath -hide_banner -i $trimmedVideo -af "silencedetect=noise=$SilenceThreshold:d=$DetectSilenceLongerThanSeconds" -f null - 2> $logFile

$silenceStarts = New-Object System.Collections.Generic.List[double]
$silenceRanges = New-Object System.Collections.Generic.List[object]

Get-Content -Path $logFile | ForEach-Object {
    if ($_ -match 'silence_start:\s*([0-9.]+)') {
        $silenceStarts.Add([double]::Parse($matches[1], [Globalization.CultureInfo]::InvariantCulture))
    }
    if ($_ -match 'silence_end:\s*([0-9.]+)\s*\|\s*silence_duration:\s*([0-9.]+)') {
        if ($silenceStarts.Count -gt 0) {
            $start = $silenceStarts[$silenceStarts.Count - 1]
            $end = [double]::Parse($matches[1], [Globalization.CultureInfo]::InvariantCulture)
            $duration = [double]::Parse($matches[2], [Globalization.CultureInfo]::InvariantCulture)
            if ($duration -gt $DetectSilenceLongerThanSeconds -and $duration -gt $KeepLongSilenceSeconds) {
                $silenceRanges.Add([PSCustomObject]@{
                    Start = $start
                    End = $end
                    Duration = $duration
                })
            }
        }
    }
}

$keepSegments = New-Object System.Collections.Generic.List[object]
$cursor = 0.0
$halfKeep = $KeepLongSilenceSeconds / 2.0

foreach ($range in $silenceRanges) {
    $cutStart = $range.Start + $halfKeep
    $cutEnd = $range.End - $halfKeep

    if ($cutStart -gt $cursor) {
        $keepSegments.Add([PSCustomObject]@{ Start = $cursor; End = $cutStart })
    }
    $cursor = [Math]::Max($cursor, $cutEnd)
}

if ($cursor -lt $durationSeconds) {
    $keepSegments.Add([PSCustomObject]@{ Start = $cursor; End = $durationSeconds })
}

if ($silenceRanges.Count -eq 0) {
    Write-Host "No quiet sections matched the rule. Exporting only the start/end trim."
    Copy-Item -LiteralPath $trimmedVideo -Destination $OutputVideo -Force
}
else {
    Write-Host "Shortening $($silenceRanges.Count) long quiet section(s)..."
    $concatLines = New-Object System.Collections.Generic.List[string]
    $index = 0

    foreach ($segment in $keepSegments) {
        if (($segment.End - $segment.Start) -le 0.05) {
            continue
        }

        $partFile = Join-Path $tempDir ("part_{0:000}.mp4" -f $index)
        & $ffmpegPath -hide_banner -ss (Format-Seconds $segment.Start) -to (Format-Seconds $segment.End) -i $trimmedVideo -c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 192k -y $partFile
        if ($LASTEXITCODE -ne 0) {
            throw "Could not render test segment $index."
        }

        $safePath = $partFile.Replace("'", "'\''")
        $concatLines.Add("file '$safePath'")
        $index++
    }

    Set-Content -Path $concatList -Value $concatLines -Encoding ascii
    & $ffmpegPath -hide_banner -f concat -safe 0 -i $concatList -c copy -y $OutputVideo
    if ($LASTEXITCODE -ne 0) {
        throw "Could not assemble final test video."
    }
}

$originalMinutes = [Math]::Round(($endSeconds - $startSeconds) / 60, 1)
$newDurationRaw = & $ffprobePath -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $OutputVideo
$newMinutes = [Math]::Round(([double]::Parse($newDurationRaw, [Globalization.CultureInfo]::InvariantCulture)) / 60, 1)

Write-Host ""
Write-Host "Done." -ForegroundColor Green
Write-Host "Original selected length: $originalMinutes minutes"
Write-Host "New test length: $newMinutes minutes"
Write-Host "Output: $OutputVideo"
