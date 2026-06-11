# Ders 11: Ajan hafizasi

Bu derste ajan, daha once olusturdugu planlari hatirlar. Hafiza gorev
listesinden ayri bir `localStorage` kaydinda tutulur.

## Hafiza kaydi

Her plan su bilgileri saklar:

```javascript
{
  id: Date.now(),
  createdAt: new Date().toISOString(),
  observation: plan.observation,
  decision: plan.decision,
  steps: plan.steps,
  suggestion: plan.suggestion,
  applied: false
}
```

- `createdAt`: Planin olusturulma zamani
- `observation`: Ajanin gordugu mevcut durum
- `decision`: Bu durumdan cikardigi karar
- `steps`: Uygulanacak plan
- `suggestion`: Onerilen eylem
- `applied`: Kullanici oneriyi uyguladi mi?

## Kisa ve uzun sureli hafiza

- `currentAgentSuggestion`: Yalnizca mevcut sayfa acikken kullanilan kisa
  sureli hafizadir.
- `agentMemory`: `localStorage` icinde kalan uzun sureli hafizadir.

Gercek yapay zeka ajanlarinda da kisa sureli calisma durumu ile kalici
hafiza birbirinden ayrilir.

## Hafiza siniri

```javascript
if (agentMemory.length > 10) {
  agentMemory.length = 10;
}
```

Sinirsiz kayit yerine yalnizca son 10 plan tutulur. Bu, hafizanin kontrollu
buyumesini saglar.

## Kullanici kontrolu

Hafiza kendiliginden silinmez. Kullanici `Hafizayi temizle` dugmesine
basarak kayitlari kaldirir.

## Test

1. Iki kez ajan plani olusturun.
2. Hafizada iki zaman damgali kayit gorundugunu kontrol edin.
3. Son oneriyi gorev listesine ekleyin.
4. Ilgili hafiza kaydinin `Uygulandi` oldugunu kontrol edin.
5. Edge'i kapatip yeniden F5'e basin; hafiza korunmalidir.
6. `Hafizayi temizle` dugmesiyle kayitlari silin.
