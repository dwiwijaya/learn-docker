# 🌱 Docker Environment Variables (`ENV`)

## 📌 Tujuan:

Environment variable di Docker itu kayak config rahasia yang lo bisa atur **di luar aplikasi**, tanpa ngubah source code.

Bayangin:

* password DB
* port aplikasi
* API key rahasia
  ➡️ semua bisa disimpan di env var 🙏

---

## 🔧 Cara Set Env di Docker (3 Cara Paling Umum)

---

### ✅ 1. `ENV` di Dockerfile

```Dockerfile
ENV PORT=3000
ENV NODE_ENV=production
```

> Artinya, ketika image dibuild → semua container dari image itu bakal punya env var tsb.

---

### ✅ 2. `--env` atau `-e` saat `docker run`

```bash
docker run -e PORT=3000 -e NODE_ENV=production myapp
```

> Ini override value dari Dockerfile (jika ada). Cocok buat testing cepat.

---

### ✅ 3. `.env` File + Compose

Buat file `.env` di root folder:

```
PORT=3000
DB_PASS=rahasia
```

Terus di `docker-compose.yml`:

```yaml
services:
  app:
    image: myapp
    ports:
      - "${PORT}:3000"
    environment:
      - DB_PASS=${DB_PASS}
```

🔥 Keren banget karena:

* Bisa disimpan di `.gitignore`
* Beda environment tinggal ganti file `.env.prod`, `.env.dev`, dll

---

## 🔍 Perbedaan `ENV` vs `ARG`

| 🔥 Fitur       | `ENV`                              | `ARG`                             |
| -------------- | ---------------------------------- | --------------------------------- |
| Scope          | Tersedia saat build & di container | Hanya saat build                  |
| Akses di image | ✅ Bisa dipakai di container        | ❌ Gak tersedia di container       |
| Ideal untuk    | Config runtime (DB, API, secret)   | Parameter build (versi base, dll) |

Contoh `ARG`:

```Dockerfile
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}
```

---

## 🧪 Tips & Best Practice

* Selalu pake `.env` untuk local dev
* Jangan commit `.env` ke Git! (`.gitignore` it!)
* Gunakan `docker-compose config` untuk cek apakah env var udah ke-parse bener
* Untuk secret sensitive di production, pertimbangkan pake:

  * `Docker Secrets` (di Swarm)
  * External secret manager (AWS, Vault, dsb)

---

## 🧠 TL;DR

| Cara Set Env        | Kapan Dipakai                                  |
| ------------------- | ---------------------------------------------- |
| `ENV` di Dockerfile | Default config untuk semua container           |
| `-e` saat run       | Override cepat waktu testing / manual          |
| `.env` + Compose    | Workflow ideal untuk banyak service            |
| `ARG`               | Khusus buat build-time only (misal image base) |

---

## 📂 Bonus: Multi `.env` setup

Misal punya `.env.dev` dan `.env.prod`:

```bash
docker --env-file .env.prod run myapp
```

Atau di Compose:

```bash
docker compose --env-file .env.prod up
```

