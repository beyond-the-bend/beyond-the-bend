# BTB Video Render Helper

Write-Host "--- Beyond the Bend: Remotion Video Processor ---" -ForegroundColor Cyan

# Check for node_modules
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies... this only happens once." -ForegroundColor Yellow
    npm.cmd install
}

# Run the render command
Write-Host "Starting video render..." -ForegroundColor Green
npx.cmd remotion render src/index.ts Main btb_processed_video.mp4

if ($LASTEXITCODE -eq 0) {
    Write-Host "Success! Your video is ready: btb_processed_video.mp4" -ForegroundColor Green
} else {
    Write-Host "Something went wrong during the render. Please check the errors above." -ForegroundColor Red
}

Read-Host "Press Enter to exit..."
