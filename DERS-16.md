# Ders 16: Telefonda dokunsal geri bildirim

Bu derste gorev dugmeleri Android telefonun titresim sistemine baglandi.

## Yeni kavram

Dokunsal geri bildirim, kullanicinin yaptigi islemi ekrana bakmadan da
hissetmesini saglayan kisa titresim veya dokunus etkisidir.

Uygulamadaki davranis:

- `Tamamla`: Basarili islem bildirimi verir.
- `Geri al`: Hafif bir dokunus etkisi verir.
- Eklenti kullanilamiyorsa tarayicinin `navigator.vibrate` ozelligi denenir.
- Cihaz titresimi desteklemiyorsa uygulama hata vermeden calismaya devam eder.

## Capacitor eklentisi

Projeye resmi Haptics eklentisi eklendi:

```powershell
npm install @capacitor/haptics
```

Android projesini eklentiyle esitlemek icin:

```powershell
npm run android:sync
```

## JavaScript baglantisi

Android uygulamasinda Capacitor eklentisine su nesneyle ulasilir:

```javascript
window.Capacitor.Plugins.Haptics
```

Gorev tamamlanirken:

```javascript
await haptics.notification({ type: "SUCCESS" });
```

Gorev geri alinirken:

```javascript
await haptics.impact({ style: "LIGHT" });
```

## APK olusturma

```powershell
npm run android:apk
```

Olusan APK:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Telefon testi

1. Yeni APK'yi telefona kurun.
2. Bir gorev ekleyin.
3. `Tamamla` dugmesine basin ve titresimi hissedin.
4. `Geri al` dugmesine basin; daha hafif etkiyi kontrol edin.

Telefon sessiz modda olsa bile titresim ayarlari cihaz ureticisine gore
etkiyi azaltabilir veya kapatabilir.
