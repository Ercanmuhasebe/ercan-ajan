$ErrorActionPreference = "Stop"

$projectDirectory = Split-Path -Parent $PSScriptRoot
$androidDirectory = Join-Path $projectDirectory "android"
$javaHome = "C:\Program Files\Android\Android Studio\jbr"
$androidHome = Join-Path $env:LOCALAPPDATA "Android\Sdk"
$nodeExecutable = $env:npm_node_execpath
$capacitorCli = Join-Path `
  $projectDirectory `
  "node_modules\@capacitor\cli\bin\capacitor"

if (-not (Test-Path -LiteralPath $javaHome)) {
  throw "Android Studio JDK bulunamadi: $javaHome"
}

if (-not (Test-Path -LiteralPath $androidHome)) {
  throw "Android SDK bulunamadi: $androidHome"
}

if (-not $nodeExecutable -or -not (Test-Path -LiteralPath $nodeExecutable)) {
  throw "Bu komutu npm run android:apk ile calistirin."
}

$env:JAVA_HOME = $javaHome
$env:ANDROID_HOME = $androidHome
$env:PATH = "$javaHome\bin;$androidHome\platform-tools;$env:PATH"

Push-Location $projectDirectory
try {
  & $nodeExecutable "scripts\build-web.js"
  if ($LASTEXITCODE -ne 0) {
    throw "Web paketi olusturulamadi."
  }

  & $nodeExecutable $capacitorCli sync android
  if ($LASTEXITCODE -ne 0) {
    throw "Android projesi esitlemesi basarisiz oldu."
  }

  Push-Location $androidDirectory
  try {
    & ".\gradlew.bat" assembleDebug
    if ($LASTEXITCODE -ne 0) {
      throw "APK derlemesi basarisiz oldu."
    }
  } finally {
    Pop-Location
  }
} finally {
  Pop-Location
}

$apkPath = Join-Path `
  $androidDirectory `
  "app\build\outputs\apk\debug\app-debug.apk"
$apk = Get-Item -LiteralPath $apkPath
$hash = Get-FileHash -LiteralPath $apkPath -Algorithm SHA256

Write-Output ""
Write-Output "APK hazir: $($apk.FullName)"
Write-Output "Boyut: $([math]::Round($apk.Length / 1MB, 2)) MB"
Write-Output "SHA-256: $($hash.Hash)"
