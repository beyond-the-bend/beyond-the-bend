param(
    [string]$ManifestPath = "C:\BTB\Tech_and_Web\Bunny_Upload\sanctuary-live-studio-upload-manifest.csv",
    [string]$LibraryId = "656394",
    [string]$ApiKey = $env:BUNNY_STREAM_API_KEY,
    [int]$Limit = 0,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($ApiKey)) {
    throw "Missing Bunny Stream API key. Set BUNNY_STREAM_API_KEY or pass -ApiKey."
}

if (!(Test-Path $ManifestPath)) {
    throw "Manifest not found: $ManifestPath"
}

$logDir = "C:\BTB\Tech_and_Web\Bunny_Upload\logs"
New-Item -ItemType Directory -Path $logDir -Force | Out-Null
$logPath = Join-Path $logDir ("upload-log-" + (Get-Date -Format "yyyyMMdd-HHmmss") + ".jsonl")

$headers = @{
    "AccessKey" = $ApiKey
    "Accept" = "application/json"
}

function Write-UploadLog {
    param([hashtable]$Entry)
    ($Entry | ConvertTo-Json -Compress) | Add-Content -Path $logPath -Encoding UTF8
}

function Invoke-BunnyJson {
    param(
        [string]$Method,
        [string]$Uri,
        [object]$Body = $null
    )

    $params = @{
        Method = $Method
        Uri = $Uri
        Headers = $headers
        ContentType = "application/json"
    }

    if ($null -ne $Body) {
        $params.Body = ($Body | ConvertTo-Json -Depth 10)
    }

    Invoke-RestMethod @params
}

function Get-OrCreateCollection {
    param([string]$Name)

    $collectionsUri = "https://video.bunnycdn.com/library/$LibraryId/collections?page=1&itemsPerPage=100&search=$([uri]::EscapeDataString($Name))"
    $existing = Invoke-BunnyJson -Method "GET" -Uri $collectionsUri

    $items = @()
    if ($existing.items) { $items = @($existing.items) }
    elseif ($existing.Collection) { $items = @($existing.Collection) }

    $match = $items | Where-Object { $_.name -eq $Name } | Select-Object -First 1
    if ($match) {
        return $match.guid
    }

    $created = Invoke-BunnyJson -Method "POST" -Uri "https://video.bunnycdn.com/library/$LibraryId/collections" -Body @{ name = $Name }
    return $created.guid
}

function New-BunnyVideo {
    param(
        [string]$Title,
        [string]$CollectionId
    )

    $body = @{ title = $Title }
    if (![string]::IsNullOrWhiteSpace($CollectionId)) {
        $body.collectionId = $CollectionId
    }

    Invoke-BunnyJson -Method "POST" -Uri "https://video.bunnycdn.com/library/$LibraryId/videos" -Body $body
}

function Send-BunnyVideoFile {
    param(
        [string]$VideoId,
        [string]$Path
    )

    $uri = "https://video.bunnycdn.com/library/$LibraryId/videos/$VideoId"
    
    curl.exe -X PUT --url $uri --header "AccessKey: $ApiKey" --header "Accept: application/json" --header "Content-Type: application/octet-stream" --data-binary "@$Path" --fail --silent --show-error
    if ($LASTEXITCODE -ne 0) {
        throw "curl failed with exit code $LASTEXITCODE"
    }
}

$rows = @(Import-Csv -Path $ManifestPath)
$pending = @($rows | Where-Object { $_.Status -eq "pending" })
if ($Limit -gt 0) {
    $pending = @($pending | Select-Object -First $Limit)
}

Write-Host "Manifest: $ManifestPath"
Write-Host "Pending selected: $($pending.Count)"
Write-Host "Log: $logPath"

if ($DryRun) {
    $pending | Select-Object Status, ClassType, Title, SizeGB, FullPath | Format-Table -AutoSize
    return
}

$collectionCache = @{}

foreach ($row in $pending) {
    $started = Get-Date
    Write-Host ""
    Write-Host "Uploading: $($row.Title)"
    Write-Host "Class: $($row.ClassType) | Size: $($row.SizeGB) GB"

    try {
        if (!(Test-Path $row.FullPath)) {
            throw "File not found: $($row.FullPath)"
        }

        $collectionName = $row.CollectionName
        if (!$collectionCache.ContainsKey($collectionName)) {
            $collectionCache[$collectionName] = Get-OrCreateCollection -Name $collectionName
        }

        $videoId = $row.BunnyVideoId
        if ([string]::IsNullOrWhiteSpace($videoId)) {
            $video = New-BunnyVideo -Title $row.Title -CollectionId $collectionCache[$collectionName]
            $videoId = $video.guid
            if ([string]::IsNullOrWhiteSpace($videoId)) {
                throw "Bunny did not return a video ID for $($row.Title)"
            }
            $row.BunnyVideoId = $videoId
            $rows | Export-Csv -Path $ManifestPath -NoTypeInformation -Encoding UTF8
        }

        Send-BunnyVideoFile -VideoId $videoId -Path $row.FullPath | Out-Null

        $row.Status = "uploaded"
        $row.BunnyStatus = "uploaded_to_bunny_processing"
        $row.UploadedAt = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        $row.Notes = ""

        Write-UploadLog @{
            time = (Get-Date).ToString("o")
            status = "uploaded"
            title = $row.Title
            classType = $row.ClassType
            file = $row.FullPath
            bunnyVideoId = $videoId
            seconds = [math]::Round(((Get-Date) - $started).TotalSeconds, 1)
        }
    } catch {
        $row.Status = "error"
        $row.BunnyStatus = "error"
        $row.Notes = $_.Exception.Message

        Write-UploadLog @{
            time = (Get-Date).ToString("o")
            status = "error"
            title = $row.Title
            classType = $row.ClassType
            file = $row.FullPath
            error = $_.Exception.Message
        }

        $rows | Export-Csv -Path $ManifestPath -NoTypeInformation -Encoding UTF8
        Write-Host "Error uploading $($row.Title): $($_.Exception.Message)" -ForegroundColor Red
    }

    $rows | Export-Csv -Path $ManifestPath -NoTypeInformation -Encoding UTF8
}

Write-Host ""
Write-Host "Upload pass complete."
Write-Host "Uploaded now: $($pending.Count)"
Write-Host "Manifest updated: $ManifestPath"
