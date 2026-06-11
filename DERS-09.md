# Ders 9: Yapay zeka API'si ve guvenli anahtar

Bu derste tarayici ile OpenAI API arasina yerel bir Node.js sunucusu
ekliyoruz.

## Neden dogrudan app.js icinden baglanmiyoruz?

Tarayiciya yazilan kod kullanici tarafindan gorulebilir. API anahtarini
`app.js`, `index.html` veya Git'e eklemek anahtari baskalarina aciklar.

Guvenli akis:

```text
Tarayici -> Yerel Node.js sunucusu -> OpenAI API
```

Anahtar yalnizca sunucunun ortam degiskeninde bulunur.

## API anahtarini hazirlama

1. OpenAI API Dashboard'da bir API anahtari olusturun.
2. Platform Billing bolumunde API bakiyesi veya odeme yontemi bulundugunu
   kontrol edin. ChatGPT aboneligi ile API kullanimi ayri faturalandirilir.
3. VS Code terminalinde su komutu calistirin:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup-api-key.ps1
```

4. Anahtari terminaldeki gizli alana yapistirip Enter'a basin.
5. VS Code'u tamamen kapatip yeniden acin.
6. F5'e basin.

API anahtarini sohbete, ekran goruntusune veya Git'e koymayin.

## Sunucu tarafi

`server.js`, anahtari ortam degiskeninden okur:

```javascript
const apiKey = process.env.OPENAI_API_KEY;
```

OpenAI Responses API'ye istek gonderir:

```javascript
fetch("https://api.openai.com/v1/responses", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "gpt-5.5",
    input: question,
  }),
});
```

## Onemli fark

- Hava durumu API'si gizli anahtar istemiyordu ve tarayicidan cagrilabildi.
- OpenAI API anahtari gizlidir ve yalnizca sunucuda tutulmalidir.

## Test

1. F5 ile yerel sunucuyu baslatin.
2. Bos soru gonderin; uyarinin gorundugunu kontrol edin.
3. Bir yazilim sorusu gonderin.
4. Model adinin ve cevabin ekranda gorundugunu kontrol edin.
5. API anahtari yoksa guvenli kurulum mesajinin gorundugunu kontrol edin.

## Sik gorulen hata: 429

`429` cevabi, istek sunucuya ulastigi halde API kotasi veya bakiyesi yeterli
olmadiginda gorulebilir. OpenAI Platform Billing sayfasinda API kredi,
odeme yontemi ve kullanim limitlerini kontrol edin.
