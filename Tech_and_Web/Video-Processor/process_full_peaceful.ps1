$ffmpegPath = "C:\Users\coach\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.WinGet.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"
$intro = "C:\BTB\Remotion-Video-Processor\public\Restorative_Intro.mp4"
$main = "C:\BTB\Remotion-Video-Processor\public\APeacefulRestorativeMorning.mp4"
$outro = "C:\BTB\Remotion-Video-Processor\public\Rising_Moon_Outro.mp4"
$output = "C:\BTB\Video-Processor\finished_videos\FINISHED_Peaceful_Restoration_Morning.mp4"

# Create output dir if missing
if (!(Test-Path "C:\BTB\Video-Processor\finished_videos")) {
    New-Item -ItemType Directory -Path "C:\BTB\Video-Processor\finished_videos"
}

Write-Host "Starting Full Video Process (Intro + Fixed Main + Outro)..."
Write-Host "This will take about 20-30 minutes. You can walk away now!"

# Filter Complex:
# 1. Take the main video (input [1:v]) and apply the curves filter to it -> [fixed_main]
# 2. Concat the intro, the fixed_main with its audio, and the outro.
# Note: Using veryfast preset to speed up the process while maintaining good quality.

$filter = "[1:v]curves=all='0/0 0.5/0.5 0.8/0.78 1/0.85'[fixed_v_main]; [0:v][0:a][fixed_v_main][1:a][2:v][2:a]concat=n=3:v=1:a=1[v][a]"

& $ffmpegPath -i $intro -i $main -i $outro -filter_complex $filter -map "[v]" -map "[a]" -c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 192k $output -y

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSUCCESS! Your video is ready at: $output" -ForegroundColor Green
}
else {
    Write-Host "`nSomething went wrong. Please check the logs." -ForegroundColor Red
}
