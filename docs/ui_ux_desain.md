# Desain UI/UX - UI/UX & Documentation Designer
**Oleh: Afra Muawiya (105841108423)**

## 1. Tema Visual: Apple Monochrome
- Warna: #1d1d1f (teks), #86868b (secondary), #f5f5f7 (background)
- Font: -apple-system, BlinkMacSystemFont, San Francisco
- Kartu putih dengan shadow halus (border-0 shadow-sm rounded-4)
- Navbar blur effect (backdrop-filter: blur)

## 2. Halaman Utama

### Dashboard
- 6 kartu statistik animasi (Total User, Siswa, Guru, Jurnal, Kasus BK, Absensi)
- 5 grafik Chart.js (batang, garis, donat)
- Live clock digital
- 10 aktivitas terbaru (activity log)

### Login
- Form sederhana di tengah dengan logo sekolah
- Demo account reference di bawah form

### Manajemen Pengguna
- Tabel dengan role badge, status (Aktif/Nonaktif)
- Tombol aksi: Edit, Reset Password, Hapus
- Modal untuk tambah user

### Kesiswaan
- Tabel siswa dengan filter kelas & status
- Tombol Import CSV, Export CSV
- Modal tambah/edit siswa
- Halaman khusus Kelola Wali Kelas

### Jurnal Mengajar
- Tabel riwayat jurnal
- Modal input jurnal (pilih kelas, mapel, tanggal, materi)
- Halaman rekap dengan filter

### BK
- 4 tab: Kasus, Konseling, Pelanggaran, Prestasi
- Masing-masing dengan form input dan tabel
- Halaman rekap dengan filter siswa/kelas/tanggal

### Absensi
- Summary cards per kelas (H:S:I:A)
- Filter kelas & rentang tanggal
- Tabel detail absensi
- Halaman input: pilih kelas + tanggal → daftar siswa dengan dropdown status
- Rekap absensi dengan progress bar persentase

## 3. Diagram Pendukung
- Use Case Diagram: 6 aktor + 15 use case
- ERD: 16 tabel dengan relasi
- Arsitektur: 3 layer + 6 vCPU
