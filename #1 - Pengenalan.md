Docker itu basically sebuah platform buat nge-package aplikasi kita beserta semua dependency-nya—kayak web server, runtime, database, library, bahkan bagian dari OS—ke dalam satu unit yang disebut Docker Image. Nah, image ini bisa dijalankan sebagai container.

Ini berguna banget apalagi kalau kita mau scale up aplikasi ke beberapa server atau node. Misalnya kita punya 4 node, kita nggak perlu repot-repot setup environment satu-satu. Tinggal deploy image yang sama ke semua node itu, dan boom! Aplikasi langsung jalan dengan environment yang konsisten
-----
Docker adalah platform perangkat lunak sumber terbuka yang memungkinkan Anda untuk membangun, menguji, dan menjalankan aplikasi dalam kontainer. Kontainer adalah unit standar perangkat lunak yang berisi kode aplikasi dan semua dependensinya, seperti pustaka dan pengaturan sistem, yang memungkinkan aplikasi berjalan secara konsisten di berbagai lingkungan. Docker memisahkan aplikasi dari infrastruktur, sehingga Anda dapat mengirimkan perangkat lunak dengan cepat dan mengelola infrastruktur seperti mengelola aplikasi. 

Secara singkat, Docker memudahkan pengembang untuk: 
Membangun aplikasi:
Docker memungkinkan pengembang untuk mengemas aplikasi dan dependensinya ke dalam kontainer. 
Menjalankan aplikasi:
Kontainer Docker dapat dijalankan di berbagai lingkungan, baik itu di komputer lokal, server, atau cloud, tanpa perlu khawatir tentang masalah kompatibilitas. 
Berbagi aplikasi:
Pengembang dapat dengan mudah membagikan kontainer Docker mereka dengan orang lain, sehingga memudahkan kolaborasi dan penyebaran aplikasi. 
Menyederhanakan manajemen aplikasi:
Dengan Docker, Anda dapat mengelola infrastruktur aplikasi dengan cara yang sama seperti mengelola aplikasi itu sendiri, sehingga menyederhanakan proses pengembangan dan penyebaran. 
Dengan menggunakan Docker, pengembang dapat mempercepat proses pengembangan, meningkatkan konsistensi antara lingkungan pengembangan dan produksi, serta menyederhanakan pengelolaan aplikasi
