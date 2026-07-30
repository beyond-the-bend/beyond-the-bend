$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$PidFile = Join-Path $ScriptRoot "substack_watcher.pid"
$StopFile = Join-Path $ScriptRoot "STOP_SUBSTACK_WATCHER.txt"

if (Test-Path $PidFile) {
    $ExistingPid = Get-Content $PidFile -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($ExistingPid -and (Get-Process -Id $ExistingPid -ErrorAction SilentlyContinue)) {
        "stop" | Set-Content $StopFile
        Start-Sleep -Seconds 2
        if (Get-Process -Id $ExistingPid -ErrorAction SilentlyContinue) {
            Stop-Process -Id $ExistingPid -Force
        }
    }
    Remove-Item $PidFile -Force -ErrorAction SilentlyContinue
}
