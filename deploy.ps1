# Deploy script for thetech.space
# Uses environment variables: FTP_USER, FTP_PASS, FTP_DIR

$ftpHost = "66.102.137.92"
$ftpUser = [System.Environment]::GetEnvironmentVariable('FTP_USER', 'User')
$ftpPass = [System.Environment]::GetEnvironmentVariable('FTP_PASS', 'User')
$ftpDir = [System.Environment]::GetEnvironmentVariable('FTP_DIR', 'User')

if (-not $ftpUser -or -not $ftpPass) {
    Write-Host "Error: FTP environment variables not set" -ForegroundColor Red
    exit 1
}

$localPath = $PSScriptRoot
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deploying thetech.space" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "From: $localPath"
Write-Host "To: ftp://$ftpHost$ftpDir"
Write-Host ""

# Files/folders to exclude
$excludeList = @('.git', 'node_modules', '*.ps1', '*.md', 'tmpclaude-*', '.claude', 'test-ftp.ps1')

# Get all files to upload
$filesToUpload = Get-ChildItem -Path $localPath -Recurse -File | Where-Object {
    $relativePath = $_.FullName.Substring($localPath.Length + 1)
    $exclude = $false
    foreach ($pattern in $excludeList) {
        if ($relativePath -like $pattern -or $relativePath -like "*\$pattern*" -or $_.Name -like $pattern) {
            $exclude = $true
            break
        }
    }
    -not $exclude
}

Write-Host "Found $($filesToUpload.Count) files to upload" -ForegroundColor Yellow
Write-Host ""

$uploaded = 0
$failed = 0

foreach ($file in $filesToUpload) {
    $relativePath = $file.FullName.Substring($localPath.Length + 1).Replace('\', '/')
    $remotePath = "$ftpDir/$relativePath"
    $localFile = $file.FullName

    Write-Host "Uploading: $relativePath" -NoNewline

    try {
        $url = "ftp://$ftpHost$remotePath"
        $creds = "${ftpUser}:${ftpPass}"

        $psi = New-Object System.Diagnostics.ProcessStartInfo
        $psi.FileName = "curl.exe"
        $psi.Arguments = "-T `"$localFile`" --ftp-create-dirs -u `"$creds`" `"$url`""
        $psi.RedirectStandardOutput = $true
        $psi.RedirectStandardError = $true
        $psi.UseShellExecute = $false
        $psi.CreateNoWindow = $true

        $process = [System.Diagnostics.Process]::Start($psi)
        $process.WaitForExit(120000)
        $stderr = $process.StandardError.ReadToEnd()

        if ($process.ExitCode -eq 0) {
            Write-Host " [OK]" -ForegroundColor Green
            $uploaded++
        } else {
            Write-Host " [FAILED]" -ForegroundColor Red
            if ($stderr -and $stderr.Length -lt 200) { Write-Host "  $stderr" -ForegroundColor Red }
            $failed++
        }
    }
    catch {
        Write-Host " [FAILED]" -ForegroundColor Red
        Write-Host "  Error: $_" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deploy Complete!" -ForegroundColor Cyan
Write-Host "  Uploaded: $uploaded files" -ForegroundColor Green
if ($failed -gt 0) {
    Write-Host "  Failed: $failed files" -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Cyan
