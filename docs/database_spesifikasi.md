# Spesifikasi Database - Database Designer
**Oleh: Muh. Eka Andri Setiawan (105841110723)**

## Database: db_sekolah_ssd (MySQL)

## 16 Tabel dengan Spesifikasi Kolom

### 1. roles
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT AUTO_INCREMENT PK | |
| name | VARCHAR(50) UNIQUE | admin, guru, dsb |
| description | TEXT | |
| created_at | TIMESTAMP | |

### 2. users
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | INT AUTO_INCREMENT PK | |
| username | VARCHAR(100) UNIQUE | |
| email | VARCHAR(100) UNIQUE | |
| password | VARCHAR(255) | bcrypt hash |
| full_name | VARCHAR(150) | |
| role_id | INT FK → roles.id | |
| is_active | TINYINT(1) | 1/0 |
| last_login | TIMESTAMP NULL | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | ON UPDATE |

### 3. academic_years
| Kolom | Tipe |
|-------|------|
| id | INT AUTO_INCREMENT PK |
| year_name | VARCHAR(20) UNIQUE |
| is_active | TINYINT(1) |

### 4. semesters
| Kolom | Tipe |
|-------|------|
| id | INT AUTO_INCREMENT PK |
| academic_year_id | INT FK |
| semester_name | VARCHAR(20) |
| is_active | TINYINT(1) |

### 5. teachers
| Kolom | Tipe |
|-------|------|
| id | INT AUTO_INCREMENT PK |
| user_id | INT UNIQUE FK |
| nip | VARCHAR(30) UNIQUE |
| full_name | VARCHAR(150) |
| phone | VARCHAR(20) |
| address | TEXT |

### 6. classes
| Kolom | Tipe |
|-------|------|
| id | INT AUTO_INCREMENT PK |
| class_name | VARCHAR(20) |
| grade_level | VARCHAR(10) |
| homeroom_teacher_id | INT FK → teachers.id |

### 7. subjects
| Kolom | Tipe |
|-------|------|
| id | INT AUTO_INCREMENT PK |
| subject_name | VARCHAR(100) |
| subject_code | VARCHAR(20) UNIQUE |

### 8. students
| Kolom | Tipe |
|-------|------|
| id | INT AUTO_INCREMENT PK |
| nis | VARCHAR(20) UNIQUE |
| full_name | VARCHAR(150) |
| gender | ENUM('L','P') |
| birth_place | VARCHAR(100) |
| birth_date | DATE |
| address | TEXT |
| phone | VARCHAR(20) |
| class_id | INT FK → classes.id |
| status | ENUM('aktif','pindah','lulus','keluar') |

### 9. schedules
| Kolom | Tipe |
|-------|------|
| id | INT AUTO_INCREMENT PK |
| class_id | INT FK |
| subject_id | INT FK |
| teacher_id | INT FK |
| day_of_week | ENUM('Senin'-'Sabtu') |
| start_time | TIME |
| end_time | TIME |
| semester_id | INT FK |

### 10. teaching_journals
| Kolom | Tipe |
|-------|------|
| id | INT AUTO_INCREMENT PK |
| teacher_id | INT FK |
| class_id | INT FK |
| subject_id | INT FK |
| teaching_date | DATE |
| material | TEXT |
| method | VARCHAR(100) |
| notes | TEXT |
| semester_id | INT FK |

### 11-14. Tabel BK
bk_cases, bk_counseling_notes, student_violations, student_achievements — semua memiliki student_id FK dan teacher_id FK.

### 15. attendances
| Kolom | Tipe |
|-------|------|
| id | INT AUTO_INCREMENT PK |
| student_id | INT FK |
| class_id | INT FK |
| attendance_date | DATE |
| status | ENUM('hadir','sakit','izin','alpa') |
| notes | TEXT |
| created_by | INT FK → users.id |

### 16. activity_logs
| Kolom | Tipe |
|-------|------|
| id | INT AUTO_INCREMENT PK |
| user_id | INT FK |
| action | VARCHAR(100) |
| description | TEXT |
| ip_address | VARCHAR(50) |
| created_at | TIMESTAMP |

## Indexes
- idx_students_class, idx_students_status
- idx_journals_date, idx_journals_teacher
- idx_bk_cases_student, idx_bk_cases_date
- idx_attendance_date, idx_attendance_class, idx_attendance_student
- idx_logs_user, idx_logs_created

## Konsistensi Data
- Foreign key constraints di semua relasi
- ENUM untuk nilai tetap (status, gender, day_of_week)
- Normalisasi hingga 3NF (tidak ada duplikasi data)
- Transaction untuk operasi multi-tabel
