# 💽 Docker Volumes – Biar Data Lo Gak Hilang!

## 🧠 Apa Itu Docker Volume?

> Volume = tempat penyimpanan data di luar container

Kenapa penting? Karena kalau lo `docker stop` lalu `docker rm` container-nya, **data lo bakal ilang** — kecuali lo simpen di volume!

---

## 🔍 Analogi Singkat:

* **Container =** kayak komputer sementara
* **Volume =** kayak harddisk eksternal

Container bisa dibuang kapan aja, tapi selama datanya disimpen di volume, lo aman. 🛟

---

## 💡 Kenapa Harus Pakai Volume?

* ✅ Data persist walau container mati
* ✅ Bisa dipakai antar container
* ✅ Backup & restore gampang
* ✅ Performanya lebih oke dibanding bind mount

---

## 🚀 Contoh Praktis: MongoDB + Volume

### 🔧 Step 1: Buat Volume

```bash
docker volume create mongodb-data
```

Cek:

```bash
docker volume ls
```

---

### 🧪 Step 2: Jalankan MongoDB Container

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb-data:/data/db \
  mongo
```

🧠 `-v mongodb-data:/data/db` artinya:

* `mongodb-data` adalah volume yang kita buat tadi
* `/data/db` adalah folder di dalam container tempat Mongo nyimpen data

---

### 📦 Step 3: Tambah Data

Coba masuk dan tambah data:

```bash
docker exec -it mongodb mongosh
> use test
> db.user.insertOne({ name: "Dwi", age: 24 })
```

---

### 🔄 Step 4: Hapus Container, Data Aman?

```bash
docker rm -f mongodb
```

Sekarang run ulang Mongo:

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb-data:/data/db \
  mongo
```

➡️ Data lo masih ada bro! Coba `db.user.find()` lagi di `mongosh`.

---

## 📂 Di Mana Volume Disimpan?

Docker simpen volume secara default di:

```
/var/lib/docker/volumes/<volume_name>/_data
```

> Tapi gak usah akses manual sih, kecuali buat debug atau backup.

---

## 🧰 Docker Compose Version

```yaml
version: "3.9"
services:
  mongodb:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db

volumes:
  mongodb-data:
```

Run:

```bash
docker compose up -d
```

---

## ❗ Perbedaan Volume vs Bind Mount

| Fitur           | Volume                  | Bind Mount              |
| --------------- | ----------------------- | ----------------------- |
| Lokasi          | Managed oleh Docker     | Manual path di host     |
| Backup friendly | ✅                       | ❌ but possible          |
| Keamanan        | Lebih aman & terkontrol | Lebih raw, bisa risk    |
| Use case        | DB, cache, file uploads | Development (live code) |

---

## 🔐 Pro Tips

* Volume bisa dibackup:

```bash
docker run --rm -v mongodb-data:/data -v $(pwd):/backup busybox tar czf /backup/backup.tar.gz /data
```

* Bisa share volume antar container
* Bisa pake named volume **atau** anonymous (tapi named lebih direkomendasikan buat maintainability)

---

## 🧠 TL;DR

* Gunakan volume buat simpan data **persisten** (terutama database)
* MongoDB butuh volume di `/data/db`
* Bisa setup via CLI (`-v`) atau `docker-compose.yml`
* Volume = survive even if container deleted
