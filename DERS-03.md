# Ders 3: HTML, CSS ve JavaScript

Bir web uygulamasinda uc temel katman vardir:

## 1. HTML: Yapi

`index.html` ekranda hangi elemanlarin bulunacagini tanimlar.

```html
<input id="nameInput" type="text">
<button id="greetButton" type="button">Selamla</button>
```

Visual Basic'teki forma TextBox ve Button eklemeye benzer.

## 2. CSS: Gorunum

`style.css` elemanlarin rengini, boyutunu ve yerlesimini belirler.

```css
input {
  min-height: 52px;
  border-radius: 14px;
}
```

Visual Basic'teki renk, font ve boyut ozelliklerine benzer.

## 3. JavaScript: Davranis

`app.js` kullanicinin yaptigi islemlere cevap verir.

```javascript
greetButton.addEventListener("click", function () {
  const name = nameInput.value.trim();
});
```

Visual Basic'teki `Button_Click` olayina benzer.

## Yeni kavram: Kosul

```javascript
if (name === "") {
  messageText.textContent = "Lutfen once adinizi yazin.";
}
```

Bu kod, ad kutusu bossa kullaniciyi uyarir.
