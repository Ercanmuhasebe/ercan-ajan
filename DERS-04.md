# Ders 4: Diziler ve donguler

Bu derste birden fazla gorevi tek degiskende saklamayi ve ekrana yazdirmayi
ogreniyoruz.

## Dizi

```javascript
const tasks = [];
```

`tasks`, birden fazla deger saklayabilen bos bir dizidir. VBA'daki dizi veya
bir Excel sutunundaki kayitlar gibi dusunulebilir.

## Diziye eleman eklemek

```javascript
tasks.push(newTask);
```

`push`, yeni gorevi dizinin sonuna ekler.

## Diziyi dolasmak

```javascript
tasks.forEach(function (task, index) {
  // Her gorev icin bir liste elemani olusturulur.
});
```

`forEach`, dizideki her gorev icin ayni kodu bir kez calistirir. VBA'daki
`For Each` dongusune benzer.

## Eleman sayisi

```javascript
tasks.length
```

`length`, dizide kac gorev oldugunu verir.

## Test

1. Bos kutuyla `Gorev ekle` dugmesine basin.
2. Uc farkli gorev ekleyin.
3. Gorev numaralarinin ve toplam gorev sayisinin degistigini gozlemleyin.
4. Sayfayi yenileyin. Liste simdilik silinir; kalici veri saklamayi sonraki
   derslerde ogrenecegiz.
