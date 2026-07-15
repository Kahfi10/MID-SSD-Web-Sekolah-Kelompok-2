# Naskah Video Presentasi MID-SSD Web Sekolah Terintegrasi
## Kelompok 2 TI 4A
### Durasi: ± 30 menit | 5 Pembicara

---

## Peran Utama Anggota (TUGAS MID)

| No | Nama | NIM | Peran |
|---|---|---|---|
| 1 | **Ashabul Kahfi** | 105841108523 | **System Analyst / Project Lead** |
| 2 | **Marhepi Rahmadani** | 105841109523 | **System Architect** |
| 3 | **Muh. Eka Andri Setiawan** | 105841110723 | **Database Designer** |
| 4 | **Afra Muawiya** | 105841108423 | **UI/UX & Documentation Designer** |
| 5 | **Alyah Saputri Bakri** | 105841107723 | **Security & Access Control Designer** |

Setiap anggota menjelaskan **tugas pokok (role document)** + **commit fitur** masing-masing.

## Pembagian Pembicara Berdasarkan Commit

| Pembicara | Peran | Menjelaskan |
|---|---|---|
| **Ashabul Kahfi** | System Analyst / Project Lead | System analysis doc, initial project, dashboard, absensi, jurnal, profil, search suggestion, deployment, theme redesign, data seed |
| **Marhepi Rahmadani** | System Architect | Architecture detail doc, BK module & recap, reset password, search suggestion, fix bugs |
| **Muh. Eka Andri Setiawan** | Database Designer | Database specification doc, homeroom teacher mgmt, search bar, pagination |
| **Afra Muawiya** | UI/UX & Documentation Designer | UI/UX design doc, CSV import, laporan HTML, responsive CSS, dashboard siswa, video script |
| **Alyah Saputri Bakri** | Security & Access Control Designer | Security RBAC doc, CSV export, use case diagram, date range filter, remove drawio |

---

## SEGMEN 1: PEMBUKAAN & SISTEM ANALISIS (4 menit)
### Pembicara: Ashabul Kahfi — **System Analyst / Project Lead**

**Visual:** Tampilkan layar awal (login page https://web-sekolah.duckdns.org)

**Skrip:**
"Assalamualaikum warahmatullahi wabarakatuh. Kami dari Kelompok 2 TI 4A akan mempresentasikan project MID-SSD kami, yaitu **Web Sekolah Terintegrasi**.

Saya **Ashabul Kahfi**, sebagai **System Analyst** dan **Project Lead**. Peran saya adalah menganalisis kebutuhan sistem, merancang arsitektur secara keseluruhan, mengimplementasikan modul utama, dan melakukan deployment.

Bersama tim: **Marhepi Rahmadani** (System Architect), **Muh. Eka Andri Setiawan** (Database Designer), **Afra Muawiya** (UI/UX & Documentation Designer), dan **Alyah Saputri Bakri** (Security & Access Control Designer).

Web Sekolah Terintegrasi adalah sistem informasi manajemen sekolah berbasis web yang mencakup 5 modul utama:
1. Manajemen Pengguna dengan RBAC
2. Data Kesiswaan
3. Jurnal Mengajar
4. Bimbingan Konseling
5. Absensi Siswa

Teknologi yang digunakan:
- Backend: Node.js Express dengan arsitektur MVC modular
- Database: MySQL dengan 16 tabel relasional
- Frontend: Bootstrap 5, EJS template, Chart.js untuk grafik
- Deploy: Oracle Cloud, Nginx reverse proxy, PM2, HTTPS Certbot

Aplikasi sudah live dan bisa diakses di https://web-sekolah.duckdns.org.

**Dokumen Analisis Sistem** (commit e04a9e3): Sebagai System Analyst, saya menyusun dokumen analisis sistem yang mencakup identifikasi masalah, analisis kebutuhan fungsional dan non-fungsional, use case diagram, dan activity diagram yang menjadi dasar pengembangan aplikasi ini."

**Tampilkan:**
- [00:00-00:30] Tampilkan slide judul + foto semua anggota + peran
  → Narasi: "Assalamualaikum, kami Kelompok 2 TI 4A, saya Ashabul Kahfi sebagai System Analyst, bersama tim dengan peran masing-masing."
- [00:30-01:30] Tampilkan file docs/analisis_sistem.md
  → Narasi: "Sebagai System Analyst, saya menyusun dokumen analisis sistem yang mencakup identifikasi masalah, analisis kebutuhan, dan diagram-diagram yang menjadi fondasi pengembangan aplikasi ini."
- [01:30-02:30] Tampilkan use case diagram (docs/usecase.jpeg)
  → Narasi: "Use case diagram ini menggambarkan interaksi antara 5 aktor utama — Admin, Kepala Sekolah, Guru, Guru BK, dan Siswa — dengan masing-masing hak akses sesuai role mereka."
- [02:30-03:30] Tampilkan login page di browser + arsitektur diagram
  → Narasi: "Ini tampilan login aplikasi. Arsitektur yang kami gunakan adalah MVC modular dengan Node.js Express di backend, MySQL di database, Bootstrap 5 di frontend, dan Chart.js untuk visualisasi data."
- [03:30-04:00] Tampilkan ERD (docs/erd.jpeg)
  → Narasi: "Entity Relationship Diagram menunjukkan 16 tabel relasional. Eka akan menjelaskan detailnya di segmen berikutnya."

---

## SEGMEN 2: DATABASE DESIGN (3 menit)
### Pembicara: Muh. Eka Andri Setiawan — **Database Designer**

**Visual:** ERD, struktur database, schema.sql

**Skrip:**
"Saya **Muh. Eka Andri Setiawan**, sebagai **Database Designer**. Peran saya adalah merancang struktur database, mendefinisikan relasi antar tabel, dan memastikan integritas data.

**Dokumen Database Spesifikasi** (commit 298cd02): Saya menyusun dokumentasi lengkap database yang mencakup skema, relasi, indeks, dan penjelasan setiap tabel.

Kami merancang **16 tabel utama** yang saling berelasi:

1. **users & roles** — manajemen pengguna dengan RBAC (7 role)
2. **students & classes** — data siswa dan kelas, relasi ke wali kelas (teachers)
3. **teachers** — data guru yang terhubung dengan akun user
4. **subjects & schedules** — mata pelajaran dan jadwal mengajar
5. **teaching_journals** — jurnal mengajar harian guru
6. **bk_cases, bk_counseling_notes, student_violations, student_achievements** — modul BK
7. **attendances** — absensi harian siswa
8. **academic_years & semesters** — tahun ajaran dan semester
9. **activity_logs** — log aktivitas pengguna untuk audit trail

**Fitur yang saya implementasikan:**
- **Kelola Wali Kelas** (commit c3a151b, d9ebcb3): Admin bisa menetapkan guru sebagai wali kelas.
- **Search bar** (commit 4527d10 — co-author): Pencarian real-time di semua halaman.
- **Pagination** (commit 72731bd — co-author): 10 data per halaman."

**Tampilkan:**
- [04:00-04:30] Tampilkan ERD (docs/erd.jpeg) zoom ke tabel-tabel utama
  → Narasi: "16 tabel utama dirancang dengan relasi one-to-many dan many-to-many. Tabel users menjadi pusat yang terhubung ke students, teachers, dan activity_logs."
- [04:30-05:00] Tampilkan file database/schema.sql
  → Narasi: "Schema.sql berisi DDL lengkap dengan foreign key constraints, indeks, dan default values untuk memastikan integritas data."
- [05:00-05:30] Tampilkan file docs/database_spesifikasi.md
  → Narasi: "Dokumen database spesifikasi menjelaskan detail setiap tabel, tipe data, constraints, dan relasi. Ini menjadi acuan dalam pengembangan."
- [05:30-06:00] Demo halaman Kelola Wali Kelas
  → Narasi: "Di modul Kesiswaan, Admin bisa menetapkan guru sebagai wali kelas. Ini penting karena wali kelas punya akses khusus ke data siswa dan absensi kelasnya."
- [06:00-06:30] Demo Search bar + Pagination
  → Narasi: "Search bar dan pagination saya implementasikan untuk memudahkan pencarian dan navigasi data. Cukup ketik nama siswa atau NIS, tabel langsung terfilter."
- [06:30-07:00] Tampilkan tabel students & relasi ke users
  → Narasi: "Setiap siswa punya user_id yang menghubungkan ke akun login. Jadi siswa bisa login dengan NIS dan melihat dashboard pribadinya."

---

## SEGMEN 3: UI/UX DESIGN & DOKUMENTASI (3 menit)
### Pembicara: Afra Muawiya — **UI/UX & Documentation Designer**

**Visual:** Perbandingan before/after theme, desain card, layout

**Skrip:**
"Saya **Afra Muawiya**, sebagai **UI/UX & Documentation Designer**. Peran saya adalah merancang antarmuka pengguna, memastikan pengalaman pengguna yang baik, dan menyusun seluruh dokumentasi project.

**Dokumen UI/UX Design** (commit 2125f6c): Saya merancang desain antarmuka dengan mengadopsi **Apple-inspired monochrome theme**:
- Background: #f5f5f7 (abu-abu terang khas Apple)
- Teks utama: #1d1d1f (hitam pekat)
- Warna sekunder: #86868b
- Tombol biru khas Apple: #0071e3
- Card putih dengan shadow halus, border radius 12px
- Tipografi sistem font untuk performa maksimal

Semua halaman sudah **responsive** untuk mobile dengan media queries khusus (commit 585483a).

**Dokumentasi yang saya buat:**
- **laporan.html** (commit b9e6272): Laporan lengkap 22 section + analisis 10 soal
- **Pembagian Tugas** (commit c0d26e1, 901de91)
- **Naskah Video** (commit bd613f3): Script presentasi YouTube

**Fitur yang saya implementasikan:**
- **Import CSV** (commit f7a5a10, 1799c59): Import massal data siswa
- **Dashboard Siswa** (commit cad66f6 — co-author): Dashboard pribadi siswa"

**Tampilkan:**
- [07:00-07:30] Tampilkan file docs/ui_ux_desain.md
  → Narasi: "Dokumen UI/UX design ini menjelaskan pemilihan warna, tipografi, tata letak, dan prinsip desain yang kami gunakan untuk menciptakan tampilan yang profesional dan konsisten."
- [07:30-08:00] Perbandingan before/after theme
  → Narasi: "Ini perbandingan sebelum dan sesudah redesign. Tampilan awal masih menggunakan Bootstrap default, setelah redesign menggunakan Apple-inspired monochrome theme yang lebih elegan dan modern."
- [08:00-08:30] Tampilkan laporan.html di browser
  → Narasi: "Saya menyusun laporan lengkap dalam format HTML yang mencakup 22 section, analisis 10 soal, dan dokumentasi lengkap project. Siap dicetak menjadi PDF."
- [08:30-09:00] Demo halaman Import CSV
  → Narasi: "Fitur Import CSV memungkinkan admin upload data siswa dalam jumlah besar sekaligus. Format CSV sudah ditentukan, cukup pilih file dan upload."
- [09:00-09:30] Demo Dashboard Siswa (login sebagai siswa1)
  → Narasi: "Siswa yang login sekarang punya dashboard pribadi. Mereka bisa lihat data diri, rekap absensi, prestasi, dan pelanggaran — semuanya dalam satu halaman."
- [09:30-10:00] Tampilkan responsive design di mobile view
  → Narasi: "Semua halaman sudah responsive. Di mobile view, card dan tabel menyesuaikan ukuran layar, navbar berubah menjadi hamburger menu, dan layout tetap rapi."

---

## SEGMEN 4: KEAMANAN & RBAC + FITUR TAMBAHAN (3 menit)
### Pembicara: Alyah Saputri Bakri — **Security & Access Control Designer**

**Visual:** Kode middleware auth.js, rbac.js, role table

**Skrip:**
"Saya **Alyah Saputri Bakri**, sebagai **Security & Access Control Designer**. Peran saya adalah mengimplementasikan sistem keamanan dan kontrol akses berbasis role.

**Dokumen Keamanan RBAC** (commit 980eac2): Dokumentasi lengkap sistem keamanan yang diterapkan.

Sistem keamanan menggunakan **Role-Based Access Control (RBAC)** dengan 7 role:
- **Admin** — akses penuh ke semua modul
- **Kepala Sekolah** — view semua data, tidak bisa CRUD
- **Guru** — mengelola jurnal mengajar sendiri
- **Guru BK** — mengelola modul BK
- **Wali Kelas** — melihat data siswa & absensi kelas
- **Siswa** — dashboard pribadi
- **Orang Tua** — tahap pengembangan

Setiap route dilindungi middleware `isAuthenticated` untuk cek session, dan `allowRoles` untuk filter role. Password di-hash dengan bcryptjs. Semua aktivitas dicatat di tabel `activity_logs` untuk audit trail.

**Fitur yang saya implementasikan:**
- **Export CSV** (commit 71f6d30, 40ca64e): Download data siswa
- **Use Case Diagram** (commit ef280a1, 9f2ada3): Diagram use case lengkap
- **Date Range Filter** (commit 8cd0bb5 — co-author): Tombol cepat 7/30/90 hari
- Membersihkan file drawio dari repository (commit e060edb)"

**Tampilkan:**
- [10:00-10:30] Tampilkan file src/middleware/auth.js & rbac.js
  → Narasi: "Ini kode middleware keamanan. Setiap request dicek session-nya oleh isAuthenticated, lalu dicocokkan rolenya oleh allowRoles. Hanya user dengan role yang diizinkan yang bisa mengakses route tertentu."
- [10:30-11:00] Tampilkan file docs/keamanan_rbac.md
  → Narasi: "Dokumen keamanan RBAC ini menjelaskan secara detail 7 role yang kami definisikan, permission matrix, dan implementasi middleware di setiap modul."
- [11:00-11:30] Demo Export CSV
  → Narasi: "Export CSV memungkinkan Admin mendownload data siswa dalam format spreadsheet. Sangat berguna untuk backup data atau pengolahan data lebih lanjut."
- [11:30-12:00] Demo Date Range Filter di Absensi
  → Narasi: "Date Range Filter dengan tombol cepat 7 hari, 30 hari, dan 3 bulan. User tinggal klik, tanggal otomatis terisi dan filter langsung dijalankan tanpa perlu repot memilih tanggal manual."
- [12:00-12:30] Tampilkan use case diagram (docs/usecase.jpeg)
  → Narasi: "Use case diagram ini saya buat untuk menggambarkan interaksi seluruh aktor dengan sistem. Setiap role punya use case spesifik sesuai tanggung jawabnya."
- [12:30-13:00] Demo login sebagai 3 role berbeda
  → Narasi: "Saya akan demo login dengan 3 akun berbeda. Admin bisa melihat semua menu dan CRUD. Guru hanya melihat jurnal sendiri. Siswa hanya melihat dashboard pribadi. Ini membuktikan RBAC berjalan dengan baik."

---

## SEGMEN 5: MODUL UTAMA — Dashboard, Absensi, Jurnal (3 menit)
### Pembicara: Ashabul Kahfi — **System Analyst / Project Lead**

**Visual:** Demo langsung fitur di browser

**Skrip:**
"Saya akan mendemonstrasikan modul-modul utama yang saya kerjakan sebagai **System Analyst** dan **Project Lead**.

**Initial Project** (commit f2e09c9): Project dibangun dengan struktur MVC modular. Setiap modul punya folder sendiri: routes, views, dan middleware. Package manager npm dengan Express.js sebagai framework utama.

**Dashboard** (commit 0171468): Menampilkan 6 kartu statistik: jumlah siswa aktif, guru, jurnal, kasus BK, kelas, dan user. Dilengkapi 5 grafik Chart.js: jurnal per bulan, status siswa, siswa per kelas, gender, dan kasus per jenis. Ada **live clock** real-time dan daftar aktivitas terbaru.

**Theme Apple** (commit a09c090): Saya juga merancang ulang tema menjadi Apple-inspired monochrome yang elegan.

**Modul Absensi** (commit 0fc5aeb): Mencatat kehadiran siswa per kelas per tanggal, dengan filter kelas dan rentang tanggal. Status: Hadir (hijau), Sakit (oranye), Izin (biru), Alpa (merah). Dilengkapi rekap persentase kehadiran per siswa.

**Modul Jurnal** — mencatat aktivitas mengajar harian guru: tanggal, kelas, mapel, materi, metode, dan catatan.

**Data Seed** (commit 63c921f): Saya mengenerate 50+ data jurnal realistis untuk demo.

**Deployment:**
Aplikasi di-deploy di Oracle Cloud, Nginx reverse proxy port 80/443 → 3000, HTTPS via Certbot, PM2 untuk auto-restart."

**Tampilkan:**
- [13:00-13:30] Tampilkan source code struktur folder (src/modules/)
  → Narasi: "Struktur MVC modular: setiap modul punya folder sendiri dengan routes, controllers, dan views. Ini memudahkan pengembangan dan maintenance karena setiap modul terisolasi."
- [13:30-14:00] Demo dashboard dengan grafik + live clock
  → Narasi: "Dashboard utama menampilkan 6 kartu statistik untuk gambaran cepat kondisi sekolah, 5 grafik Chart.js interaktif, dan live clock yang menunjukkan waktu real-time."
- [14:00-14:30] Demo modul Absensi (input, filter, rekap)
  → Narasi: "Absensi mencatat kehadiran siswa per kelas. Pilih kelas dan tanggal, centang status kehadiran — Hadir hijau, Sakit oranye, Izin biru, Alpa merah. Ada juga rekap persentase kehadiran per siswa."
- [14:30-15:00] Demo modul Jurnal dengan 50+ data
  → Narasi: "Jurnal Mengajar mencatat aktivitas harian guru: tanggal, kelas, mata pelajaran, materi, metode, dan catatan. Kami mengenerate 50+ data realistis untuk demo."
- [15:00-15:30] Tampilkan terminal: pm2 list, nginx -t
  → Narasi: "Aplikasi berjalan di Oracle Cloud dengan PM2 sebagai process manager — auto-restart jika crash. Nginx sebagai reverse proxy dari port 80/443 ke port 3000 dengan HTTPS via Certbot."
- [15:30-16:00] Tampilkan file docs/analisis_sistem.md
  → Narasi: "Dokumen analisis sistem ini mencakup identifikasi masalah, spesifikasi kebutuhan fungsional dan non-fungsional, serta diagram-diagram UML yang digunakan."

---

## SEGMEN 6: MODUL BK & ARSITEKTUR (2.5 menit)
### Pembicara: Marhepi Rahmadani — **System Architect**

**Visual:** Demo modul BK di browser, BK recap

**Skrip:**
"Saya **Marhepi Rahmadani**, sebagai **System Architect**. Peran saya adalah merancang arsitektur sistem secara keseluruhan, memastikan modularitas, dan mengimplementasikan modul Bimbingan Konseling.

**Dokumen Arsitektur Detail** (commit f521b4c): Dokumentasi yang menjelaskan struktur folder, alur data request-response, komponen sistem, dan strategi deployment.

**Modul BK** (commit b12a7b0, 1e2a6e7): Memiliki 4 sub-modul dalam satu halaman:
1. **Kasus** — mencatat kasus siswa dengan status Open/Proses/Selesai
2. **Catatan Konseling** — sesi konseling dengan topik dan tindak lanjut
3. **Pelanggaran** — catatan pelanggaran dengan jenis dan sanksi
4. **Prestasi** — prestasi siswa dengan tingkat

Fitur **Rekap BK** menampilkan statistik kasus per siswa, per jenis, dengan filter kelas dan tanggal.

**Fitur lain:**
- **Reset Password** (commit 5a0850e — co-author): Admin reset password user
- **Search Suggestion** (commit a69177e, bb2d8fc, c13cd47, 9fcd3ab — co-author): Autocomplete AJAX real-time"

**Tampilkan:**
- [16:00-16:30] Tampilkan file docs/arsitektur_detail.md
  → Narasi: "Dokumen arsitektur detail menjelaskan struktur folder, alur data request-response dari browser ke server ke database, komponen sistem, dan strategi deployment. Ini blueprint dari keseluruhan sistem."
- [16:30-17:00] Tampilkan halaman BK dengan 4 tabel + struktur folder
  → Narasi: "Modul BK memiliki 4 sub-modul dalam satu halaman: Kasus, Catatan Konseling, Pelanggaran, dan Prestasi. Masing-masing punya form input dan tabel sendiri."
- [17:00-17:30] Demo tambah kasus, update status, Rekap BK
  → Narasi: "Saya tambah kasus baru untuk siswa, lalu update statusnya dari Open menjadi Proses. Rekap BK menampilkan statistik kasus per siswa dan per jenis dengan filter kelas dan tanggal."
- [17:30-18:00] Demo Reset Password
  → Narasi: "Fitur Reset Password memungkinkan Admin mereset password user ke default jika user lupa password. Ini lebih efisien daripada mengubah password satu per satu di database."
- [18:00-18:30] Demo Search Suggestion dropdown
  → Narasi: "Search Suggestion adalah fitur paling canggih. Saat mengetik di search bar, muncul dropdown berisi saran real-time dari database via AJAX dengan debounce 300ms. Klik saran untuk langsung menuju data yang dicari."

---

## SEGMEN 7: FITUR MODERN — Profil, Search Bar, Pagination (2 menit)
### Pembicara: Ashabul Kahfi & Muh. Eka Andri Setiawan & Marhepi Rahmadani

**Visual:** Demo fitur di browser

**Skrip:**

**Ashabul:** "**Profil & Ganti Password** (commit 11213b2): Setiap user bisa mengubah profil sendiri dan mengganti password tanpa admin. Saya kerjakan bersama Marhepi dan Eka."

**Eka:** "**Search Bar** (commit 4527d10): Pencarian real-time di semua halaman — Users, Kesiswaan, Jurnal, BK, Absensi. Cukup ketik kata kunci, tabel terfilter otomatis.

**Pagination** (commit 72731bd): 10 data per halaman dengan navigasi halaman. Mencegah tabel terlalu panjang."

**Marhepi:** "**Search Suggestion AJAX** (commit 0133f81, a69177e, bb2d8fc): Fitur paling canggih — saat mengetik muncul dropdown suggestion real-time via API JSON dengan debounce 300ms. Dilengkapi hover effect dan highlight pencarian."

**Tampilkan:**
- [18:30-19:00] Ashabul: Demo Profil & Ganti Password
  → Narasi: "Setiap user bisa mengubah profil dan mengganti password sendiri tanpa admin. Cukup klik ikon profil di pojok kanan atas, isi form, dan simpan."
- [19:00-19:30] Eka: Demo Search Bar di semua halaman
  → Narasi: "Search bar tersedia di semua halaman — Users, Kesiswaan, Jurnal, BK, Absensi. Ketik kata kunci, tabel akan terfilter secara real-time tanpa reload halaman."
- [19:30-20:00] Eka: Demo Pagination
  → Narasi: "Pagination membatasi 10 data per halaman. Di bagian bawah tabel ada navigasi halaman. Ini mencegah tabel terlalu panjang dan mempercepat loading."
- [20:00-20:30] Marhepi: Demo Search Suggestion AJAX
  → Narasi: "Search Suggestion adalah fitur unggulan. Saat mengetik 'Siswa', muncul dropdown berisi nama-nama siswa yang cocok. Pilih salah satu, langsung menuju data yang dicari. Semua real-time tanpa reload."

---

## SEGMEN 8: DASHBOARD SISWA & DATE RANGE FILTER (1.5 menit)
### Pembicara: Afra Muawiya & Alyah Saputri Bakri

---

## SEGMEN 9: DATA SEED & DEMO LIVE (2 menit)
### Pembicara: Ashabul Kahfi
### Pembicara: Ashabul Kahfi

**Visual:** Demo dashboard siswa, filter absensi

**Skrip:**

**Afra:** "**Dashboard Siswa** (commit cad66f6): Siswa yang login sekarang punya dashboard pribadi. Mereka bisa melihat data diri, rekap absensi (hadir/sakit/izin/alpa), prestasi, pelanggaran, dan riwayat absensi terbaru. Saya kerjakan bersama Ashabul, Eka, dan Alyah."

**Alyah:** "**Date Range Filter** (commit 8cd0bb5): Filter absensi sekarang dilengkapi tombol cepat 7 hari / 30 hari / 3 bulan. User tinggal klik, tanggal otomatis terisi dan filter langsung dijalankan. Saya kerjakan bersama Ashabul, Eka, dan Afra."

**Tampilkan:**
- [22:00-22:30] Afra: Login sebagai siswa1, demo dashboard siswa
  → Narasi: "Login sebagai siswa1. Dashboard siswa menampilkan data diri, rekap absensi dalam bentuk progress bar, daftar prestasi dan pelanggaran, serta riwayat absensi terbaru."
- [22:30-23:00] Afra: Tampilkan halaman profil siswa
  → Narasi: "Di halaman profil, siswa bisa melihat dan mengedit data diri, serta mengganti password. Semua informasi pribadi terpusat di satu halaman."
- [23:00-23:30] Alyah: Demo filter absensi dengan tombol cepat
  → Narasi: "Filter absensi dengan tombol cepat. Klik '7 Hari', filter otomatis menampilkan data seminggu terakhir. Klik '30 Hari' untuk sebulan. Tombol '3 Bulan' untuk tiga bulan. Praktis dan cepat."
- [23:30-24:00] Alyah: Tampilkan perbandingan sebelum/sesudah
  → Narasi: "Sebelum ada quick filter, user harus memilih tanggal mulai dan selesai manual. Setelah ada quick filter, cukup satu klik. Ini meningkatkan user experience secara signifikan."

---

## SEGMEN 10: PENUTUP (1 menit)

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
  → Narasi: "Ini terminal saat menjalankan seed.js. Script ini mengenerate 50+ data jurnal realistis untuk 5 guru selama 10 hari kerja dengan materi, metode, dan catatan yang bervariasi."
- [24:30-25:00] Login admin, demo semua fitur
  → Narasi: "Login sebagai admin untuk melihat semua fitur. Dashboard dengan grafik, jurnal dengan 50+ data, absensi dengan quick filter, BK dengan 4 sub-modul, dan search suggestion real-time."
- [25:00-25:30] Login siswa1, demo dashboard
  → Narasi: "Login sebagai siswa1. Dashboard pribadi siswa menampilkan data diri, rekap absensi, prestasi, dan pelanggaran. Semua data spesifik untuk siswa yang login."
- [25:30-26:00] Tampilkan https://web-sekolah.duckdns.org di browser
  → Narasi: "Aplikasi bisa diakses langsung di https://web-sekolah.duckdns.org. Silakan coba login dengan akun demo yang sudah disediakan."

---

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
  → Narasi: "Source code lengkap tersedia di GitHub. Silakan clone, fork, atau kontribusi. Semua commit tercatat dengan author dan co-author sesuai kontribusi masing-masing anggota."
- [26:30-27:00] Tampilkan nama & NIM semua anggota
  → Narasi: "Sekali lagi, perkenalkan tim kami: Ashabul Kahfi 105841108523, Marhepi Rahmadani 105841109523, Muh. Eka Andri 105841110723, Afra Muawiya 105841108423, dan Alyah Saputri 105841107723."
- [27:00] Fade out
  → Narasi: "Terima kasih dan wassalamualaikum warahmatullahi wabarakatuh."

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
