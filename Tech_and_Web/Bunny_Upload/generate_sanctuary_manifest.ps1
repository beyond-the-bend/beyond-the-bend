$ErrorActionPreference = "Stop"

$source = "D:\Beyond the Bend Yoga Live Classes\Outbox"
$outDir = "C:\BTB\Tech_and_Web\Bunny_Upload"
$manifestPath = Join-Path $outDir "sanctuary-live-studio-upload-manifest.csv"

if (!(Test-Path $source)) {
    throw "Source folder not found: $source"
}

New-Item -ItemType Directory -Path $outDir -Force | Out-Null

$files = Get-ChildItem -Path $source -File |
    Where-Object { $_.Extension -ieq ".mp4" -and $_.Name -match "\(edited\)" } |
    Sort-Object Name

$rows = foreach ($file in $files) {
    $classType = if ($file.Name -match "Restorative") {
        "Restorative"
    } elseif ($file.Name -match "Somatic Vinyasa") {
        "Somatic Vinyasa"
    } elseif ($file.Name -match "Somatikatha|Somatic Hatha") {
        "Somatic Hatha"
    } else {
        "Other"
    }

    [PSCustomObject]@{
        Status = "pending"
        SanctuarySection = "Live Studio Classes"
        ClassType = $classType
        CollectionName = "Live Studio Classes - $classType"
        Title = [System.IO.Path]::GetFileNameWithoutExtension($file.Name) -replace "\s+\(edited\)(\s+\(rerun\))?$", ""
        FileName = $file.Name
        FullPath = $file.FullName
        SizeGB = [math]::Round($file.Length / 1GB, 2)
        LastWriteTime = $file.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss")
        BunnyVideoId = ""
        BunnyStatus = ""
        UploadedAt = ""
        Notes = ""
    }
}

$rows | Export-Csv -Path $manifestPath -NoTypeInformation -Encoding UTF8

$rows |
    Group-Object ClassType |
    Sort-Object Name |
    Select-Object Name, Count | Format-Table -AutoSize

"Manifest: $manifestPath"
"Total videos: $($rows.Count)"
"Total GB: $([math]::Round(($files | Measure-Object Length -Sum).Sum / 1GB, 2))"
