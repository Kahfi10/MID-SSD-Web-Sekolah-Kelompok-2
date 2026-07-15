# Naskah Video Presentasi MID-SSD Web Sekolah Terintegrasi
## Kelompok 2 TI 4A
### Durasi: ± 30 menit | 5 Pembicara

---

## Pembagian Pembicara Berdasarkan Commit

| Pembicara | Bagian |
|---|---|
| **Ashabul Kahfi** (Project Lead) | Pembukaan, arsitektur sistem, frontend/backend/deploy, initial project, dashboard, theme redesign, data seed |
| **Marhepi Rahmadani** | Reset Password, BK module & recap, architecture doc, Search suggestion (part 2) |
| **Muh. Eka Andri Setiawan** | Database design, homeroom teacher management, Search bar, Pagination (part 1) |
| **Afra Muawiya** | UI/UX design, CSV import, laporan HTML, responsive CSS, Dashboard Siswa, video script |
| **Alyah Saputri Bakri** | Security RBAC, CSV export, use case diagram, Date Range filter, remove drawio |

---

## SEGMEN 1: PEMBUKAAN & OVERVIEW (3 menit)
### Pembicara: Ashabul Kahfi

**Visual:** Tampilkan layar awal (login page https://web-sekolah.duckdns.org)

**Skrip:**
"Assalamualaikum warahmatullahi wabarakatuh. Kami dari Kelompok 2 TI 4A akan mempresentasikan project MID-SSD kami, yaitu **Web Sekolah Terintegrasi**. Saya Ashabul Kahfi sebagai project lead, bersama tim: Marhepi Rahmadani, Muh. Eka Andri Setiawan, Afra Muawiya, dan Alyah Saputri Bakri.

Web Sekolah Terintegrasi adalah sistem informasi manajemen sekolah berbasis web yang mencakup modul Pengguna, Kesiswaan, Jurnal Mengajar, Bimbingan Konseling, dan Absensi.

Teknologi yang digunakan:
- Backend: Node.js Express
- Database: MySQL dengan 16 tabel relasional
- Frontend: Bootstrap 5, EJS template, Chart.js
- Deploy: Oracle Cloud, Nginx reverse proxy, PM2, HTTPS Certbot

Aplikasi sudah live dan bisa diakses di https://web-sekolah.duckdns.org."

**Tampilkan:**
- [00:00-00:30] Logo project, tampilkan anggota tim
- [00:30-01:00] Arsitektur diagram (docs/arsitektur.jpg)
- [01:00-02:00] Tampilkan login page di browser
- [02:00-03:00] Tampilkan ERD (docs/erd.jpeg) + jelaskan relasi tabel

---

## SEGMEN 2: DATABASE & ARSITEKTUR (3 menit)
### Pembicara: Muh. Eka Andri Setiawan

**Visual:** ERD, struktur database, schema.sql

**Skrip:**
"Saya Muh. Eka Andri Setiawan akan menjelaskan perancangan database. Kami merancang 16 tabel utama yang saling berelasi:

1. **users & roles** — manajemen pengguna dengan RBAC (7 role)
2. **students & classes** — data siswa dan kelas, relasi ke wali kelas (teachers)
3. **teachers** — data guru yang terhubung dengan akun user
4. **subjects & schedules** — mata pelajaran dan jadwal mengajar
5. **teaching_journals** — jurnal mengajar harian guru
6. **bk_cases, bk_counseling_notes, student_violations, student_achievements** — modul BK
7. **attendances** — absensi harian siswa
8. **academic_years & semesters** — tahun ajaran dan semester
9. **activity_logs** — log aktivitas pengguna untuk audit trail

Relasi utama: setiap siswa memiliki NIS unik, terhubung ke kelas, dan link ke akun user untuk login."

**Tampilkan:**
- [03:00-03:30] Tampilkan ERD (docs/erd.jpeg) zoom ke tabel-tabel utama
- [03:30-04:00] Tampilkan file database/schema.sql
- [04:00-05:00] Tampilkan file database/spesifikasi.md
- [05:00-06:00] Jelaskan relasi user ↔ siswa, guru ↔ jurnal

---

## SEGMEN 3: UI/UX DESIGN & THEME (2 menit)
### Pembicara: Afra Muawiya

**Visual:** Perbandingan before/after theme, desain card, layout

**Skrip:**
"Saya Afra Muawiya bertanggung jawab atas UI/UX design. Kami mengadopsi **Apple-inspired monochrome theme** dengan warna-warna elegan:
- Background: #f5f5f7 (abu-abu terang khas Apple)
- Teks utama: #1d1d1f (hitam pekat)
- Abstrak: #86868b
- Tombol biru khas Apple: #0071e3

Setiap halaman menggunakan card putih dengan shadow halus, border radius 12px, dan tipografi sistem font. Semua halaman sudah **responsive** untuk mobile dengan media queries khusus.

Saya juga membuat laporan lengkap dalam format HTML (laporan.html) yang mencakup 22 section termasuk analisis 10 soal."

**Tampilkan:**
- [06:00-06:30] Tampilkan file docs/ui_ux_desain.md
- [06:30-07:00] Tampilkan screenshot dashboard dengan theme
- [07:00-08:00] Tampilkan laporan.html di browser

---

## SEGMEN 4: KEAMANAN & RBAC (2 menit)
### Pembicara: Alyah Saputri Bakri

**Visual:** Kode middleware auth.js, rbac.js, role table

**Skrip:**
"Saya Alyah Saputri Bakri mengimplementasikan sistem keamanan berbasis **Role-Based Access Control (RBAC)**. Setiap pengguna memiliki role dengan akses berbeda:

- **Admin** — akses penuh ke semua modul
- **Kepala Sekolah** — view semua data, tidak bisa CRUD
- **Guru** — mengelola jurnal mengajar sendiri
- **Guru BK** — mengelola modul BK
- **Wali Kelas** — melihat data siswa & absensi kelas
- **Siswa** — melihat dashboard pribadi
- **Orang Tua** — (tahap pengembangan)

Setiap route dilindungi middleware `isAuthenticated` untuk cek session, dan `allowRoles` untuk filter role. Password di-hash menggunakan bcryptjs. Semua aktivitas dicatat di `activity_logs`."

**Tampilkan:**
- [08:00-08:30] Tampilkan file src/middleware/auth.js & rbac.js
- [08:30-09:00] Tampilkan file docs/keamanan_rbac.md
- [09:00-10:00] Demonstrasi login sebagai admin vs guru vs siswa

---

## SEGMEN 5: MODUL UTAMA — Users, Kesiswaan, Jurnal (4 menit)
### Pembicara: Ashabul Kahfi

**Visual:** Demo langsung fitur di browser

**Skrip:**
"Saya akan mendemonstrasikan modul-modul utama yang saya kerjakan sebagai project lead dan konseptor utama.

**Initial Project & Dashboard:**
Dari awal, project ini dibangun dengan struktur MVC modular. Setiap modul punya folder sendiri: routes, views, dan kadang middleware.

Dashboard menampilkan 6 kartu statistik (jumlah siswa aktif, guru, jurnal, kasus BK, kelas, user) dan 5 grafik Chart.js: jurnal per bulan, status siswa, siswa per kelas, gender, dan kasus per jenis. Ada juga **live clock** real-time dan daftar aktivitas terbaru.

**Modul Absensi** (commit 0fc5aeb):
Absensi mencatat kehadiran siswa per kelas per tanggal, dengan filter berdasarkan kelas dan rentang tanggal. Status: Hadir (hijau), Sakit (oranye), Izin (biru), Alpa (merah). Ada rekap persentase kehadiran per siswa.

**Deployment:**
Aplikasi di-deploy di Oracle Cloud, menggunakan Nginx sebagai reverse proxy dari port 80/443 ke port 3000, dengan HTTPS via Certbot. Process manager menggunakan PM2 untuk auto-restart."

**Tampilkan:**
- [10:00-10:30] Tampilkan source code struktur folder
- [10:30-11:00] Demo dashboard dengan grafik
- [11:00-12:00] Demo modul Absensi (input absensi, filter, rekap)
- [12:00-13:00] Demo modul Jurnal Mengajar (list, filter, pagination)
- [13:00-14:00] Tampilkan terminal: pm2 list, nginx config

---

## SEGMEN 6: MODUL BK & REKAP (3 menit)
### Pembicara: Marhepi Rahmadani

**Visual:** Demo modul BK di browser, BK recap

**Skrip:**
"Saya Marhepi Rahmadani akan mendemonstrasikan modul **Bimbingan Konseling** yang saya kembangkan.

Modul BK memiliki 4 sub-modul dalam satu halaman:
1. **Kasus** — mencatat kasus siswa dengan status (Open/Proses/Selesai)
2. **Catatan Konseling** — sesi konseling dengan topik dan tindak lanjut
3. **Pelanggaran** — catatan pelanggaran dengan jenis dan sanksi
4. **Prestasi** — prestasi siswa dengan tingkat (sekolah/kota/nasional)

Fitur unggulan: **Rekap BK** yang menampilkan kasus per siswa (dengan filter kelas dan tanggal), visualisasi jenis kasus, dan daftar pelanggaran.

Saya juga menyusun dokumentasi arsitektur detail (docs/arsitektur_detail.md) yang menjelaskan struktur folder, alur data, dan deployment."

**Tampilkan:**
- [14:00-14:30] Tampilkan halaman BK dengan 4 tabel
- [14:30-15:00] Demo tambah kasus, update status
- [15:00-15:30] Demo Rekap BK dengan filter
- [15:30-16:00] Tampilkan file docs/arsitektur_detail.md
- [16:00-17:00] Jelaskan alur data BK

---

## SEGMEN 7: FITUR TAMBAHAN — Wali Kelas, Import/Export CSV, Reset Password (3 menit)
### Pembicara: Muh. Eka Andri Setiawan & Afra Muawiya & Alyah Saputri Bakri

**Visual:** Demo fitur di browser

**Skrip:**

**Eka:** "Saya mengerjakan fitur **Kelola Wali Kelas** di modul Kesiswaan. Admin bisa menetapkan guru sebagai wali kelas untuk setiap kelas."

**Afra:** "Saya mengerjakan fitur **Import Siswa dari CSV**. Admin bisa upload file CSV berisi data siswa dalam jumlah besar sekaligus — sangat berguna untuk migrasi data awal."

**Alyah:** "Saya mengerjakan **Export Siswa ke CSV** yang memungkinkan admin mendownload data siswa dalam format CSV. Juga fitur **Reset Password** (co-author dengan Marhepi) yang memungkinkan admin mereset password user ke default 'password123'."

**Tampilkan:**
- [17:00-17:30] Eka: Demo halaman Kelola Wali Kelas
- [17:30-18:00] Afra: Demo Import CSV (tampilkan format CSV)
- [18:00-18:30] Alyah: Demo Export CSV + Reset Password
- [18:30-19:00] Alyah: Tampilkan use case diagram (docs/usecase.jpeg)

---

## SEGMEN 8: FITUR MODERN — Search Bar, Pagination, Profil (4 menit)
### Pembicara: Ashabul Kahfi, Muh. Eka Andri Setiawan, Marhepi Rahmadani

**Visual:** Demo fitur di browser

**Skrip:**

**Ashabul:** "Di sesi ini kami akan mendemonstrasikan fitur-fitur modern yang meningkatkan user experience.

**Profil & Ganti Password** (commit 11213b2): Setiap user sekarang bisa mengubah profil sendiri (nama, email) dan mengganti password tanpa harus meminta admin — saya kerjakan bersama Marhepi dan Eka."

**Eka:** "**Search Bar** (commit 4527d10): Kami menambahkan search bar di semua halaman — Users, Kesiswaan, Jurnal, BK, dan Absensi. Cukup ketik nama/NIS/materi, tabel langsung terfilter. Saya kerjakan bersama Ashabul dan Marhepi.

**Pagination** (commit 72731bd): Setiap halaman list sekarang diatur 10 data per halaman, mencegah tabel terlalu panjang. Saya kerjakan bersama Ashabul dan Marhepi."

**Marhepi:** "**Search Suggestion AJAX** (commit 0133f81, a69177e, bb2d8fc): Fitur paling canggih — saat mengetik di search bar, muncul dropdown suggestion real-time tanpa reload halaman. Data diambil via API endpoint JSON dengan debounce 300ms. Saya kerjakan bersama Ashabul dan Eka untuk Users, dan bersama Ashabul untuk modul lainnya.

Termasuk fix klik & hover effect (commit c13cd47, 9fcd3ab) agar dropdown lebih mudah diklik dan ada efek hover."

**Tampilkan:**
- [19:00-19:30] Ashabul: Demo Profil & Ganti Password
- [19:30-20:00] Eka: Demo Search bar di semua halaman
- [20:00-20:30] Eka: Demo Pagination (tampilkan nomor halaman)
- [20:30-21:30] Marhepi: Demo Search Suggestion (ketik, muncul dropdown, klik)
- [21:30-22:00] Marhepi: Tampilkan file docs/arsitektur_detail.md

---

## SEGMEN 9: DASHBOARD SISWA & DATE RANGE FILTER (2 menit)
### Pembicara: Afra Muawiya & Alyah Saputri Bakri

**Visual:** Demo dashboard siswa, filter absensi

**Skrip:**

**Afra:** "**Dashboard Siswa** (commit cad66f6): Siswa yang login sekarang punya dashboard pribadi. Mereka bisa melihat data diri, rekap absensi (hadir/sakit/izin/alpa), prestasi, pelanggaran, dan riwayat absensi terbaru. Saya kerjakan bersama Ashabul, Eka, dan Alyah."

**Alyah:** "**Date Range Filter** (commit 8cd0bb5): Filter absensi sekarang dilengkapi tombol cepat 7 hari / 30 hari / 3 bulan. User tinggal klik, tanggal otomatis terisi dan filter langsung dijalankan. Saya kerjakan bersama Ashabul, Eka, dan Afra."

**Tampilkan:**
- [22:00-22:30] Afra: Login sebagai siswa1, demo dashboard siswa
- [22:30-23:00] Afra: Tampilkan halaman profil siswa
- [23:00-23:30] Alyah: Demo filter absensi dengan tombol cepat
- [23:30-24:00] Alyah: Tampilkan perbandingan sebelum/sesudah

---

## SEGMEN 10: DATA SEED & DEMO APLIKASI LIVE (2 menit)
### Pembicara: Ashabul Kahfi

**Visual:** Terminal, browser, aplikasi live

**Skrip:**
"**Data Seed** (commit 63c921f): Kami mengenerate 50+ data jurnal mengajar realistis untuk 5 guru selama 2 minggu, dengan materi, metode, dan catatan bervariasi. Bisa dilihat di halaman Jurnal Mengajar.

**Demo Live:** Sekarang mari kita lihat aplikasi lengkap yang sudah berjalan di https://web-sekolah.duckdns.org.

**Login dengan berbagai akun:**
- admin / password123 — full akses
- guru1 / password123 — lihat jurnal sendiri
- siswa1 / password123 — dashboard pribadi
- kepsek / password123 — view all reports
- guru_bk / password123 — modul BK

**Yang bisa dilihat:**
- Dashboard dengan grafik real-time
- Jurnal dengan 50+ data + pagination
- Absensi dengan quick filter
- BK dengan 4 sub-modul
- Search suggestion real-time
- Profil & ganti password"

**Tampilkan:**
- [24:00-24:30] Tampilkan terminal node database/seed.js
- [24:30-25:00] Login admin, demo semua fitur
- [25:00-25:30] Login siswa1, demo dashboard
- [25:30-26:00] Tampilkan https://web-sekolah.duckdns.org di browser

---

## SEGMEN 11: PENUTUP (1 menit)
### Pembicara: Semua anggota (setiap orang 1 kalimat)

**Visual:** Nama anggota, terima kasih

**Skrip:**

**Ashabul:** "Demikian presentasi Web Sekolah Terintegrasi dari Kelompok 2 TI 4A."

**Marhepi:** "Terima kasih kepada Bapak/Ibu Dosen pengampu mata kuliah Scalable System Design."

**Eka:** "Semoga sistem ini bermanfaat dan dapat dikembangkan lebih lanjut."

**Afra:** "Source code tersedia di GitHub: https://github.com/Kahfi10/MID-SSD-Web-Sekolah-Kelompok-5"

**Alyah:** "Wassalamualaikum warahmatullahi wabarakatuh."

**Tampilkan:**
- [26:00-26:30] Tampilkan GitHub repository
- [26:30-27:00] Tampilkan nama & NIM semua anggota
- [27:00] Fade out

---

## LAMPIRAN: Timeline Presentasi

| Segmen | Waktu | Pembicara | Durasi |
|---|---|---|---|
| 1 | 00:00-03:00 | Ashabul | 3 menit |
| 2 | 03:00-06:00 | Eka | 3 menit |
| 3 | 06:00-08:00 | Afra | 2 menit |
| 4 | 08:00-10:00 | Alyah | 2 menit |
| 5 | 10:00-14:00 | Ashabul | 4 menit |
| 6 | 14:00-17:00 | Marhepi | 3 menit |
| 7 | 17:00-19:00 | Eka+Afra+Alyah | 2 menit |
| 8 | 19:00-22:00 | Ashabul+Eka+Marhepi | 3 menit |
| 9 | 22:00-24:00 | Afra+Alyah | 2 menit |
| 10 | 24:00-26:00 | Ashabul | 2 menit |
| 11 | 26:00-27:00 | Semua | 1 menit |

**Total: ± 27 menit**

## Lampiran: Screenshot yang Perlu Diambil

| No | Halaman | Resolusi |
|---|---|---|
| 1 | Login page | 1920x1080 |
| 2 | Dashboard admin | 1920x1080 |
| 3 | Users management | 1920x1080 |
| 4 | Kesiswaan (siswa) | 1920x1080 |
| 5 | Jurnal Mengajar | 1920x1080 |
| 6 | BK page | 1920x1080 |
| 7 | Absensi + filter | 1920x1080 |
| 8 | Rekap Absensi | 1920x1080 |
| 9 | Dashboard Siswa | 1920x1080 |
| 10 | Profil & Ganti Password | 1920x1080 |
| 11 | Search suggestion dropdown | 1920x1080 |
| 12 | Filter date range | 1920x1080 |
