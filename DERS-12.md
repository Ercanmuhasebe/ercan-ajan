# Ders 12: Coklu ajan is birligi

Bu derste tek bir ajanin butun isi yapmasi yerine sorumluluklari uc ayri
role boluyoruz.

## 1. Planlayici ajan

Planlayici mevcut gorevleri inceler, odak gorevi secer ve uc adimli plan
uretir.

```javascript
const plan = buildLocalAgentPlan();
```

## 2. Denetleyici ajan

Denetleyici planin kalitesini ve guvenligini kontrol eder:

```javascript
const review = reviewLocalAgentPlan(plan);
```

Kontroller:

- Plan uc acik adimdan olusuyor mu?
- Oneri uygulanabilir uzunlukta mi?
- Ayni gorev daha once eklenmis mi?
- Eylem mevcut verileri silmeden yalnizca yeni gorev mi ekliyor?

Bir kontrol basarisizsa `approved` degeri `false` olur ve uygulayici dugmesi
acilmaz.

## 3. Uygulayici ajan

Uygulayici ancak iki onaydan sonra calisir:

1. Denetleyici plani onaylar.
2. Kullanici `Uygulayiciya onay ver` dugmesine basar.

Bu desen, yapay zeka ajanlarinda insan denetimi olarak kullanilir.

## Neden rolleri ayiriyoruz?

- Her ajanin gorevi daha basit ve anlasilir olur.
- Hatalar eyleme donusmeden once yakalanir.
- Karar ile eylem birbirinden ayrilir.
- Riskli islemler kullanici onayina baglanir.

## Test

1. En az bir bekleyen gorev olusturun.
2. `Ajan ekibini calistir` dugmesine basin.
3. Planlayici planini ve denetleyici kontrollerini okuyun.
4. Denetleyici onaylarsa uygulayiciya onay verin.
5. Eklenen gorev tamamlanmadan ekibi tekrar calistirin.
6. Ayni onerinin denetleyici tarafindan reddedildigini kontrol edin.
