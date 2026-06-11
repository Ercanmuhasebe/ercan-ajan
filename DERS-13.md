# Ders 13: PWA ile mobil uygulama modu

PWA, web uygulamasinin telefona veya bilgisayara uygulama gibi kurulmasini
saglayan yapidir.

## Manifest

`manifest.webmanifest` uygulamanin kimligini tanimlar:

- Uygulama adi
- Ikonlar
- Tema rengi
- Baslangic adresi
- Telefon ekranindaki gorunum

## Service worker

`sw.js`, temel uygulama dosyalarini tarayici onbellegine kaydeder:

```javascript
caches.open(cacheName).then(function (cache) {
  return cache.addAll(appShell);
});
```

Sunucu veya internet yokken onbellekteki ekran acilabilir. Gorevler ve yerel
ajan zaten `localStorage` kullandigi icin cevrimdisi calismaya devam eder.

Hava durumu ve OpenAI bolumleri internet gerektirir.

## Kurulum olayi

Tarayici uygulamayi kurulabilir buldugunda `beforeinstallprompt` olayi
olusur. Uygulama bu olayi saklar ve kullanici `Uygulamayi kur` dugmesine
bastiginda kurulum penceresini acar.

## Guvenli baglanti kosulu

Service worker ve telefon kurulumu guvenli baglanti ister:

- Gelistirme bilgisayarinda `http://localhost` veya `127.0.0.1` kullanilabilir.
- Gercek telefona kurulum icin uygulamanin daha sonra HTTPS kullanan bir
  sunucuya yayinlanmasi gerekir.

## Test

1. VS Code'da F5 ile uygulamayi acin.
2. Ustte `Cevrimici` durumunu kontrol edin.
3. Tarayici kurulum sundugunda `Uygulamayi kur` dugmesine basin.
4. Edge gelistirici araclarinda Application bolumunden manifest ve service
   worker kaydini kontrol edin.
5. Interneti kapatip sayfayi yenileyin; temel uygulama acilmalidir.
