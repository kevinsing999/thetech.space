# Test FTP connection
$ftpHost = [System.Environment]::GetEnvironmentVariable('FTP_HOST', 'User')
$ftpUser = [System.Environment]::GetEnvironmentVariable('FTP_USER', 'User')
$ftpPass = [System.Environment]::GetEnvironmentVariable('FTP_PASS', 'User')

Write-Host "Testing connection to: $ftpHost"
Write-Host "Username: $ftpUser"

try {
    $request = [System.Net.FtpWebRequest]::Create("ftp://$ftpHost/")
    $request.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
    $request.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
    $request.UsePassive = $true
    $request.EnableSsl = $false
    $request.Timeout = 30000

    Write-Host "Attempting connection..."
    $response = $request.GetResponse()
    Write-Host "SUCCESS! Connected to FTP server" -ForegroundColor Green

    $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
    Write-Host "Root directory contents:"
    Write-Host $reader.ReadToEnd()
    $reader.Close()
    $response.Close()
}
catch {
    Write-Host "FAILED: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Inner Exception: $($_.Exception.InnerException)" -ForegroundColor Red
}
