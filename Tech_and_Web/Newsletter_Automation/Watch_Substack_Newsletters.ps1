$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Resolve-Path (Join-Path $ScriptRoot "..\..")
$NewsletterDir = Join-Path $Root "Content\newsletters"
$Converter = Join-Path $ScriptRoot "newsletter_to_substack.js"
$PidFile = Join-Path $ScriptRoot "substack_watcher.pid"
$StopFile = Join-Path $ScriptRoot "STOP_SUBSTACK_WATCHER.txt"
$LogFile = Join-Path $ScriptRoot "substack_watcher.log"

$PID | Set-Content $PidFile

function Invoke-Converter {
    $Stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "[$Stamp] Checking newsletters." | Tee-Object -FilePath $LogFile -Append
    node $Converter 2>&1 | Tee-Object -FilePath $LogFile -Append
}

Invoke-Converter
$LastSeen = Get-Date

while ($true) {
    if (Test-Path $StopFile) {
        Remove-Item $StopFile -Force
        "Stopping Substack watcher." | Tee-Object -FilePath $LogFile -Append
        break
    }

    $Latest = Get-ChildItem -Path $NewsletterDir -Filter "*.html" -File -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTimeUtc -Descending |
        Select-Object -First 1

    if ($Latest -and $Latest.LastWriteTime -gt $LastSeen) {
        Start-Sleep -Seconds 3
        Invoke-Converter
        $LastSeen = Get-Date
    }

    Start-Sleep -Seconds 10
}
