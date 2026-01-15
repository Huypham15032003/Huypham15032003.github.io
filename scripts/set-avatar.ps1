<#
Usage:
  In PowerShell (from project root) run:
    .\scripts\set-avatar.ps1 -SourcePath "C:\path\to\your\photo.jpg"
  Or open PowerShell in any folder and provide full paths.

What it does:
  - Copies the provided image to the project's assets/avatar.jpg (overwrites if exists)
  - Verifies the copy and prints the new file size
#>
param(
    [Parameter(Mandatory=$true)]
    [string]$SourcePath
)

if (-not (Test-Path $SourcePath)) {
    Write-Error "Source file not found: $SourcePath"
    exit 1
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$destDir = Join-Path $repoRoot 'assets'
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}
$dest = Join-Path $destDir 'avatar.jpg'

try {
    Copy-Item -Path $SourcePath -Destination $dest -Force
    $info = Get-Item $dest
    Write-Host "Copied to: $dest ( $($info.Length) bytes )" -ForegroundColor Green
    Write-Host "Open index.html in browser to verify the avatar shows up. If it doesn't, try clearing browser cache or open in private/incognito window." -ForegroundColor Yellow
} catch {
    Write-Error "Failed to copy: $_"
    exit 1
}

