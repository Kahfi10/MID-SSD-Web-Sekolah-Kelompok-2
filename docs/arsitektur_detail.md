# Arsitektur Sistem - System Architect
**Oleh: Marhepi Rahmadani (105841109523)**

## 1. Arsitektur Sistem
Pendekatan: **Modular Monolith Architecture**

3 Layer:
- **Client**: Browser (HTML, CSS, JS, Bootstrap 5)
- **Application**: Express.js + 5 modul (EJS template)
- **Data**: MySQL + Redis cache (rencana)

## 2. Pembagian 6 vCPU

| vCPU | Layanan | Alasan |
|------|---------|--------|
| 1 | Web Server (Express.js) | Routing, rendering, session |
| 2 | Database Server (MySQL) | Penyimpanan terpusat |
| 3 | Modul Jurnal Mengajar | Akses harian tinggi |
| 4 | Modul BK & Kesiswaan | Data sensitif |
| 5 | Load Balancer + Monitoring | Distribusi beban |
| 6 | Backup + Redis Cache | Performa & keamanan |

## 3. Load Balancing
Load balancer (vCPU 5) mendistribusikan request menggunakan algoritma round-robin. Jika modul Jurnal overload, request diarahkan ke instance lain.

## 4. API Integration
Saat ini semua modul berbagi database langsung. Ke depan, setiap modul dapat menjadi REST API service. Contoh: Modul BK memanggil `GET /api/siswa/{id}`.

## 5. Scaling Strategy
- **Horizontal**: Tambah instance server untuk modul dengan beban tinggi
- **Vertical**: Upgrade RAM/CPU server database
- **Hybrid**: Kombinasi keduanya

## 6. Monitoring
Rencana menggunakan PM2 (proses monitoring) + Grafana (visualisasi metrik CPU, RAM, request rate).

## 7. Logging
Tabel `activity_logs` mencatat: user_id, action, description, ip_address, created_at.
