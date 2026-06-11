# Ders 7: Filtreleme ve duzenleme

Bu derste bir dizinin tamamini gostermek yerine kosula uyan kayitlari
seciyoruz ve var olan bir nesnenin metnini degistiriyoruz.

## filter

Bekleyen gorevleri secmek:

```javascript
tasks.filter(function (task) {
  return !task.completed;
});
```

Tamamlanan gorevleri secmek:

```javascript
tasks.filter(function (task) {
  return task.completed;
});
```

`filter`, asil diziyi silmez veya degistirmez. Kosula uyan elemanlardan yeni
bir dizi uretir.

## Uygulama durumu

```javascript
let currentFilter = "all";
let editingTaskId = null;
```

- `currentFilter`: Hangi listenin gosterilecegini tutar.
- `editingTaskId`: Hangi gorevin duzenlendigini tutar.
- `null`: Su anda duzenlenen gorev olmadigini belirtir.

## Nesne ozelligini degistirmek

```javascript
task.text = editedText;
```

Bu satir, bulunan gorev nesnesinin `text` degerini yenisiyle degistirir.
Ardindan `saveTasks()` ile localStorage kaydi yenilenir.

## Test

1. Uc gorev ekleyin ve birini tamamlayin.
2. `Bekleyenler` filtresinde yalnizca iki gorev gorundugunu kontrol edin.
3. `Tamamlananlar` filtresinde yalnizca tamamlanan gorevi kontrol edin.
4. Bir gorevin `Duzenle` dugmesine basin ve metnini degistirin.
5. Bos metni kaydetmeyi deneyin; uyarinin gorundugunu kontrol edin.
6. Edge'i kapatip yeniden F5'e basin; duzenlenen metin korunmalidir.
