# Ders 2: Git ile proje gecmisi

Git, projenin farkli zamanlardaki hallerini kaydeder.

## Temel kavramlar

- **Repository (depo):** Git tarafindan izlenen proje klasoru.
- **Working directory:** Dosyalarin su anki hali.
- **Staging area:** Bir sonraki kayda alinacak degisiklikler.
- **Commit:** Projenin aciklamali bir zaman noktasi.

## En cok kullanacagimiz komutlar

```powershell
git status
git add .
git commit -m "Aciklayici mesaj"
git log --oneline
```

## Bu projede yaptiklarimiz

1. `git init` ile Git deposunu olusturduk.
2. `git add .` ile mevcut dosyalari ilk kayit icin hazirladik.
3. `git commit` ile ilk surumu kaydedecegiz.

## VBA ile benzetme

Bir Excel dosyasini `Rapor_v1`, `Rapor_v2`, `Rapor_son` adlariyla
kopyalamak yerine Git ayni klasorun surumlerini duzenli bicimde saklar.
Her commit'e ne degistigini anlatan bir mesaj yazilir.
