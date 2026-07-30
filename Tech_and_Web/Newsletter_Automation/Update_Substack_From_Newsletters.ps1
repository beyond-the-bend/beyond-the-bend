$ScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$Converter = Join-Path $ScriptRoot "newsletter_to_substack.js"
node $Converter
