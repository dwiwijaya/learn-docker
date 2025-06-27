## 🧩 Apa Itu Docker Compose?

> **Docker Compose** = Tool buat *define & run multi-container Docker apps* pake 1 file config (`docker-compose.yml`)

Daripada lo ngetik `docker run` berkali-kali buat web, db, redis, dll…
Docker Compose nyediain **satu tempat** buat ngatur semua container lo ✨

---

## 🧠 Kenapa Perlu Compose?

Bayangin lo punya app fullstack:

* frontend (React)
* backend (Node.js)
* database (Postgres)

Kalau manual:

```bash
docker run react...
docker run node...
docker run postgres...
```

Ribet + gak bisa replikasi setup ke tim lain 😫

Dengan Compose:

```yaml
version: "3.9"
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
  backend:
    build: ./backend
    ports:
      - "5000:5000"
  db:
    image: postgres:latest
    environment:
      POSTGRES_PASSWORD: secret
```

1 command:

```bash
docker-compose up
```

➡️ semua jalan bareng, auto connect, happy dev 🥳

---

## 🛠️ Struktur File `docker-compose.yml`

```yaml
version: "3.9" # atau sesuai versi Docker Compose

services:
  <nama_service>:
    image: <nama_image> | build: <path>
    ports:
      - "host_port:container_port"
    volumes:
      - ./data:/data
    environment:
      - ENV_VAR=value
    depends_on:
      - service_lain
```

---

## 💥 Perintah Dasar Compose

| Command                     | Keterangan                             |
| --------------------------- | -------------------------------------- |
| `docker-compose up`         | Start semua container                  |
| `docker-compose up -d`      | Start di background                    |
| `docker-compose down`       | Stop & hapus semua container + network |
| `docker-compose build`      | Build semua image dari Dockerfile      |
| `docker-compose logs`       | Lihat semua log                        |
| `docker-compose exec <srv>` | Masuk ke container tertentu            |

---

## 🔗 Network Otomatis

* Semua container dalam file `docker-compose.yml` akan auto-connect via **jaringan virtual yang sama** 🧠
* Jadi lo bisa:

  * Backend konek ke DB via `db:5432`
  * Gak perlu expose port ke host

---

## 📦 Volume & Persistensi

Lo bisa simpen data pake volume langsung di Compose:

```yaml
services:
  db:
    image: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

---

## 🔁 Auto-restart & Production Ready?

Yes! Tambahin restart policy:

```yaml
restart: always | on-failure | unless-stopped
```

---

## 🧠 Summary Time!

| Fitur               | Tanpa Compose    | Dengan Compose             |
| ------------------- | ---------------- | -------------------------- |
| Multi container     | Manual satu-satu | Semua didefinisikan bareng |
| Networking          | Set sendiri      | Auto-terhubung             |
| Config repeatable   | Susah diulang    | Cukup share 1 file         |
| Volume management   | Manual           | Bisa di-declare            |
| Deployment friendly | Nggak banget     | Bisa dipake CI/CD          |

---

## 💡 Best Practice Docker Compose

* Pisahin environment (dev, prod) pakai `.env`
* Gunakan `depends_on` buat urutan service
* Jaga `build context` tetap kecil (hindari `.` kalau gak perlu)
* Commit file `docker-compose.yml` ke repo lo

---

## 🎁 Bonus: Komando CI/CD Compose

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

Bisa bedain versi dev dan prod dengan file berbeda 😎
