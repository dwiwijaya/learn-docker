# 🏗️ Docker Architecture

Docker memiliki arsitektur **client-server** yang terdiri dari beberapa komponen utama yang saling terhubung. Arsitektur ini memungkinkan proses build, ship, dan run aplikasi menjadi lebih efisien dan konsisten.

---

## 🔧 Komponen Utama Docker

### 1. Docker Client (`docker`)
- CLI (Command Line Interface) yang digunakan pengguna untuk berinteraksi dengan Docker.
- Saat kamu menjalankan perintah seperti `docker build`, `docker run`, atau `docker pull`, perintah tersebut dikirim ke **Docker Daemon**.
- Client dapat berkomunikasi dengan daemon di mesin lokal atau remote.

```bash
docker run nginx
````

### 2. Docker Daemon (`dockerd`)

* Proses utama di background yang bertanggung jawab menjalankan perintah dari client.
* Membangun, menjalankan, dan mengelola container.
* Berkomunikasi dengan Docker API untuk melakukan operasi container.

### 3. Docker Image

* Template read-only untuk membuat container.
* Berisi semua hal yang dibutuhkan untuk menjalankan aplikasi (kode, dependensi, environment, dll).
* Bisa dibuat dari Dockerfile atau di-*pull* dari registry seperti Docker Hub.

### 4. Docker Container

* Instance dari Docker Image.
* Merupakan runtime environment tempat aplikasi berjalan.
* Isolated, ringan, dan portabel.

> 🧠 *Think of it this way:*
>
> * Image = blueprint
> * Container = rumah yang dibangun dari blueprint

### 5. Dockerfile

* File konfigurasi yang berisi instruksi untuk membangun image.
* Contoh:

```Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
```

### 6. Docker Registry

* Tempat menyimpan dan mendistribusikan image Docker.
* Contoh paling populer: [Docker Hub](https://hub.docker.com), GitHub Container Registry, atau private registry.

---

## 🔄 Alur Kerja Docker (Simplified)

```text
Docker CLI (Client)
       ↓
   Docker Daemon
       ↓
  [Build] → Image → [Run] → Container
       ↓
    [Push/Pull]
   Docker Registry
```

---

## 🧠 Ringkasan

| Komponen             | Fungsi Singkat                                           |
| -------------------- | -------------------------------------------------------- |
| **Docker Client**    | CLI untuk kirim perintah ke daemon                       |
| **Docker Daemon**    | Proses utama yang mengelola semua objek Docker           |
| **Docker Image**     | Blueprint berisi aplikasi + environment                  |
| **Docker Container** | Instance dari image, isolated environment untuk aplikasi |
| **Dockerfile**       | Instruksi step-by-step untuk bangun image                |
| **Docker Registry**  | Tempat untuk simpan dan ambil image (publik atau privat) |

---

## 🚀 Catatan Tambahan

* Docker bisa dijalankan secara lokal maupun remote.
* Container berjalan sebagai proses biasa di OS host tapi tetap isolated.
* Banyak tools sekarang dibangun di atas Docker (seperti Kubernetes, CI/CD tools, dsb).

> 💡 Docker mengubah cara aplikasi dibangun, dikirim, dan dijalankan — bikin semuanya lebih cepat, ringan, dan fleksibel.

```

---

Kalau kamu mau aku generate ini jadi file `.md` siap download, tinggal bilang ya. Mau ditambah skema arsitektur juga bisa, nanti gue bantu bikinin ilustrasinya! 🔥
```
