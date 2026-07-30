$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$PidFile = Join-Path $ScriptRoot "substack_watcher.pid"
$StopFile = Join-Path $ScriptRoot "STOP_SUBSTACK_WATCHER.txt"
$LogFile = Join-Path $ScriptRoot "substack_watcher.log"
$WatcherScript = Join-Path $ScriptRoot "Watch_Substack_Newsletters.ps1"

if (Test-Path $PidFile) {
    $ExistingPid = Get-Content $PidFile -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($ExistingPid -and (Get-Process -Id $ExistingPid -ErrorAction SilentlyContinue)) {
        "Substack watcher is already running with process id $ExistingPid." | Tee-Object -FilePath $LogFile -Append
        exit 0
    }
}

if (Test-Path $StopFile) {
    Remove-Item $StopFile -Force
}

$Process = Start-Process -FilePath "powershell.exe" -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$WatcherScript`"" -WindowStyle Hidden -PassThru
$Process.Id | Set-Content $PidFile
"Started Substack watcher with process id $($Process.Id)." | Tee-Object -FilePath $LogFile -Append
