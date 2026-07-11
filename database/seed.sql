-- =============================================
-- Data Dummy - Web Sekolah Terintegrasi
-- Kelompok 2 | TI 4A
-- =============================================

USE db_sekolah_ssd;

-- Roles
INSERT INTO roles (name, description) VALUES
('admin', 'Administrator sistem'),
('kepala_sekolah', 'Kepala Sekolah'),
('guru', 'Guru pengajar'),
('guru_bk', 'Guru Bimbingan Konseling'),
('wali_kelas', 'Wali Kelas'),
('siswa', 'Siswa'),
('orang_tua', 'Orang Tua/Wali');

-- Academic Years
INSERT INTO academic_years (year_name, is_active) VALUES
('2025/2026', 1),
('2026/2027', 0);

-- Semesters
INSERT INTO semesters (academic_year_id, semester_name, is_active) VALUES
(1, 'Ganjil', 1),
(1, 'Genap', 0);

-- Users (password: password123)
INSERT INTO users (username, email, password, full_name, role_id, is_active) VALUES
('admin', 'admin@sekolah.test', '$2a$10$YourHashHere', 'Admin Sekolah', 1, 1),
('kepsek', 'kepsek@sekolah.test', '$2a$10$YourHashHere', 'Dr. H. Ahmad Syah, M.Pd', 2, 1),
('guru1', 'guru1@sekolah.test', '$2a$10$YourHashHere', 'Siti Rahmawati, S.Pd', 3, 1),
('guru2', 'guru2@sekolah.test', '$2a$10$YourHashHere', 'Bambang Suprapto, S.Pd', 3, 1),
('guru3', 'guru3@sekolah.test', '$2a$10$YourHashHere', 'Dewi Sartika, S.Pd', 3, 1),
('guru_bk', 'bk@sekolah.test', '$2a$10$YourHashHere', 'Dian Permata Sari, S.Psi', 4, 1),
('walas1', 'walas1@sekolah.test', '$2a$10$YourHashHere', 'Rina Marlina, S.Pd', 5, 1),
('siswa1', 'siswa1@sekolah.test', '$2a$10$YourHashHere', 'Ahmad Fauzi', 6, 1),
('siswa2', 'siswa2@sekolah.test', '$2a$10$YourHashHere', 'Nurul Hidayah', 6, 1),
('siswa3', 'siswa3@sekolah.test', '$2a$10$YourHashHere', 'Rizky Pratama', 6, 1),
('ortu1', 'ortu1@sekolah.test', '$2a$10$YourHashHere', 'H. Abdullah', 7, 1);

-- Teachers
INSERT INTO teachers (user_id, nip, full_name, phone, address) VALUES
(3, '198703142010011001', 'Siti Rahmawati, S.Pd', '081234567891', 'Jl. Merdeka No.10'),
(4, '198505122009011002', 'Bambang Suprapto, S.Pd', '081234567892', 'Jl. Sudirman No.20'),
(5, '199001152011012003', 'Dewi Sartika, S.Pd', '081234567893', 'Jl. Ahmad Yani No.30'),
(6, '198812202010021004', 'Dian Permata Sari, S.Psi', '081234567894', 'Jl. Diponegoro No.40'),
(7, '198606252009031005', 'Rina Marlina, S.Pd', '081234567895', 'Jl. Pahlawan No.50');

-- Classes
INSERT INTO classes (class_name, grade_level, homeroom_teacher_id) VALUES
('X-A', '10', 5),
('X-B', '10', NULL),
('XI-A', '11', 1),
('XI-B', '11', NULL),
('XII-A', '12', 2),
('XII-B', '12', NULL);

-- Subjects
INSERT INTO subjects (subject_name, subject_code) VALUES
('Matematika', 'MTK-01'),
('Bahasa Indonesia', 'BIN-01'),
('Bahasa Inggris', 'BIG-01'),
('Fisika', 'FIS-01'),
('Kimia', 'KIM-01'),
('Biologi', 'BIO-01'),
('Sejarah', 'SJR-01'),
('Pendidikan Agama Islam', 'PAI-01'),
('PKN', 'PKN-01'),
('Olahraga', 'OLR-01');

-- Students
INSERT INTO students (nis, full_name, gender, birth_place, birth_date, address, phone, class_id, status) VALUES
('2025001', 'Ahmad Fauzi', 'L', 'Makassar', '2008-05-12', 'Jl. Veteran No.5', '081234567101', 1, 'aktif'),
('2025002', 'Nurul Hidayah', 'P', 'Makassar', '2008-08-20', 'Jl. Veteran No.10', '081234567102', 1, 'aktif'),
('2025003', 'Rizky Pratama', 'L', 'Gowa', '2008-03-15', 'Jl. Poros No.8', '081234567103', 2, 'aktif'),
('2025004', 'Aisyah Putri', 'P', 'Makassar', '2007-11-30', 'Jl. BTP No.12', '081234567104', 3, 'aktif'),
('2025005', 'Muhammad Arif', 'L', 'Maros', '2007-07-22', 'Jl. Maros No.3', '081234567105', 3, 'aktif'),
('2025006', 'Siti Nurhaliza', 'P', 'Makassar', '2007-01-10', 'Jl. Antang No.7', '081234567106', 4, 'aktif'),
('2025007', 'Fajar Ramadan', 'L', 'Makassar', '2006-09-05', 'Jl. Tamalanrea No.15', '081234567107', 5, 'aktif'),
('2025008', 'Indah Permata', 'P', 'Gowa', '2006-04-18', 'Jl. Sungguminasa No.2', '081234567108', 5, 'aktif');

-- Schedules
INSERT INTO schedules (class_id, subject_id, teacher_id, day_of_week, start_time, end_time, semester_id) VALUES
(1, 1, 1, 'Senin', '07:30:00', '09:00:00', 1),
(1, 2, 2, 'Senin', '09:15:00', '10:45:00', 1),
(1, 3, 3, 'Selasa', '07:30:00', '09:00:00', 1),
(1, 4, 1, 'Rabu', '07:30:00', '09:00:00', 1),
(3, 1, 1, 'Senin', '10:45:00', '12:15:00', 1),
(3, 5, 4, 'Kamis', '07:30:00', '09:00:00', 1),
(5, 1, 1, 'Jumat', '07:30:00', '09:00:00', 1);

-- Teaching Journals
INSERT INTO teaching_journals (teacher_id, class_id, subject_id, teaching_date, material, method, notes, semester_id) VALUES
(1, 1, 1, '2026-07-06', 'Persamaan Linear Satu Variabel', 'Ceramah dan diskusi', 'Siswa aktif bertanya', 1),
(1, 3, 1, '2026-07-07', 'Fungsi Kuadrat', 'Praktik soal', 'Materi selesai tepat waktu', 1),
(2, 1, 2, '2026-07-06', 'Teks Deskripsi', 'Membaca dan menganalisis', 'Siswa mampu mengidentifikasi', 1),
(3, 1, 3, '2026-07-07', 'Greetings and Introductions', 'Role play', 'Siswa antusias', 1),
(1, 5, 1, '2026-07-10', 'Limit Fungsi', 'Ceramah dan latihan', 'Materi dilanjutkan pertemuan berikutnya', 1);

-- BK Cases
INSERT INTO bk_cases (student_id, teacher_id, case_date, case_type, description, status) VALUES
(3, 6, '2026-07-08', 'Keterlambatan', 'Siswa terlambat 3 kali dalam seminggu', 'proses'),
(5, 6, '2026-07-09', 'Berkelahi', 'Terlibat perkelahian dengan siswa kelas lain', 'proses'),
(8, 6, '2026-07-10', 'Bolos', 'Tidak masuk tanpa keterangan 2 hari', 'selesai');

-- BK Counseling Notes
INSERT INTO bk_counseling_notes (student_id, teacher_id, counseling_date, topic, note, follow_up) VALUES
(3, 6, '2026-07-09', 'Motivasi Belajar', 'Siswa mengaku malas bangun pagi', 'Orang tua akan diundang ke sekolah'),
(5, 6, '2026-07-10', 'Penyelesaian Konflik', 'Siswa menyesal dan berjanji tidak mengulangi', 'Pemantauan selama 2 minggu'),
(8, 6, '2026-07-08', 'Kedisiplinan', 'Siswa berjanji akan lebih disiplin', 'Selesai');

-- Student Violations
INSERT INTO student_violations (student_id, teacher_id, violation_date, violation_type, description, sanction) VALUES
(3, 6, '2026-07-01', 'Terlambat', 'Terlambat 15 menit', 'Peringatan lisan'),
(3, 6, '2026-07-06', 'Terlambat', 'Terlambat 20 menit', 'Peringatan tertulis'),
(5, 6, '2026-07-09', 'Perkelahian', 'Berkelahi dengan teman sekelas', 'Skorsing 3 hari'),
(8, 6, '2026-07-05', 'Bolos', 'Tidak masuk tanpa keterangan', 'Panggilan orang tua');

-- Student Achievements
INSERT INTO student_achievements (student_id, achievement_name, achievement_date, level, description) VALUES
(1, 'Juara 1 Olimpiade Matematika', '2026-06-15', 'Kota', 'Meraih juara 1 tingkat kota'),
(1, 'Paskibraka', '2026-08-17', 'Kota', 'Anggota Paskibraka kota Makassar'),
(4, 'Juara 2 Lomba Pidato', '2026-05-20', 'Provinsi', 'Lomba pidato bahasa Inggris'),
(7, 'Juara 3 Lomba Cepat Tepat', '2026-07-01', 'Sekolah', 'Lomba cerdas cermat antar kelas');

-- Activity Logs
INSERT INTO activity_logs (user_id, action, description, ip_address) VALUES
(1, 'login', 'Admin login ke sistem', '::1'),
(3, 'login', 'Guru login ke sistem', '::1'),
(3, 'create_journal', 'Membuat jurnal mengajar baru', '::1'),
(6, 'login', 'Guru BK login ke sistem', '::1'),
(6, 'create_case', 'Mencatat kasus BK baru', '::1'),
(1, 'create_student', 'Menambah data siswa baru', '::1');
