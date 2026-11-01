$ErrorActionPreference = "Stop"

Write-Host "KantorKu - Persiapan untuk Windows" -ForegroundColor Cyan

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $repoRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js belum terpasang. Pasang Node.js 22.5 atau lebih baru, lalu jalankan file BAT ini lagi."
    exit 1
}

$nodeVersionText = (node --version).TrimStart("v")
$nodeVersion = [Version]$nodeVersionText
$minimumNodeVersion = [Version]"22.5.0"

if ($nodeVersion -lt $minimumNodeVersion) {
    Write-Error "Versi Node.js $nodeVersion terlalu lama. Dibutuhkan Node.js 22.5 atau lebih baru."
    exit 1
}

if (-not (Test-Path (Join-Path $repoRoot "package-lock.json"))) {
    Write-Error "package-lock.json tidak ditemukan. Ambil berkas KantorKu dari repository atau release yang lengkap."
    exit 1
}

Write-Host "Memasang dependensi..." -ForegroundColor Yellow
npm ci
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Menjalankan KantorKu..." -ForegroundColor Green
$npm = (Get-Command npm.cmd -ErrorAction Stop).Source
$server = Start-Process $npm -ArgumentList "run dev" -WorkingDirectory $repoRoot -PassThru

$url = "http://localhost:3000"
$ready = $false
for ($attempt = 0; $attempt -lt 30; $attempt++) {
    Start-Sleep -Milliseconds 500
    try {
        Invoke-WebRequest $url -UseBasicParsing -TimeoutSec 1 | Out-Null
        $ready = $true
        break
    } catch {}
}

if (-not $ready) {
    Write-Warning "Server belum merespons. Pastikan port 3000 tersedia, lalu buka $url."
} else {
    Start-Process $url
}

Write-Host ""
Write-Host "KantorKu aktif di $url"
Write-Host "Jangan menutup jendela ini selama aplikasi digunakan."
Write-Host "Untuk memasang sebagai aplikasi desktop, buka Chrome/Edge lalu pilih tombol Pasang Aplikasi."
