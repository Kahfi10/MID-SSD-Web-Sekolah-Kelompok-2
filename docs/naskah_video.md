# Naskah Video Presentasi YouTube
**Web Sekolah Terintegrasi Berbasis Scalable System Design**
**Kelompok 2 | TI 4A | Durasi: 10-15 menit**

---

## Pembagian Waktu & Pembicara

| Segmen | Durasi | Pembicara | Topik |
|--------|--------|-----------|-------|
| 1 | 1 menit | Semua | Pembukaan & perkenalan anggota |
| 2 | 1 menit | Ashabul Kahfi | Latar belakang & tujuan |
| 3 | 1 menit | Ashabul Kahfi | Gambaran umum sistem & modul |
| 4 | 2 menit | Afra Muawiya | Demo modul (Jurnal, BK, Kesiswaan, Absensi) |
| 5 | 1.5 menit | Marhepi Rahmadani | Arsitektur sistem & pembagian vCPU |
| 6 | 1.5 menit | Muh. Eka Andri Setiawan | Rancangan database & ERD |
| 7 | 1 menit | Alyah Saputri Bakri | Hak akses & keamanan (RBAC) |
| 8 | 2 menit | Marhepi Rahmadani | Penjelasan 10 unsur SSD |
| 9 | 1 menit | Ashabul Kahfi | Risiko & solusi |
| 10 | 1 menit | Semua | Kesimpulan & penutup |
| | **13 menit** | | **Total** |

---

## SEGMEN 1 — PEMBUKAAN (1 menit)
**Pembicara: Semua anggota tampil bersama**

**Visual:** Tampilkan slide judul + foto anggota atau nama

**Naskah:**
"Assalamualaikum warahmatullahi wabarakatuh. Kami dari Kelompok 2 TI 4A, mata kuliah Scalable System Design, akan mempresentasikan proyek kami yang berjudul Perancangan dan Pengembangan Web Sekolah Terintegrasi Berbasis Scalable System Design."

"Perkenalkan, anggota kelompok kami:"
1. "Ashabul Kahfi — sebagai System Analyst dan Project Lead"
2. "Marhepi Rahmadani — sebagai System Architect"
3. "Muh. Eka Andri Setiawan — sebagai Database Designer"
4. "Afra Muawiya — sebagai UI/UX dan Documentation Designer"
5. "Alyah Saputri Bakri — sebagai Security dan Access Control Designer"

---

## SEGMEN 2 — LATAR BELAKANG & TUJUAN (1 menit)
**Pembicara: Ashabul Kahfi**

**Visual:** Slide latar belakang (poin-poin masalah)

**Naskah:**
"Latar belakang kami membuat proyek ini karena banyak sekolah masih menggunakan sistem yang terpisah-pisah. Ada sistem untuk jurnal mengajar, sistem untuk BK, sistem untuk kesiswaan, masing-masing berdiri sendiri. Akibatnya, data siswa harus diinput berulang kali, sering terjadi ketidakcocokan data, dan proses administrasi menjadi lambat."

"Tujuan proyek ini adalah: pertama, merancang web sekolah terintegrasi dengan beberapa modul dalam satu platform. Kedua, menerapkan satu database utama agar data konsisten. Ketiga, menerapkan konsep Scalable System Design. Keempat, merancang hak akses berdasarkan role. Dan kelima, membuat dokumentasi yang rapi."

---

## SEGMEN 3 — GAMBARAN UMUM & MODUL (1 menit)
**Pembicara: Ashabul Kahfi**

**Visual:** Tampilkan daftar modul (bisa diagram atau list)

**Naskah:**
"Sistem kami terdiri dari 5 modul utama. Pertama, Modul Manajemen Pengguna untuk login, logout, CRUD user, dan reset password. Kedua, Modul Data Kesiswaan untuk mengelola data siswa, kelas, wali kelas, serta import dan export CSV. Ketiga, Modul Jurnal Mengajar untuk guru mencatat aktivitas pembelajaran. Keempat, Modul Bimbingan Konseling untuk mencatat kasus, konseling, pelanggaran, dan prestasi siswa. Dan kelima, Modul Absensi untuk mencatat kehadiran siswa setiap hari."

"Seluruh modul ini menggunakan satu database MySQL yang sama, yaitu db_sekolah_ssd, sehingga data siswa cukup disimpan sekali dan bisa digunakan oleh semua modul."

---

## SEGMEN 4 — DEMO APLIKASI (2 menit)
**Pembicara: Afra Muawiya**

**Visual:** Rekaman layar (screen recording) aplikasi

**Naskah:**
"Saya akan mendemonstrasikan langsung aplikasi Web Sekolah Terintegrasi."

"Pertama, kita login sebagai admin dengan username admin dan password password123. Setelah login, kita masuk ke halaman Dashboard. Di sini ada 6 kartu statistik yang menampilkan jumlah siswa, guru, kelas, jurnal, kasus BK, dan pengguna. Ada juga grafik-grafik interaktif menggunakan Chart.js, serta log aktivitas terbaru."

"Kedua, kita buka menu Kesiswaan. Di sini kita bisa melihat daftar siswa, menambah siswa baru, mengedit, menghapus, mengelola kelas dan wali kelas, serta mengimport dan mengexport data dalam format CSV."

"Ketiga, menu Jurnal Mengajar. Seorang guru bisa memilih kelas, mata pelajaran, tanggal, materi, dan metode pembelajaran, lalu menyimpannya sebagai jurnal."

"Keempat, menu BK. Guru BK dapat mencatat kasus, konseling, pelanggaran, dan prestasi siswa. Semua data tersimpan terintegrasi dengan data siswa yang sama."

"Kelima, menu Absensi. Kita bisa memilih kelas dan tanggal, mencatat kehadiran siswa dengan status Hadir, Sakit, Izin, atau Alpa. Ada juga rekap absensi yang menampilkan persentase kehadiran per siswa dengan progress bar."

---

## SEGMEN 5 — ARSITEKTUR & vCPU (1.5 menit)
**Pembicara: Marhepi Rahmadani**

**Visual:** Diagram arsitektur sistem

**Naskah:**
"Sistem kami menggunakan pendekatan Modular Monolith Architecture. Aplikasi berjalan di Node.js Express.js dengan database MySQL. Tampilan menggunakan Bootstrap 5 dengan tema monokrom ala Apple."

"Untuk pembagian beban, kami merancang 6 vCPU. vCPU 1 adalah Web Server utama yang menangani routing dan rendering. vCPU 2 adalah Database Server MySQL. vCPU 3 dikhususkan untuk Modul Jurnal Mengajar karena akses harian tinggi. vCPU 4 untuk Modul BK dan Kesiswaan karena berisi data sensitif. vCPU 5 untuk Load Balancer yang mendistribusikan request pengguna. Dan vCPU 6 untuk Redis Cache dan backup data."

"Strategi scaling yang kami terapkan: horizontal scaling dengan menambah server untuk modul yang sibuk, vertical scaling dengan meningkatkan kapasitas server database, dan hybrid scaling yang mengombinasikan keduanya."

---

## SEGMEN 6 — DATABASE & ERD (1.5 menit)
**Pembicara: Muh. Eka Andri Setiawan**

**Visual:** Tampilkan ERD

**Naskah:**
"Database kami bernama db_sekolah_ssd yang terdiri dari 16 tabel. Tabel-tabel utamanya antara lain: roles untuk menyimpan role pengguna, users untuk akun, students untuk data siswa, teachers untuk data guru, classes untuk kelas, subjects untuk mata pelajaran, teaching_journals untuk jurnal mengajar, bk_cases untuk kasus BK, attendances untuk absensi, dan activity_logs untuk mencatat semua aktivitas pengguna."

"Setiap tabel memiliki foreign key yang menghubungkan satu sama lain. Contohnya, tabel students terhubung ke classes melalui kolom class_id. Tabel teaching_journals terhubung ke teachers, classes, dan subjects. Tujuan relasi ini adalah menjaga konsistensi data."

"Kami juga membuat index pada kolom yang sering di-query seperti student_id, teacher_id, class_id, dan attendance_date agar pencarian data lebih cepat."

---

## SEGMEN 7 — HAK AKSES & KEAMANAN (1 menit)
**Pembicara: Alyah Saputri Bakri**

**Visual:** Tabel RBAC atau screenshot kode

**Naskah:**
"Sistem kami memiliki 7 role pengguna: Admin, Kepala Sekolah, Guru, Guru BK, Wali Kelas, Siswa, dan Orang Tua. Setiap role memiliki hak akses yang berbeda."

"Contohnya: Admin bisa mengakses seluruh modul. Guru hanya bisa mengakses Jurnal Mengajar dan Absensi. Guru BK khusus mengakses modul BK. Kepala Sekolah bisa melihat laporan dan rekap. Wali Kelas bisa melihat data siswa di kelasnya."

"Keamanan password menggunakan bcryptjs dengan salt round 10, jadi password tidak disimpan dalam bentuk plain text. Semua aktivitas pengguna dicatat di tabel activity_logs untuk audit trail. Sistem juga menggunakan prepared statements untuk mencegah SQL Injection."

---

## SEGMEN 8 — 10 UNSUR SCALABLE SYSTEM DESIGN (2 menit)
**Pembicara: Marhepi Rahmadani**

**Visual:** Slide dengan 10 poin SSD

**Naskah:**
"Kami menerapkan 10 unsur Scalable System Design dalam proyek ini."

"1. Modular Architecture: Sistem dibagi menjadi 5 modul dengan direktori dan router terpisah."

"2. Centralized Database: Semua modul menggunakan satu database MySQL sehingga data konsisten."

"3. Load Balancing: vCPU 5 bertugas mendistribusikan request ke server yang tepat."

"4. Horizontal Scaling: Modul dengan beban tinggi seperti Jurnal Mengajar bisa ditambah instance server."

"5. Vertical Scaling: Server database bisa ditingkatkan RAM dan CPU-nya."

"6. API-Based Integration: Modul-modul menggunakan data bersama dan ke depan bisa dipisah menjadi REST API."

"7. Role-Based Access Control: Middleware allowRoles() membatasi akses berdasarkan role."

"8. Database Optimization: Index pada kolom frequent query, foreign key constraints, normalisasi 3NF."

"9. Caching: Rencana implementasi Redis untuk menyimpan data yang sering diakses seperti daftar kelas, guru, dan mapel."

"10. Monitoring dan Logging: Tabel activity_logs mencatat setiap aktivitas. Dashboard menampilkan aktivitas terbaru untuk monitoring real-time."

---

## SEGMEN 9 — RISIKO & SOLUSI (1 menit)
**Pembicara: Ashabul Kahfi**

**Visual:** Tabel risiko (bisa slide)

**Naskah:**
"Setiap sistem pasti memiliki risiko. Kami mengidentifikasi beberapa risiko dan solusinya."

"Pertama, database menjadi bottleneck karena semua modul bergantung padanya. Solusinya: read-replica, caching Redis, dan connection pooling."

"Kedua, data BK yang sensitif bisa bocor. Solusinya: RBAC ketat, hanya guru BK dan admin yang bisa mengakses."

"Ketiga, server overload saat jam sibuk. Solusinya: load balancing dan horizontal scaling."

"Keempat, kehilangan data. Solusinya: backup database periodik dan export data via CSV."

"Kelima, SQL Injection. Solusinya: prepared statements di semua query."

---

## SEGMEN 10 — KESIMPULAN & PENUTUP (1 menit)
**Pembicara: Semua anggota tampil bersama**

**Visual:** Slide kesimpulan + link GitHub + link YouTube

**Naskah:**
"Sebagai kesimpulan, proyek Web Sekolah Terintegrasi ini berhasil menggabungkan 5 modul utama dalam satu platform dengan satu database terpusat dan sistem hak akses berbasis role."

"Kami telah menerapkan konsep Scalable System Design melalui modular architecture, centralized database, pembagian vCPU, RBAC, monitoring, logging, dan strategi scaling."

"Source code proyek ini dapat diakses di GitHub melalui link yang ada di deskripsi video. Kami juga sudah menyusun laporan lengkap dalam format PDF."

"Sekian presentasi dari Kelompok 2 TI 4A. Kami mohon maaf jika ada kekurangan. Wassalamualaikum warahmatullahi wabarakatuh."

---

## Catatan Produksi Video

### Peralatan
- Gunakan Google Meet / Zoom untuk merekam layar + webcam
- Atau rekam layar pakai OBS Studio (gratis)
- Boleh pakai HP untuk merekam wajah masing-masing

### Cara Edit
1. Rekam masing-masing segmen terpisah
2. Gabung pakai CapCut / Kinemaster / Adobe Premiere
3. Selipkan screen recording di Segmen 4 (Demo)
4. Selipkan gambar diagram di Segmen 5, 6, 8
5. Atur durasi total 10-15 menit

### Yang Harus Disiapkan
- [ ] Aplikasi jalan di localhost atau server
- [ ] Diagram arsitektur (PNG)
- [ ] ERD (PNG)
- [ ] Use case diagram (PNG)
- [ ] Slide presentasi (opsional, boleh pakai Canva)
- [ ] Screen recorder (OBS / bawaan Windows)
