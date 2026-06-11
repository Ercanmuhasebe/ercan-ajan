$secureKey = Read-Host "OpenAI API anahtarinizi girin" -AsSecureString
$pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureKey)

try {
    $plainKey = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)

    if ([string]::IsNullOrWhiteSpace($plainKey)) {
        Write-Error "API anahtari bos olamaz."
        exit 1
    }

    [Environment]::SetEnvironmentVariable(
        "OPENAI_API_KEY",
        $plainKey.Trim(),
        "User"
    )

    Write-Output "OPENAI_API_KEY kullanici ortam degiskenine kaydedildi."
    Write-Output "VS Code'u tamamen kapatip yeniden acin."
}
finally {
    if ($pointer -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
    }

    Remove-Variable plainKey -ErrorAction SilentlyContinue
}
