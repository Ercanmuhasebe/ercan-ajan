# Ders 15: Android uygulamasi ve APK

Bu derste web uygulamasi Capacitor ile gercek bir Android projesine
donusturulur.

## Yeni kavramlar

- `package.json`: Node paketlerini ve uygulama komutlarini tanimlar.
- `capacitor.config.json`: Android uygulamasinin kimligini tanimlar.
- `www`: Telefona kopyalanacak temiz web paketidir.
- `android`: Android Studio'nun acacagi yerel Android projesidir.
- APK: Android telefona kurulabilen uygulama dosyasidir.

Uygulama kimligi:

```text
io.github.ercanmuhasebe.ercanajan
```

## Web paketini hazirlama

```powershell
npm run build
```

Bu komut gerekli HTML, CSS, JavaScript, manifest ve ikon dosyalarini `www`
klasorune kopyalar.

## Android projesini guncelleme

Web kodunda degisiklik yaptiktan sonra:

```powershell
npm run android:sync
```

Bu komut once `www` paketini olusturur, sonra dosyalari Android projesine
kopyalar.

## Android Studio gereksinimi

Capacitor 8 icin guncel Android Studio ve onunla gelen JDK gereklidir.
Android Studio ilk acilista Android SDK paketlerini de kurar.

Resmi indirme adresi:

```text
https://developer.android.com/studio
```

## Android Studio'da APK

Android Studio kurulduktan ve proje acildiktan sonra:

1. Gradle esitlemesinin tamamlanmasini bekleyin.
2. `Build` menusunu acin.
3. `Build App Bundle(s) / APK(s)` secenegine girin.
4. `Build APK(s)` secenegini secin.

Debug APK genellikle su klasorde olusur:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Tek komutla APK

Android Studio ve SDK kurulduktan sonra VS Code terminalinde:

```powershell
npm run android:apk
```

Bu komut web dosyalarini paketler, Android projesini gunceller, APK'yi
derler ve dosyanin SHA-256 ozetini gosterir.

Ilk basarili APK yaklasik 4 MB boyutunda olusturulmustur.

## Telefon testi

Gercek telefonda test etmek icin Gelistirici Secenekleri ve USB hata ayiklama
acilabilir. APK dosyasi telefona aktarilarak da kurulabilir.

Uygulamayi yalniz kendi urettiginiz APK dosyasindan kurun.
