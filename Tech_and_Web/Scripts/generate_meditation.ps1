param(
    [Parameter(Mandatory=$true)][string]$AudioFile,
    [Parameter(Mandatory=$true)][string]$Title,
    [Parameter(Mandatory=$true)][string]$ApiKey,
    [Parameter(Mandatory=$false)][string]$BrollFile = "C:\BTB\Sanctuary\Sanctuary_Master_Content\01_Video_Library\Raw_B_Roll\Canva_Nature_B_Roll.mp4",
    [Parameter(Mandatory=$false)][string]$IntroFile = "C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play\assets\intro_fixed.mp4",
    [Parameter(Mandatory=$false)][string]$MusicFile = "C:\BTB\Brand_Assets\Social_Ads\Sacred_Journey_Workshop\Expert_Carousel_01\Reel\Sacred_Journey_original_soft_music.wav"
)

$ErrorActionPreference = "Stop"

$workspace = "C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play"
$assetsDir = "$workspace\assets"
$outroFile = "C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play\assets\outro_fixed.mp4"
$LibraryId = "656394"

Write-Host "Probing audio duration..."
$durStr = (ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$AudioFile").Trim()
$dur = [math]::Ceiling([double]$durStr)
Write-Host "Duration: $dur seconds"

$mixedAudio = "$assetsDir\temp_mixed_audio.wav"
$mainBody = "$assetsDir\temp_main_body.mp4"
$finalVideo = "$assetsDir\$($Title -replace ' ', '_')_Final.mp4"
$concatFile = "$assetsDir\temp_concat.txt"

$concatFile = "$assetsDir\temp_concat.txt"
Write-Host "Mixing voice with soft ambient music..."
$ffmpegMixCmd = "ffmpeg -y -i `"$AudioFile`" -stream_loop -1 -i `"$musicFile`" -filter_complex `"[0:a]volume=3.0[voice];[1:a]volume=0.1[bg];[voice][bg]amix=inputs=2:duration=first[out]`" -map `"[out]`" `"$mixedAudio`""
Invoke-Expression $ffmpegMixCmd
if ($LASTEXITCODE -ne 0) { throw "FFmpeg audio mix failed" }

Write-Host "Looping B-Roll and adding mixed audio..."
$ffmpegLoopCmd = "ffmpeg -y -stream_loop -1 -i `"$brollFile`" -i `"$mixedAudio`" -c:v copy -c:a aac -b:a 192k -map 0:v:0 -map 1:a:0 -t $dur `"$mainBody`""
Invoke-Expression $ffmpegLoopCmd
if ($LASTEXITCODE -ne 0) { throw "FFmpeg video loop failed" }

Write-Host "Concatenating Intro (if any), Main Body, and Outro..."
$concatList = ""
if ($IntroFile -ne "" -and $IntroFile -ne "NONE") {
    $concatList += "file '$introFile'`n"
}
$concatList += "file '$mainBody'`nfile '$outroFile'"
Set-Content -Path $concatFile -Value $concatList -Encoding ASCII
$ffmpegConcatCmd = "ffmpeg -y -f concat -safe 0 -i `"$concatFile`" -c copy `"$finalVideo`""
Invoke-Expression $ffmpegConcatCmd
if ($LASTEXITCODE -ne 0) { throw "FFmpeg concat failed" }

Write-Host "Cleaning up temp files..."
Remove-Item $mixedAudio -ErrorAction SilentlyContinue
Remove-Item $mainBody -ErrorAction SilentlyContinue
Remove-Item $concatFile -ErrorAction SilentlyContinue

Write-Host "Final video generated at: $finalVideo"
Write-Host "Uploading to BunnyCDN..."

$headers = @{ "AccessKey" = $ApiKey; "Accept" = "application/json" }

function Invoke-BunnyJson {
    param($Method, $Uri, $Body = $null)
    $params = @{ Method = $Method; Uri = $Uri; Headers = $headers; ContentType = "application/json" }
    if ($null -ne $Body) { $params.Body = ($Body | ConvertTo-Json -Depth 10) }
    Invoke-RestMethod @params
}

$colName = "Guided Meditations"
$collectionsUri = "https://video.bunnycdn.com/library/$LibraryId/collections?page=1&itemsPerPage=100&search=$([uri]::EscapeDataString($colName))"
$existing = Invoke-BunnyJson -Method "GET" -Uri $collectionsUri
$items = @()
if ($existing.items) { $items = @($existing.items) } elseif ($existing.Collection) { $items = @($existing.Collection) }
$match = $items | Where-Object { $_.name -eq $colName } | Select-Object -First 1

$colId = $null
if ($match) { $colId = $match.guid } else {
    $created = Invoke-BunnyJson -Method "POST" -Uri "https://video.bunnycdn.com/library/$LibraryId/collections" -Body @{ name = $colName }
    $colId = $created.guid
}

$body = @{ title = $Title; collectionId = $colId }
$video = Invoke-BunnyJson -Method "POST" -Uri "https://video.bunnycdn.com/library/$LibraryId/videos" -Body $body
$videoId = $video.guid

Write-Host "Created Video ID: $videoId"
Write-Host "Uploading file..."

$uri = "https://video.bunnycdn.com/library/$LibraryId/videos/$videoId"
curl.exe -X PUT --url $uri --header "AccessKey: $ApiKey" --header "Accept: application/json" --header "Content-Type: application/octet-stream" --data-binary "@$finalVideo" --fail --silent --show-error

if ($LASTEXITCODE -ne 0) {
    throw "curl upload failed with exit code $LASTEXITCODE"
} else {
    Write-Host "Upload successful!"
    Write-Host "BUNNY_VIDEO_ID=$videoId"
}
