# Bidayatul Mujtahid Digital

Aplikasi web statis berisi **seluruh isi** kitab *Bidayatul Mujtahid wa Nihayat al-Muqtashid*
karya Ibnu Rusyd al-Hafid (w. 595 H) — teks Arab dan terjemahan Indonesia berdampingan.

| | |
|---|---|
| Kitab | 71 (4 juz) |
| Masalah fikih | 1.459 |
| Paragraf Arab + terjemah | 7.756 |
| Kaidah fikih | 520 |
| Kaidah ushul fikih | 409 |
| Istilah | 664 |

Naskah sumber: **Dar al-Hadits, Kairo — 1425 H / 2004 M**, 4 juz.
Nomor juz dan halaman pada aplikasi mengikuti cetakan tersebut.

---

## Isi repositori

```
index.html                  aplikasi (HTML + CSS + JS dalam satu berkas)
data/                       isi kitab, dimuat aplikasi saat dibuka
  kitab.json                daftar 71 kitab + Muqaddimah
  masalah.json              1.459 masalah
  teks.json                 7.756 paragraf Arab + terjemahan
  fikih.json                520 kaidah fikih
  ushul.json                409 kaidah ushul fikih
  istilah.json              664 istilah
  petunjuk.json             catatan penyusunan
offline/                    versi satu berkas untuk dipakai tanpa internet
sw.js                       service worker — aplikasi tetap jalan saat offline
manifest.webmanifest        agar bisa dipasang di layar utama ponsel
favicon.svg, icon-*.png     ikon aplikasi
og.png                      gambar pratinjau saat tautan dibagikan
.nojekyll                   memberi tahu GitHub Pages agar tidak memproses ulang berkas
```

Semua tautan di dalam aplikasi bersifat **relatif**, jadi repositori ini bisa diberi
nama apa saja dan tetap berfungsi — baik di `username.github.io` maupun di
`username.github.io/nama-repo/`.

---

## Cara menerbitkan ke GitHub Pages

1. Buat repository baru di GitHub — **Public**, tanpa mencentang README/.gitignore/license.
2. Dari folder ini, lewat terminal:

   ```bash
   git init
   git add .
   git commit -m "Aplikasi Bidayatul Mujtahid"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```

3. Di repositori GitHub: **Settings → Pages**
   · Source: **Deploy from a branch**
   · Branch: **main** / **(root)**
   · Centang **Enforce HTTPS**
4. Tunggu 1–2 menit. Alamatnya: `https://USERNAME.github.io/NAMA-REPO/`

> Unggah **lewat terminal**, jangan lewat tombol *Add file → Upload files* di web GitHub.
> Cara web merusak struktur folder sehingga `data/` tidak terbaca dan aplikasi gagal memuat.

---

## Cara memperbarui isi

1. Ganti berkas di dalam `data/` dengan yang baru.
2. Buka `sw.js`, naikkan nomor versi di baris paling atas — misalnya `'bm-v1'` menjadi `'bm-v2'`.
   Tanpa ini, pengunjung lama masih melihat data lama dari simpanan peramban.
3. Kirim perubahannya:

   ```bash
   git add .
   git commit -m "Perbarui isi kitab"
   git push
   ```

---

## Catatan teknis

- Statis sepenuhnya — tanpa server, tanpa basis data, tanpa proses build.
- Data mentah 14,5 MB, terkirim sekitar **3,2 MB** karena GitHub Pages memampatkannya.
- Aplikasi memuat dua tahap: daftar kitab, kaidah, dan istilah lebih dulu agar langsung
  bisa dipakai; masalah dan teks lengkap menyusul di belakang layar.
- Pencarian Arab mengabaikan harakat — mengetik `البينة` tetap menemukan `الْبَيِّنَةُ`.
- Setelah kunjungan pertama, aplikasi tersimpan di peramban dan bisa dibuka tanpa internet.
- Pratinjau di komputer sendiri perlu server kecil, karena peramban memblokir pembacaan
  berkas `data/` dari `file://`:

  ```bash
  python3 -m http.server 8000
  # lalu buka http://localhost:8000
  ```

  Untuk sekadar membaca tanpa server, gunakan berkas di folder `offline/`.

---

## Keaslian teks

Seluruh kutipan Arab diambil secara otomatis dari berkas sumber lalu dicocokkan ulang
karakter demi karakter — bukan diketik ulang. Pemeriksaan terakhir: **0 kutipan yang
tidak sesuai sumber** dari 1.875 fragmen, dan **0 sel berbeda** antara aplikasi dan
basis data induknya.

Teks Arab kitab ini berada dalam domain publik. Terjemahan Indonesia, ringkasan bahasa
awam, himpunan kaidah, dan kamus istilah disusun untuk keperluan pembelajaran —
silakan tentukan sendiri lisensi yang ingin dicantumkan sebelum dibagikan luas.
