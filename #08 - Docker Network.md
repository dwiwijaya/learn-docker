# 🌐 Docker Network

Docker network itu basically sistem yang bikin container bisa:

* Ngobrol satu sama lain 🗣️
* Terhubung ke internet 🌍
* Diisolasi dari container lain (kalau mau 🔒)

---

## 🧱 Jenis-Jenis Docker Network

| Tipe Network | Kegunaan                                          | Default? | Bisa custom? |
| ------------ | ------------------------------------------------- | -------- | ------------ |
| `bridge`     | Network default buat container lokal              | ✅        | ✅            |
| `host`       | Share network langsung sama host OS               | ❌        | ❌ (built-in) |
| `none`       | Gak ada akses jaringan sama sekali                | ❌        | ❌            |
| `overlay`    | Buat komunikasi antar node (di Swarm)             | ❌        | ✅            |
| `macvlan`    | Assign IP langsung dari jaringan fisik (kayak VM) | ❌        | ✅            |

---

## 🔌 1. Bridge Network (default)

Ini yang paling sering dipakai kalau lo run container biasa (non-compose, non-swarm).

```bash
docker network ls
```

Biasanya ada `bridge`, dan container otomatis masuk ke sana kecuali lo tentuin sendiri.

> Container di bridge bisa komunikasi kalau ada di network yang sama.

```bash
docker network create my-network
docker run -d --name app --network my-network my-image
docker run -it --name db --network my-network mysql
```

➡️ Container `app` bisa akses `db` via hostname: `db`

---

## 🔁 2. Host Network

Container pakai langsung jaringan host-nya. Jadi kayak gak punya isolasi.

```bash
docker run --network host nginx
```

⚠️ Hati-hati: gak bisa port mapping (`-p`), karena dia langsung ngambil port di host.

🧠 Biasanya dipakai buat performa tinggi atau debugging.

---

## 🚫 3. None Network

Bener-bener tanpa network. Isolated.

```bash
docker run --network none ubuntu
```

Biasanya buat security audit, atau testing tertentu yang gak butuh akses jaringan.

---

## ☁️ 4. Overlay Network (Docker Swarm)

Kalau lo pake **Swarm**, container lo bisa tersebar di banyak node. Nah, supaya mereka tetap bisa ngobrol, lo butuh **overlay network**.

```bash
docker network create \
  --driver overlay \
  my-overlay-net
```

Semua service yang tergabung di situ bakal bisa komunikasi pakai **nama servicenya**.

---

## 🧪 5. Macvlan (Advanced)

Biasanya buat kebutuhan enterprise/IoT. Container dapet IP dari jaringan fisik host.

```bash
docker network create -d macvlan ...
```

Mirip VM, tapi repot setup-nya, dan mostly buat kebutuhan advanced.

---

## 🧠 TL;DR

| Network Type | Kapan Dipakai                         |
| ------------ | ------------------------------------- |
| `bridge`     | Default local container, isolate      |
| `host`       | Perlu performa tinggi / debug network |
| `none`       | Gak butuh network sama sekali         |
| `overlay`    | Multi-host (Swarm) cluster            |
| `macvlan`    | IP dedicated, enterprise use case     |

---


* Lo bisa inspect network buat lihat siapa aja yang connect:

```bash
docker network inspect myapp-net
```


