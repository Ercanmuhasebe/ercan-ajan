# Ders 14: Uygulamayi internete yayinlama

Bu derste uygulama GitHub Pages ile ucretsiz olarak yayinlanir.

## Neden GitHub Pages?

- HTML, CSS ve JavaScript dosyalarini dogrudan yayinlar.
- Ucretsiz bir `github.io` adresi verir.
- HTTPS baglantisi saglar.
- PWA ve service worker guvenli baglantida calisir.

## Sinir

GitHub Pages yalnizca statik dosyalari calistirir. `server.js` calismaz.
Bu nedenle yayinlanan uygulamada OpenAI bolumu kapali olur.

Gorev listesi, sayac, selamlama, hava durumu, yerel ajan, ajan hafizasi ve
PWA ozellikleri calismaya devam eder.

## 1. GitHub'da bos depo olusturma

1. `https://github.com/new` adresini acin.
2. Repository name alanina `ercan-ajan` yazin.
3. `Public` secenegini secin.
4. README, `.gitignore` ve license eklemeyin.
5. `Create repository` dugmesine basin.

## 2. Yerel depoyu GitHub'a baglama

GitHub kullanici adinizi asagidaki adreste `KULLANICI-ADINIZ` yerine yazin:

```powershell
git remote add origin https://github.com/KULLANICI-ADINIZ/ercan-ajan.git
git push -u origin main
```

## 3. GitHub Pages'i acma

1. GitHub'daki `ercan-ajan` deposunu acin.
2. `Settings` bolumune girin.
3. Sol menuden `Pages` secenegini acin.
4. Source alaninda `Deploy from a branch` secin.
5. Branch olarak `main`, klasor olarak `/(root)` secin.
6. `Save` dugmesine basin.

Yayin adresi su bicimde olur:

```text
https://KULLANICI-ADINIZ.github.io/ercan-ajan/
```

Ilk yayin birkac dakika surebilir.

## 4. Kontrol

1. Yayin adresini acin.
2. Adresin `https://` ile basladigini kontrol edin.
3. Gorev ekleyin ve sayfayi yenileyin.
4. Hava durumu dugmesini deneyin.
5. Tarayicinin uygulama kurma secenegini kontrol edin.

## Sonraki yayinlar

Yeni degisiklikleri internete gondermek icin:

```powershell
git add .
git commit -m "Aciklayici mesaj"
git push
```
