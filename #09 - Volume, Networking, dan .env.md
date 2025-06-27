## 📦 Volumes, Networking, dan `.env` di Docker Compose

---

### 1️⃣ **🔁 Docker Volumes (Persistensi Data)**

Default-nya, data di container bakal **hilang** kalau container dihapus.
Solusinya? **Volumes** — penyimpanan di luar lifecycle container.

#### 📌 Contoh di Compose:

```yaml
services:
  db:
    image: postgres
    volumes:
      - dbdata:/var/lib/postgresql/data

volumes:
  dbdata:
```

* `dbdata` itu volume yang didefinisikan di bawah.
* Ini bikin data database tetep ada walau `docker-compose down`.

#### 🔍 Cek volume:

```bash
docker volume ls
docker volume inspect dbdata
```

---

### 2️⃣ **🌐 Networking Antar Service**

Docker Compose otomatis bikin **jaringan virtual** buat semua service. Jadi:

* Lo bisa manggil service lain **pake nama servicenya**
* Misalnya: backend lo bisa akses DB pake `db:5432`, bukan `localhost`

#### 📌 Contoh:

```yaml
services:
  backend:
    build: ./backend
    depends_on:
      - db
  db:
    image: postgres
```

➡️ Si backend bisa konek ke `db` langsung, gak ribet ngatur IP-IP-an.

---

### 3️⃣ **🔐 Gunakan .env File**

Biar konfigurasi lebih rapi dan gak hardcode di yaml, lo bisa pake file `.env`.

#### 📁 Struktur:

```
POSTGRES_PASSWORD=secret123
APP_PORT=5000
```

#### 📌 Compose file:

```yaml
services:
  db:
    image: postgres
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
```

➡️ Jadi lebih aman, bisa diatur per environment (`.env.dev`, `.env.prod`)

---

### 4️⃣ **⚠️ depends\_on ≠ healthcheck**

`depends_on` **hanya mengatur urutan start**, tapi **gak nunggu service siap**.
Misal DB start, tapi belum siap menerima koneksi? Lo harus bikin `healthcheck` sendiri atau handle retry di kode lo.

Contoh simple healthcheck:

```yaml
services:
  db:
    image: postgres
    healthcheck:
      test: ["CMD", "pg_isready"]
      interval: 10s
      timeout: 5s
      retries: 5
```

---

## ✨ Dev Tip: Perbedaan `docker-compose up` vs `docker compose up`

* `docker-compose` (pakai dash): versi CLI lama
* `docker compose` (tanpa dash): versi baru, native ke Docker CLI (Docker Compose V2)

Rekomendasi: pakai yang **tanpa dash**, lebih modern & maintainable.

---

## 🚀 Perintah Tambahan Compose yang Berguna

| Command                  | Fungsi                                             |
| ------------------------ | -------------------------------------------------- |
| `docker compose config`  | Cek hasil akhir config Compose (setelah parse env) |
| `docker compose restart` | Restart semua service                              |
| `docker compose logs -f` | Tampilkan log real-time semua service              |
| `docker compose down -v` | Hapus semua container + volume                     |
| `docker compose stop`    | Stop tanpa delete                                  |

---

## 🧠 TL;DR Recap

| Fitur       | Fungsi Utama                                     |
| ----------- | ------------------------------------------------ |
| Volumes     | Simpan data yang awet meski container dihapus    |
| Networking  | Antar service bisa komunikasi via nama service   |
| .env        | Buat inject variabel ke Compose biar rapi & aman |
| depends\_on | Atur urutan start service, bukan nunggu siap     |




