# Analisis Sistem - System Analyst
**Oleh: Ashabul Kahfi (105841108523)**

## 1. Latar Belakang
Banyak sekolah masih menggunakan sistem terpisah untuk mengelola jurnal mengajar, data siswa, BK, absensi, dan laporan. Akibatnya sering terjadi data ganda, data tidak sinkron, proses administrasi lambat, dan sulitnya integrasi antarbagian.

## 2. Tujuan
1. Merancang web sekolah terintegrasi dengan 5 modul utama
2. Satu database utama untuk konsistensi data
3. Menerapkan Scalable System Design
4. RBAC dengan 7 role pengguna
5. Dokumentasi sistematis

## 3. Analisis Kebutuhan

### Kebutuhan Fungsional
| Modul | Fitur |
|-------|-------|
| Manajemen Pengguna | Login, logout, CRUD user, role, reset password, audit log |
| Data Kesiswaan | CRUD siswa, kelas, wali kelas, filter status, import/export CSV |
| Jurnal Mengajar | Input jurnal, riwayat, rekap per guru/kelas |
| BK | Kasus, konseling, pelanggaran, prestasi, rekap |
| Absensi | Input kehadiran, status hadir/sakit/izin/alpa, rekap persentase |

### Kebutuhan Non-Fungsional
- Keamanan: RBAC 7 role, bcrypt, session cookie
- Skalabilitas: Modular architecture, 6 vCPU, horizontal & vertical scaling
- Kinerja: Index database, query teroptimasi, cache Redis
- Integritas: Foreign key constraints, ACID, normalisasi 3NF
- Audit: Semua aktivitas tercatat di activity_logs

## 4. Alur Sistem
1. Login → session dibuat
2. Dashboard → statistik + grafik sesuai role
3. Navigasi → menu disesuaikan role
4. Operasi data → CRUD sesuai hak akses, tercatat di log
5. Logout → session dihapus

## 5. Use Case
1. Guru mengisi jurnal mengajar
2. Guru BK mencatat kasus siswa
3. Admin mengelola data siswa
