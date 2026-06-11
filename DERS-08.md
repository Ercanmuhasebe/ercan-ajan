# Ders 8: API ve fetch

API, iki yazilimin birbiriyle veri alisverisi yapmasini saglayan arayuzdur.
Bu derste uygulama Open-Meteo servisine istek gonderir ve JSON cevabini
ekranda gosterir.

## Istek gondermek

```javascript
const response = await fetch(apiUrl);
```

- `fetch`: Internet adresine HTTP istegi gonderir.
- `await`: Cevap gelene kadar bu fonksiyonun beklemesini saglar.
- `async`: Fonksiyonun beklemeli islemler kullanabilecegini belirtir.

## HTTP sonucunu kontrol etmek

```javascript
if (!response.ok) {
  throw new Error(`HTTP hatasi: ${response.status}`);
}
```

Sunucu 404 veya 500 gibi bir hata dondururse uygulama bunu basarili cevap
olarak kabul etmez.

## JSON cevabini okumak

```javascript
const data = await response.json();
```

Sunucudan gelen JSON metni JavaScript nesnesine donusturulur.

## Hata yonetimi

```javascript
try {
  // API istegini dene.
} catch (error) {
  // Internet veya sunucu hatasini kullaniciya bildir.
} finally {
  // Basarili veya hatali olsa da dugmeyi yeniden etkinlestir.
}
```

## Yapay zeka API'leriyle baglantisi

Bir yapay zeka API'sinde de temel akis aynidir:

1. API adresine istek gonderilir.
2. Gerekli bilgiler JSON olarak iletilir.
3. Sunucunun JSON cevabi okunur.
4. Sonuc uygulamada gosterilir.
5. Hatalar ve bekleme durumu yonetilir.

## Test

1. `Hava durumunu getir` dugmesine basin.
2. Bekleme mesajini gozlemleyin.
3. Istanbul hava verisinin ekrana geldigini kontrol edin.
4. Interneti gecici kapatip tekrar deneyerek hata mesajini kontrol edin.
