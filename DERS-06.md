# Ders 6: LocalStorage ile kalici veri

JavaScript degiskenleri sayfa kapaninca silinir. `localStorage`, veriyi
tarayicida saklar ve sonraki acilista yeniden kullanmamizi saglar.

## Kaydetme

`localStorage` yalnizca metin saklar. Bu nedenle gorev dizisini once JSON
metnine ceviriyoruz:

```javascript
localStorage.setItem(storageKey, JSON.stringify(tasks));
```

- `JSON.stringify`: Dizi ve nesneleri metne cevirir.
- `setItem`: Metni belirtilen anahtarla tarayiciya kaydeder.

## Yukleme

```javascript
const savedTasks = localStorage.getItem(storageKey);
const parsedTasks = JSON.parse(savedTasks);
```

- `getItem`: Kayitli metni getirir.
- `JSON.parse`: Metni yeniden dizi ve nesnelere donusturur.

## Anahtar

```javascript
const storageKey = "ercan-gorev-listesi";
```

Anahtar, Excel'deki adlandirilmis alan veya veritabanindaki tablo adi gibi
kaydin nerede tutuldugunu belirtir.

## try ve catch

```javascript
try {
  // Kaydetmeyi dene.
} catch (error) {
  // Hata olursa uygulamayi durdurma.
}
```

Tarayici depolamaya izin vermezse veya kayit bozulursa uygulama calismaya
devam eder.

## Test

1. Uc gorev ekleyin.
2. Bir gorevi tamamlayin.
3. Edge penceresini kapatin.
4. VS Code'da yeniden F5'e basin.
5. Gorevlerin ve tamamlanma durumunun geri geldigini kontrol edin.
6. Bir gorevi silip sayfayi yeniden acarak silinmis kaldigini dogrulayin.
