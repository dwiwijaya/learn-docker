# 🚀 Panduan Konsep Dasar Docker untuk Pemula

Welcome to the **Docker Jungle** 🐳 — tempat semua developer eventually nyemplung! Di markdown ini kita bakal ngebedah konsep-konsep fundamental dari ekosistem Docker dan infrastruktur modern lainnya dengan gaya yang fun, tapi tetep edukatif dan cukup detail. Cuss\~

---

## 🧠 Basic Computing Concepts

### 1. **Computer**

Device elektronik yang bisa diprogram buat ngejalanin instruksi. Isinya CPU, RAM, disk, dan komponen lainnya.

### 2. **CPU (Central Processing Unit)**

Otaknya komputer. Semua instruksi dijalankan di sini. Bisa dibilang "mesin kerja" utama.

### 3. **RAM (Random Access Memory)**

Tempat nyimpen data sementara pas program jalan. Makin besar RAM, makin banyak program yang bisa jalan bareng.

### 4. **Disk**

Penyimpanan jangka panjang. Ada HDD atau SSD. File-file, OS, sampai gambar Docker disimpen di sini.

### 5. **Bare Metal**

Istilah buat hardware fisik tanpa ada virtualisasi. Bener-bener mentah, langsung OS di-install di atasnya.

### 6. **Operating System (OS)**

Software utama yang ngatur resource komputer. Contohnya Linux, Windows, macOS.

### 7. **Kernel**

Bagian inti dari OS yang ngatur komunikasi antara hardware & software.

### 8. **Applications**

Program yang dijalanin user atau server. Bisa GUI (visual) atau CLI (command line).

### 9. **Physical Medium**

Media fisik buat koneksi: kabel, hard drive, LAN card, dll.

### 10. **Internet**

Jaringan global dari komputer yang bisa saling komunikasi pakai protokol TCP/IP.

### 11. **Networking**

Ilmu buat ngatur komunikasi antar komputer. Termasuk IP, port, DNS, dsb.

### 12. **Client Side**

Bagian aplikasi yang jalan di sisi user. Contohnya web browser, frontend app.

### 13. **Server Side**

Bagian backend yang proses data, logic, dan kirim respon ke client.

### 14. **Disk I/O**

Input/output ke disk. Semakin tinggi I/O, semakin sibuk proses baca-tulis data.

### 15. **Bandwidth**

Seberapa besar data bisa ditransfer lewat jaringan dalam satuan waktu.

### 16. **Race Conditions**

Bug yang muncul pas beberapa proses ngakses data yang sama secara bersamaan.

### 17. **Memory Leaks**

Kondisi di mana program nggak ngelepas memori yang udah gak dipakai.

### 18. **Unhandled Errors**

Error yang gak ditangani dan bisa bikin program crash atau behave aneh.

### 19. **Scale**

Kemampuan sistem buat handle lebih banyak traffic/data.

### 20. **Vertical Scale**

Naikin kapasitas server (CPU, RAM, dsb). Tapi ada batasnya.

### 21. **Horizontal Scale**

Nambah server baru untuk bagi-bagi beban. Cocok buat microservices.

---

## 🧩 Modern Infrastructure & Docker Concepts

### 22. **Microservices**

Aplikasi dibagi jadi komponen kecil-kecil yang bisa jalan independen dan komunikasi via API.

### 23. **Distributed Systems**

Sistem yang jalan di banyak komputer tapi kerja bareng sebagai satu unit.

### 24. **VM (Virtual Machine)**

Simulasi komputer lengkap. Tiap VM punya OS sendiri.

### 25. **Hypervisor**

Software yang bikin VM jalan di atas hardware.

### 26. **Guest OS**

OS yang jalan di dalam VM.

### 27. **Fixed Resource Allocation**

Resource (CPU/RAM) dialokasikan tetap ke VM/container. Gak bisa berubah otomatis.

### 28. **Docker**

Platform buat ngebuild, ngejalanin, dan manage **container** yang isinya aplikasi + environment-nya.

### 29. **Isolate**

Container itu terisolasi. Kayak rumah masing-masing, gak ganggu tetangga.

### 30. **Shared Kernel**

Semua container share 1 kernel OS host. Ringan banget dibanding VM.

### 31. **Dynamic Resource Allocation**

Container bisa scaling naik/turun sesuai beban. Lebih fleksibel dari VM.

### 32. **Daemon Process**

`dockerd` = service yang terus jalan di background, ngehandle semua perintah Docker.

### 33. **OS-level Virtualization**

Virtualisasi di level OS, bukan hardware. Ini core-nya container.

### 34. **Docker Desktop**

Tool GUI buat manage Docker di Windows/Mac.

---

## 🛠️ Docker Build & Run

### 35. **Dockerfile**

File script berisi instruksi buat ngebuild image Docker.

### 36. **Image**

Snapshot dari environment dan aplikasi. Dibuat dari Dockerfile.

### 37. **Layers**

Tiapp perintah di Dockerfile bikin layer. Lebih efisien karena bisa cache.

### 38. **DockerHub**

Registry publik buat nyimpen dan ambil image Docker.

### 39. **Container**

Instansi dari image yang lagi jalan. Container = image + runtime.

### 40. **Isolation**

Container jalan terpisah dari sistem host dan container lain.

### 41. **Portable**

Image bisa dijalankan di mana aja selama ada Docker. No more "works on my machine" drama.

### 42. **Vendor Lock-in**

Docker bantu hindari ketergantungan ke 1 provider/infra tertentu.

### 43. **Instructions**

Baris-baris di Dockerfile: `FROM`, `RUN`, `COPY`, `CMD`, dll.

### 44. **FROM**

Instruksi pertama. Tentuin base image, contoh: `FROM ubuntu`

### 45. **Base Image (Linux Distro)**

Image dasar, biasanya OS kayak `alpine`, `debian`, `ubuntu`, etc.

### 46. **Image Tag**

Versi image, contoh: `node:18`, `ubuntu:20.04`. Defaultnya `latest`.

### 47. **RUN**

Buat ngejalanin perintah selama build. Contoh: `RUN apt install nginx`

### 48. **Command Line (CLI)**

Interaksi lewat terminal. Docker banyak pakai CLI: `docker run`, `docker ps`, dll.

### 49. **USER**

Nentuin user di dalam container. Biar gak selalu pakai root.

### 50. **Root User**

User tertinggi, punya semua akses. Hindari pakai root di production.

### 51. **COPY**

Salin file dari host ke image.

### 52. **ENV**

Set environment variable di image. Contoh: `ENV NODE_ENV=production`

### 53. **Environment Vars**

Variabel yang bisa nentuin konfigurasi aplikasi di runtime.

### 54. **EXPOSE**

Deklarasi port yang digunakan container, contoh `EXPOSE 80`

### 55. **Port**

Gerbang komunikasi buat data. Port 80 = HTTP, 443 = HTTPS.

### 56. **CMD**

Perintah default saat container dijalankan. Bisa override saat `docker run`

### 57. **ENTRYPOINT**

Instruksi utama. Lebih "kaku" dibanding CMD. Cocok buat CLI tools.

### 58. **Arguments**

Parameter yang dikasih ke `ENTRYPOINT` atau `CMD`

### 59. **LABEL**

Metadata: author, versi, dll. Contoh: `LABEL maintainer="dwi@example.com"`

### 60. **HEALTHCHECK**

Cek apakah container masih sehat. Misalnya ping server tiap 30 detik.

### 61. **Volume**

Folder dari host yang dishare ke container. Buat nyimpen data.

### 62. **Persistent Disk**

Data gak hilang walau container mati. Volume bisa bantu di sini.

---

## 🧪 Docker CLI & Observability

### 63. **Docker CLI**

Command line tool buat interaksi dengan Docker. Contoh: `docker build`, `docker ps`, dsb.

### 64. **Help**

Butuh bantuan? Ketik `docker help` atau `docker run --help`.

### 65. **Build**

Buat image dari Dockerfile: `docker build -t namaimage .`

### 66. **SHA-256**

Hash unik buat identifikasi image atau layer.

### 67. **Layer Caching**

Docker nyimpan hasil layer biar build lebih cepat.

### 68. **Docker Scout**

Tool buat scanning image, lihat vulnerability, dependency, dll.

### 69. **HI MOM ;D**

Just a fun easter egg. Hai Bu\~ 👋

### 70. **Software Bill of Material (SBOM)**

Daftar komponen software (lib/dll) dalam image buat auditing/security.

### 71. **Vulnerabilities**

Bug/security holes dalam software yang bisa dieksploitasi.

### 72. **Severity Rating**

Rating seberapa parah vulnerability: low, medium, high, critical.

### 73. **Run Command**

Jalanin container: `docker run -p 8080:80 nginx`

### 74. **Localhost**

Alamat IP loopback: `127.0.0.1`, akses ke mesin sendiri.

### 75. **PS Command**

Lihat container yang jalan: `docker ps`

### 76. **Logs**

Lihat output log dari container: `docker logs [container]`

### 77. **File System**

Struktur direktori & file dalam container.

### 78. **Exec**

Jalanin command dalam container yang lagi jalan: `docker exec -it bash`

### 79. **Stop**

Berhentiin container dengan grace: `docker stop [container]`

### 80. **Kill**

Berhentiin paksa: `docker kill [container]`

### 81. **Rm**

Hapus container: `docker rm [container]`

### 82. **Push**

Upload image ke DockerHub: `docker push username/image`

### 83. **Registry**

Tempat simpen image, bisa public (DockerHub) atau private.

---

## ☁️ Orchestration & Beyond

### 84. **EKS**

Amazon Elastic Kubernetes Service. Layanan managed K8s dari AWS.

### 85. **Serverless**

Jalankan fungsi/aplikasi tanpa mikirin server. Contoh: AWS Lambda.

### 86. **Pull**

Download image: `docker pull nginx`

### 87. **Docker Compose**

Tool buat jalanin multi-container apps pakai YAML file.

### 88. **Multi-Container Apps**

Aplikasi dengan beberapa service, misalnya web + database.

### 89. **YAML Config**

File konfigurasi buat Docker Compose, Kubernetes, dll.

### 90. **Up**

Jalanin semua service: `docker-compose up`

### 91. **Down**

Berhentiin & hapus semua: `docker-compose down`

### 92. **Orchestration**

Automasi deployment, scaling, management container (K8s dkk).

### 93. **Kubernetes**

Platform orchestration container. Manage cluster of containers.

### 94. **Control Plane**

Komponen utama di Kubernetes yang ngatur semua lifecycle pod/container.

### 95. **Cluster**

Kumpulan node (server) yang dikelola bareng pakai K8s.

### 96. **Pod**

Unit terkecil di K8s. Bisa isi satu atau lebih container.

### 97. **Kubelet**

Agent yang jalan di setiap node, bertugas jalanin pod.

### 98. **Deployments**

Template buat jalanin pod dalam jumlah banyak. Bisa update juga.

### 99. **Fault Tolerance**

Kemampuan sistem buat tetap jalan walau ada error atau node mati.

### 100. **Auto Heal**

K8s otomatis restart pod kalau error atau crash.

### 101. **Borg**

Cikal bakal Kubernetes, sistem orchestration internal Google.

---

> 🤓 Feel free buat fork repo ini, kasih bintang ⭐, dan upgrade Docker skill-mu. Kalau ada yang pengen ditambahin, open PR yaa!

---

Happy Containerizing\~ 🐳✨
