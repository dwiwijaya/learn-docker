## 🐳 **Docker Container** — the real MVP

---

## 🧠 Apa itu Docker Container?

> **Docker Container** = *Instance* (alias copy yang bisa dijalanin) dari Docker Image

### Bisa dibilang:

* **Docker Image** itu kayak **blueprint** atau file `.exe` (belum dijalanin)
* **Docker Container** itu kayak **proses aktif**, udah dijalanin dari image-nya

---

## 🎬 Gimana Cara Kerjanya?

Proses sederhananya gini:

```bash
Dockerfile → (build) → Docker Image → (run) → Docker Container
```

Jadi:

* Lu bikin **Dockerfile**
* Build jadi **Docker Image**
* Jalankan pake `docker run` ➝ keluarnya **Container**

---

## 🛠️ Karakteristik Docker Container:

| Fitur            | Penjelasan                                                                   |
| ---------------- | ---------------------------------------------------------------------------- |
| **Isolated**     | Terpisah dari sistem utama (pakai namespace + cgroups)                       |
| **Lightweight**  | Gak butuh full OS kayak VM, cuma bawa runtime + app + dependency             |
| **Ephemeral**    | Secara default, container itu sementara (data bisa hilang kalau nggak diset) |
| **Fast Boot**    | Start-nya cepet banget karena gak perlu boot OS                              |
| **Port Mapping** | Bisa buka port dari container ke host (`-p 3000:3000`)                       |

---

## 🔥 Perintah Docker Container Umum

| Command                   | Fungsi                               |
| ------------------------- | ------------------------------------ |
| `docker run`              | Jalanin container dari image         |
| `docker ps`               | Lihat container yang lagi jalan      |
| `docker ps -a`            | Lihat semua container (jalan + stop) |
| `docker stop <id>`        | Hentikan container                   |
| `docker rm <id>`          | Hapus container (harus stop dulu)    |
| `docker logs <id>`        | Lihat log dari container             |
| `docker exec -it <id> sh` | Masuk ke dalam container via shell   |

---

## 🧪 Contoh Nyata

### 1. Pull Image dulu:

```bash
docker pull nginx
```

### 2. Jalanin jadi Container:

```bash
docker run -d -p 8080:80 nginx
```

* `-d` ➝ Detach mode (jalanin di background)
* `-p` ➝ Port mapping (port 8080 di laptop, 80 di container)

Now buka `http://localhost:8080` ➝ NGINX is running inside a container 🧠💥

---

## 💡 Container vs Image (Side-by-side)

| Aspek        | Docker Image              | Docker Container                  |
| ------------ | ------------------------- | --------------------------------- |
| Status       | Statis / Read-only        | Dinamis / Bisa dijalankan         |
| Fungsi       | Blueprint / Template      | Runtime environment               |
| Bisa Diubah? | Nggak (kecuali rebuild)   | Bisa (tapi efeknya sementara)     |
| Contoh       | `node:18`, `myapp:latest` | `ec9281d39a33`, `nginx_container` |

---

## 📦 Apakah 1 Container = 1 Image?

Biasanya iya, **1 container dijalankan dari 1 image**.

Tapi lo bisa punya:

* Banyak container dari **image yang sama** (misal nginx\:latest x5)
* Container yang saling terhubung (web, db, redis) ➝ nanti kita pake `Docker Compose`

---

## 📁 Data Container (Persistent or Not?)

By default:

* Data di container itu ilang saat container dihapus
* Tapi bisa di-*persist* pakai **volumes** atau **bind mounts**

Contoh:

```bash
docker run -v $(pwd)/data:/app/data myapp
```

---

## 🧠 Summary

| Istilah          | Arti                                                                   |
| ---------------- | ---------------------------------------------------------------------- |
| Docker Image     | Blueprint aplikasi (read-only)                                         |
| Docker Container | Instance yang aktif dari image, bisa dijalankan, dimonitor, dihentikan |
| Dockerfile       | Instruksi buat bikin image                                             |


