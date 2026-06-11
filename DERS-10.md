# Ders 10: Ucretsiz yerel ajan

Bu derste buyuk dil modeli kullanmadan bir ajan dongusu kuruyoruz. Amac,
ajan mimarisini ucretsiz ve gorunur kurallarla anlamaktir.

## Ajan nedir?

Bir ajan yalnizca cevap ureten sohbet kutusu degildir. Genel dongusu:

```text
Gozlemle -> Karar ver -> Planla -> Arac kullan -> Sonucu kontrol et
```

Bu uygulamadaki yerel ajan:

1. Gorev listesini gozlemler.
2. Bekleyen ve tamamlanan gorevleri sayar.
3. Bir odak gorevi secer.
4. Uc adimli plan hazirlar.
5. Kullanici onaylarsa oneriyi gorev listesine ekler.

## Gozlem

```javascript
const pendingTasks = tasks.filter(function (task) {
  return !task.completed;
});
```

Ajan, karar vermeden once uygulamanin mevcut durumunu okur.

## Karar

Bu ajan acik ve sabit kurallar kullanir:

- Gorev yoksa ilk uygulama hedefini yazmayi onerir.
- Tum gorevler bittiyse yeni ogrenme hedefi onerir.
- Bekleyen gorev varsa listedeki ilk bekleyen gorevi odak secer.

Gercek yapay zeka ajani bu karar asamasinda bir dil modeli kullanabilir.

## Arac kullanimi

Ajanin araci, gorev listesine yeni kayit ekleyen fonksiyondur:

```javascript
tasks.push({
  id: nextTaskId,
  text: currentAgentSuggestion,
  completed: false,
});
```

Onemli guvenlik ilkesi: Ajan oneriyi kendiliginden uygulamaz. Kullanici
`Oneriyi gorevlere ekle` dugmesine basarak eylemi onaylar.

## Test

1. Gorev listenizde en az iki bekleyen gorev bulundurun.
2. `Ajan plani hazirla` dugmesine basin.
3. Gozlem, karar, plan ve onerilen eylemi okuyun.
4. `Oneriyi gorevlere ekle` dugmesine basin.
5. Yeni gorevin listeye ve localStorage'a eklendigini kontrol edin.
6. Ayni plani yeniden eklemeyi deneyerek tekrar kontrolunu gozlemleyin.
