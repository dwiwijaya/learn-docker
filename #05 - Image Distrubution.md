## 🌐 Distribusi Docker Image

Setelah kamu build Docker image secara lokal, tentu kamu ingin **menyimpan, membagikan, atau meng-deploy** image tersebut ke berbagai lingkungan. Nah, di sinilah proses distribusi image berperan.

---

### 🔁 Alur Distribusi Umum

```bash
# 1. Build image
docker build -t my-app:1.0 .

# 2. Login ke registry (Docker Hub, GitHub, dll)
docker login

# 3. Tag image
docker tag my-app:1.0 username/my-app:1.0

# 4. Push ke registry
docker push username/my-app:1.0

# 5. Di server/mesin lain
docker pull username/my-app:1.0
docker run username/my-app:1.0
```

---

### 🏪 Docker Image Registry (Tempat Distribusi)

#### 1. **Docker Hub** (Default, publik & gratisan)

* Paling umum dan gampang
* Bisa bikin image public & private
* URL default saat `docker pull`/`docker push` tanpa registry

#### 2. **GitHub Container Registry (GHCR)**

* Registry-nya GitHub
* Cocok kalau project lo udah di GitHub
* Support private/personal access tokens

#### 3. **GitLab Container Registry**

* Serupa kayak GitHub
* Integrated ke GitLab CI/CD pipeline

#### 4. **Google Container Registry (GCR) / Artifact Registry**

* Untuk deploy ke Google Cloud Platform
* Biasanya dipakai sama Kubernetes GKE

#### 5. **Amazon ECR (Elastic Container Registry)**

* Registry-nya AWS
* Native support buat ECS dan EKS

#### 6. **Self-hosted Registry**

* Bikin registry sendiri pakai container!

```bash
docker run -d -p 5000:5000 --name registry registry:2
```

---

### 📌 Tagging Penting buat Versi

Docker pakai sistem tagging buat nentuin versi image.
Contoh:

```bash
docker tag my-app:1.0 username/my-app:latest
```

> Jangan cuma push `:latest` terus ya, karena:
>
> * Gampang bikin konflik
> * Gak jelas versi berapa
> * Sulit buat rollback

---

### 🔐 Private Registry Access

Kalau pakai registry private (misal GitHub/GitLab/ECR), kamu harus:

* Login dulu pakai token/password
* Atur permission di level image/org/user
* Di CI/CD, simpan credential sebagai **secrets**

---

### ✅ Best Practices Distribusi

| Praktik Baik                     | Kenapa Penting                                |
| -------------------------------- | --------------------------------------------- |
| Tag dengan versi yang jelas      | `:v1.0`, `:v1.0.3`, bukan cuma `:latest`      |
| Gunakan base image ringan        | Lebih cepat push/pull (misal: `alpine`)       |
| Push ke registry yang sesuai     | Docker Hub buat publik, ECR/GCR buat internal |
| Gunakan CI/CD buat push otomatis | Biar konsisten dan gak manual                 |
| Simpan kredensial di secret/env  | Jangan hardcode username/password             |

---

## 🧠 Kesimpulan

> Docker Image = Build sekali → bisa dipakai di mana aja
> Asal udah di-push ke registry, image lo udah global-ready 🚀

Distribusi ini yang bikin Docker powerful banget buat DevOps, CI/CD, dan deployment ke cloud.

