### 🧱 **Dockerfile → Docker Image → Docker Container**

Think of it kayak proses bikin kue 🍰:

---

## 1. **Dockerfile** = Resep

* Ini file teks yang berisi *instruksi step-by-step* kayak:

  * Ambil bahan dasar (base image),
  * Tambahkan dependensi,
  * Salin file app,
  * Jalankan perintah tertentu.

**Contoh Dockerfile:**

```Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
```

> Jadi, ini cuma petunjuk, belum jadi apa-apa. Belum bisa langsung dijalankan.

---

## 2. **Docker Image** = Kue yang udah jadi

* Hasil dari nge-*build* Dockerfile.
* Image bersifat **read-only** (immutable), berisi semua yang dibutuhkan aplikasi:

  * Aplikasi kamu
  * Dependencies
  * Konfigurasi
  * Environment
* Bisa di-*push* ke Docker Hub atau registry lain.

> Kayak hasil dari resep. Bisa dikirim ke mana-mana, dan siapa pun bisa bikin kue (container) dari image ini.

---

## 3. **Docker Container** = Kue yang disajikan di meja makan

* Ini adalah **instance** dari image, dan ini yang *sebenernya dijalankan*.
* Saat kamu `docker run` image, kamu bikin container dari image itu.
* Container:

  * Bisa punya proses sendiri
  * Isolated
  * Bisa di-*stop*, di-*restart*, dan dibuang tanpa ganggu imagenya.

---

## 🔁 Hubungannya:

```text
Dockerfile → [docker build] → Docker Image → [docker run] → Docker Container
```

| Komponen         | Peran Utama                       | Sifat           |
| ---------------- | --------------------------------- | --------------- |
| Dockerfile       | Blueprint resep untuk bikin image | Editable (text) |
| Docker Image     | Template aplikasi + environment   | Read-only       |
| Docker Container | Instance aktif dari image         | Read-write      |

---

> Jadi, lo gak bisa bikin container tanpa image, dan gak bisa bikin image tanpa Dockerfile (kecuali lo pull dari registry). Semua berurutan.
