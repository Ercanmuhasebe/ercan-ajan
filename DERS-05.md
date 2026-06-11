# Ders 5: Nesneler, tamamlama ve silme

Ders 4'te gorevleri yalnizca metin olarak sakladik. Simdi her gorev bir
nesnedir:

```javascript
const task = {
  id: nextTaskId,
  text: newTask,
  completed: false,
};
```

## Nesne nedir?

Nesne, bir kayitla ilgili birden fazla bilgiyi birlikte saklar.

- `id`: Gorevin benzersiz numarasi
- `text`: Gorev aciklamasi
- `completed`: Gorevin tamamlanma durumu

Bu yapi VBA'daki `Type`, bir Excel tablosundaki satir veya veritabanindaki
bir kayit gibi dusunulebilir.

## Boolean deger

`completed` yalnizca iki deger alir:

```javascript
true
false
```

Durumu tersine cevirmek icin:

```javascript
task.completed = !task.completed;
```

## Nesne bulmak

```javascript
tasks.findIndex(function (savedTask) {
  return savedTask.id === task.id;
});
```

`findIndex`, belirtilen `id` degerine sahip gorevin dizi sirasini bulur.

## Diziden silmek

```javascript
tasks.splice(taskIndex, 1);
```

`splice`, bulunan siradan bir elemani kaldirir.

## Test

1. En az uc gorev ekleyin.
2. Ortadaki gorevi tamamlayin.
3. Tamamlanan gorevi `Geri al` dugmesiyle yeniden bekleyen duruma getirin.
4. Bir gorevi silin.
5. Ustteki tamamlanma sayacinin her islemde degistigini gozlemleyin.
