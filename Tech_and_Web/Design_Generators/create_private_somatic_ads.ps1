Add-Type -AssemblyName System.Drawing

$outDir = "C:\BTB\Brand_Assets\Social_Ads\Private_Somatic_Work"
$portraitPath = "C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play\assets\laura_tree_portrait.jpg"
$studioPath = "C:\BTB\Tech_and_Web\New_Website\Codex_Concept_Play\assets\hero_laura.png"

function New-Canvas($width, $height, $bg) {
    $bmp = New-Object System.Drawing.Bitmap $width, $height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.Clear([System.Drawing.ColorTranslator]::FromHtml($bg))
    return @($bmp, $g)
}

function Get-Font($family, $size, $style) {
    $unit = [System.Drawing.GraphicsUnit]::Pixel
    return New-Object System.Drawing.Font($family, $size, $style, $unit)
}

function Draw-WrappedText($g, $text, $font, $brush, $x, $y, $w, $lineHeight, $align) {
    $format = New-Object System.Drawing.StringFormat
    if ($align -eq "center") { $format.Alignment = [System.Drawing.StringAlignment]::Center }
    elseif ($align -eq "right") { $format.Alignment = [System.Drawing.StringAlignment]::Far }
    else { $format.Alignment = [System.Drawing.StringAlignment]::Near }
    $format.LineAlignment = [System.Drawing.StringAlignment]::Near
    $rect = New-Object System.Drawing.RectangleF $x, $y, $w, 2000
    $g.DrawString($text, $font, $brush, $rect, $format)
}

function Draw-CoverImage($g, $imagePath, $x, $y, $w, $h) {
    $img = [System.Drawing.Image]::FromFile($imagePath)
    $scale = [Math]::Max($w / $img.Width, $h / $img.Height)
    $sw = [Math]::Round($w / $scale)
    $sh = [Math]::Round($h / $scale)
    $sx = [Math]::Round(($img.Width - $sw) / 2)
    $sy = [Math]::Round(($img.Height - $sh) / 2)
    $src = New-Object System.Drawing.Rectangle $sx, $sy, $sw, $sh
    $dst = New-Object System.Drawing.Rectangle $x, $y, $w, $h
    $g.DrawImage($img, $dst, $src, [System.Drawing.GraphicsUnit]::Pixel)
    $img.Dispose()
}

function Draw-RoundedRect($g, $x, $y, $w, $h, $radius, $brush) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $radius * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    $g.FillPath($brush, $path)
    $path.Dispose()
}

$cream = "#F4EFE7"
$sage = "#4F6049"
$softSage = "#A8B5A2"
$ink = "#30362F"
$muted = "#6F7569"
$warm = "#DED3C3"

$sageBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($sage))
$softSageBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($softSage))
$inkBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($ink))
$mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($muted))
$creamBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($cream))
$warmBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($warm))

$serif72 = Get-Font "Georgia" 72 ([System.Drawing.FontStyle]::Regular)
$serif66 = Get-Font "Georgia" 66 ([System.Drawing.FontStyle]::Regular)
$serif58 = Get-Font "Georgia" 58 ([System.Drawing.FontStyle]::Regular)
$serif44 = Get-Font "Georgia" 44 ([System.Drawing.FontStyle]::Regular)
$serif34 = Get-Font "Georgia" 34 ([System.Drawing.FontStyle]::Regular)
$sans36 = Get-Font "Arial" 36 ([System.Drawing.FontStyle]::Regular)
$sans30 = Get-Font "Arial" 30 ([System.Drawing.FontStyle]::Regular)
$sans28 = Get-Font "Arial" 28 ([System.Drawing.FontStyle]::Regular)
$sans24 = Get-Font "Arial" 24 ([System.Drawing.FontStyle]::Regular)
$sans22 = Get-Font "Arial" 22 ([System.Drawing.FontStyle]::Regular)
$sans20Bold = Get-Font "Arial" 20 ([System.Drawing.FontStyle]::Bold)
$sans18 = Get-Font "Arial" 18 ([System.Drawing.FontStyle]::Regular)

# Square social post
$canvas = New-Canvas 1080 1080 $cream
$bmp = $canvas[0]
$g = $canvas[1]
Draw-CoverImage $g $portraitPath 0 0 490 1080
$overlay = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 79, 96, 73))
$g.FillRectangle($overlay, 0, 0, 490, 1080)
Draw-WrappedText $g "Beyond the Bend" $sans24 $sageBrush 610 78 350 40 "left"
Draw-WrappedText $g "Private Somatic and Restorative Sessions" $serif58 $inkBrush 610 180 400 260 "left"
Draw-WrappedText $g "When you have been carrying too much for too long." $sans30 $mutedBrush 610 500 370 140 "left"
$pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($softSage)), 4
$g.DrawLine($pen, 610, 670, 960, 670)
Draw-WrappedText $g "Quiet support. Gentle movement. A place to feel yourself again." $serif34 $inkBrush 610 720 380 180 "left"
Draw-RoundedRect $g 610 945 315 58 28 $sageBrush
Draw-WrappedText $g "Message Laura" $sans20Bold $creamBrush 610 962 315 40 "center"
$bmp.Save("$outDir\Private_Somatic_Square.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

# Clean square social image with no fake button
$canvas = New-Canvas 1080 1080 $cream
$bmp = $canvas[0]
$g = $canvas[1]
Draw-CoverImage $g $portraitPath 0 0 490 1080
$overlay = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 79, 96, 73))
$g.FillRectangle($overlay, 0, 0, 490, 1080)
Draw-WrappedText $g "Beyond the Bend" $sans24 $sageBrush 610 92 350 40 "left"
Draw-WrappedText $g "Private Somatic and Restorative Sessions" $serif58 $inkBrush 610 205 400 260 "left"
Draw-WrappedText $g "When you have been carrying too much for too long." $sans30 $mutedBrush 610 535 370 140 "left"
$pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($softSage)), 4
$g.DrawLine($pen, 610, 705, 960, 705)
Draw-WrappedText $g "Quiet support. Gentle movement. A place to feel yourself again." $serif34 $inkBrush 610 760 380 180 "left"
$bmp.Save("$outDir\Private_Somatic_Square_No_Button.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

# Vertical story post
$canvas = New-Canvas 1080 1920 $cream
$bmp = $canvas[0]
$g = $canvas[1]
Draw-CoverImage $g $portraitPath 0 0 1080 850
$shade = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(92, 48, 54, 47))
$g.FillRectangle($shade, 0, 0, 1080, 850)
Draw-WrappedText $g "A quiet place to be supported" $serif66 $creamBrush 90 560 880 190 "center"
Draw-WrappedText $g "PRIVATE SOMATIC AND RESTORATIVE SESSIONS" $sans22 $sageBrush 90 940 900 40 "center"
Draw-WrappedText $g "For overwhelm, exhaustion, change, and returning to yourself." $serif44 $inkBrush 130 1045 820 240 "center"
$g.DrawLine($pen, 250, 1330, 830, 1330)
Draw-WrappedText $g "One to one support with Laura through gentle movement, restorative practice, body awareness, nervous system support, and quiet integration." $sans28 $mutedBrush 150 1410 780 240 "center"
Draw-RoundedRect $g 260 1720 560 70 34 $sageBrush
Draw-WrappedText $g "Begin with a complimentary conversation" $sans20Bold $creamBrush 270 1742 540 40 "center"
Draw-WrappedText $g "Beyond the Bend" $sans24 $sageBrush 90 1835 900 40 "center"
$bmp.Save("$outDir\Private_Somatic_Story.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

# Website banner
$canvas = New-Canvas 1600 700 $cream
$bmp = $canvas[0]
$g = $canvas[1]
Draw-CoverImage $g $studioPath 0 0 700 700
$g.FillRectangle($overlay, 0, 0, 700, 700)
Draw-WrappedText $g "Private Somatic and Restorative Sessions" $serif58 $inkBrush 790 105 650 180 "left"
Draw-WrappedText $g "One to one support with Laura for overwhelm, exhaustion, change, and coming home to yourself." $sans30 $mutedBrush 795 315 590 120 "left"
$g.DrawLine($pen, 795, 470, 1370, 470)
Draw-WrappedText $g "Available by appointment at Rising Moon Studio" $sans28 $inkBrush 795 525 650 60 "left"
Draw-RoundedRect $g 795 610 350 58 28 $sageBrush
Draw-WrappedText $g "Learn more" $sans20Bold $creamBrush 795 627 350 40 "center"
$bmp.Save("$outDir\Private_Somatic_Website_Banner.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

$sageBrush.Dispose()
$softSageBrush.Dispose()
$inkBrush.Dispose()
$mutedBrush.Dispose()
$creamBrush.Dispose()
$warmBrush.Dispose()
$pen.Dispose()
