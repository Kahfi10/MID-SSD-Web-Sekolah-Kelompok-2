# Keamanan & RBAC - Security & Access Control Designer
**Oleh: Alyah Saputri Bakri (105841107723)**

## 1. Role Pengguna (7 Role)
| Role | Hak Akses |
|------|-----------|
| Admin | Seluruh modul, semua operasi CRUD |
| Kepala Sekolah | Dashboard, Kesiswaan (view), Jurnal (rekap), BK (rekap), Absensi (rekap) |
| Guru | Dashboard, Jurnal (input), Absensi (input) |
| Guru BK | Dashboard, BK (full CRUD) |
| Wali Kelas | Dashboard, Kesiswaan (view), Jurnal (rekap), Absensi (input) |
| Siswa | Dashboard (terbatas) |
| Orang Tua | Belum diimplementasikan |

## 2. Implementasi RBAC
Middleware `src/middleware/rbac.js`:
```javascript
function allowRoles(...roles) {
    return (req, res, next) => {
        if (!req.session.user) return res.redirect('/auth/login');
        if (!roles.includes(req.session.user.role_name)) {
            req.flash('error', 'Akses ditolak');
            return res.redirect('/dashboard');
        }
        next();
    };
}
```

Penggunaan di route:
```javascript
router.get('/', isAuthenticated, allowRoles('admin', 'guru_bk'), handler);
```

## 3. Autentikasi
- Login: username + password → verify bcrypt → create session
- Logout: destroy session
- Session: express-session dengan cookie maxAge 24 jam
- Secret: SESSION_SECRET dari .env

## 4. Keamanan Password
- Bcryptjs dengan salt round 10
- Password default: "password123" (dapat di-reset oleh admin)
- Hash disimpan di database, bukan plain text

## 5. Audit Log
Semua aktivitas dicatat ke tabel `activity_logs`:
- create_user, update_user, delete_user
- create_student, update_student, delete_student
- create_journal, delete_journal
- create_case, create_violation, create_achievement
- create_attendance, delete_attendance
- reset_password

## 6. Mitigasi Risiko
| Risiko | Mitigasi |
|--------|----------|
| SQL Injection | Prepared statements (parameterized queries) |
| Session hijacking | Session secret kuat, cookie terbatas |
| Data sensitif BK bocor | RBAC ketat, hanya guru_bk & admin |
| Password lemah | Bcrypt hash, admin bisa reset |
| Brute force login | (Rencana) rate limiting |
