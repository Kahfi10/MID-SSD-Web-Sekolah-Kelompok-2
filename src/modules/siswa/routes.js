const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const { isAuthenticated } = require('../../middleware/auth');

router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user.id;

        // Cari data siswa berdasarkan user_id
        const [studentRows] = await pool.query(
            `SELECT s.*, c.class_name, c.grade_level, u.username, u.email
             FROM students s
             LEFT JOIN classes c ON s.class_id = c.id
             JOIN users u ON u.id = s.user_id
             WHERE s.user_id = ?`,
            [userId]
        );

        if (studentRows.length === 0) {
            req.flash('error', 'Data siswa tidak ditemukan');
            return res.redirect('/auth/login');
        }

        const student = studentRows[0];

        // Rekap absensi
        const [attendanceRecap] = await pool.query(
            `SELECT status, COUNT(*) as total
             FROM attendances WHERE student_id = ?
             GROUP BY status`,
            [student.id]
        );

        // Prestasi
        const [achievements] = await pool.query(
            `SELECT * FROM student_achievements WHERE student_id = ? ORDER BY achievement_date DESC LIMIT 5`,
            [student.id]
        );

        // Pelanggaran
        const [violations] = await pool.query(
            `SELECT * FROM student_violations WHERE student_id = ? ORDER BY violation_date DESC LIMIT 5`,
            [student.id]
        );

        // Kasus BK
        const [cases] = await pool.query(
            `SELECT * FROM bk_cases WHERE student_id = ? ORDER BY created_at DESC LIMIT 5`,
            [student.id]
        );

        // Absensi terbaru
        const [recentAttendances] = await pool.query(
            `SELECT a.*, c.class_name
             FROM attendances a
             JOIN classes c ON a.class_id = c.id
             WHERE a.student_id = ?
             ORDER BY a.attendance_date DESC LIMIT 10`,
            [student.id]
        );

        res.render('siswa/index', {
            title: 'Dashboard Siswa',
            student,
            attendanceRecap,
            achievements,
            violations,
            cases,
            recentAttendances
        });

    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal memuat data');
        res.redirect('/dashboard');
    }
});

module.exports = router;
