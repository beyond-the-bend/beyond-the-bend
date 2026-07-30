param(
    [Parameter(Mandatory=$true)][string]$VideoFile,
    [Parameter(Mandatory=$true)][string]$Title,
    [Parameter(Mandatory=$true)][string]$Collection,
    [Parameter(Mandatory=$true)][string]$ApiKey
)

$ErrorActionPreference = "Stop"
$LibraryId = "656394"

Write-Host "Uploading to BunnyCDN..."
$headers = @{ "AccessKey" = $ApiKey; "Accept" = "application/json" }

function Invoke-BunnyJson {
    param($Method, $Uri, $Body = $null)
    $params = @{ Method = $Method; Uri = $Uri; Headers = $headers; ContentType = "application/json" }
    if ($null -ne $Body) { $params.Body = ($Body | ConvertTo-Json -Depth 10) }
    Invoke-RestMethod @params
}

$colName = $Collection
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
curl.exe -X PUT --url $uri --header "AccessKey: $ApiKey" --header "Accept: application/json" --header "Content-Type: application/octet-stream" --data-binary "@$VideoFile" --fail --silent --show-error

if ($LASTEXITCODE -ne 0) {
    throw "curl upload failed with exit code $LASTEXITCODE"
} else {
    Write-Host "Upload successful!"
    Write-Host "BUNNY_VIDEO_ID=$videoId"
}
