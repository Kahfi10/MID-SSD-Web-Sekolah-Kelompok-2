const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const { isAuthenticated } = require('../../middleware/auth');
const { allowRoles } = require('../../middleware/rbac');

// Dashboard BK
router.get('/', isAuthenticated, allowRoles('guru_bk', 'admin', 'kepala_sekolah'), async (req, res) => {
    try {
        const [bkTeacher] = await pool.query('SELECT id FROM teachers WHERE user_id = ?', [req.session.user.id]);

        // Get cases
        const [cases] = await pool.query(
            `SELECT bc.*, s.full_name as student_name, s.nis, c.class_name
             FROM bk_cases bc
             JOIN students s ON bc.student_id = s.id
             LEFT JOIN classes c ON s.class_id = c.id
             ORDER BY bc.created_at DESC`
        );

        // Get counseling notes
        const [counseling] = await pool.query(
            `SELECT bcn.*, s.full_name as student_name, s.nis
             FROM bk_counseling_notes bcn
             JOIN students s ON bcn.student_id = s.id
             ORDER BY bcn.created_at DESC`
        );

        // Get violations
        const [violations] = await pool.query(
            `SELECT sv.*, s.full_name as student_name, s.nis
             FROM student_violations sv
             JOIN students s ON sv.student_id = s.id
             ORDER BY sv.created_at DESC`
        );

        // Get achievements
        const [achievements] = await pool.query(
            `SELECT sa.*, s.full_name as student_name, s.nis
             FROM student_achievements sa
             JOIN students s ON sa.student_id = s.id
             ORDER BY sa.created_at DESC`
        );

        const [students] = await pool.query('SELECT * FROM students WHERE status = ?', ['aktif']);

        res.render('bk/index', {
            title: 'Bimbingan Konseling',
            cases,
            counseling,
            violations,
            achievements,
            students,
            bkTeacher: bkTeacher.length > 0 ? bkTeacher[0] : null
        });

    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal memuat data');
        res.redirect('/dashboard');
    }
});

// Store case
router.post('/cases/store', isAuthenticated, allowRoles('guru_bk', 'admin'), async (req, res) => {
    try {
        const { student_id, case_date, case_type, description } = req.body;
        const [teacher] = await pool.query('SELECT id FROM teachers WHERE user_id = ?', [req.session.user.id]);
        const teacherId = teacher.length > 0 ? teacher[0].id : req.body.teacher_id;

        await pool.query(
            'INSERT INTO bk_cases (student_id, teacher_id, case_date, case_type, description) VALUES (?, ?, ?, ?, ?)',
            [student_id, teacherId, case_date, case_type, description]
        );

        await pool.query(
            'INSERT INTO activity_logs (user_id, action, description, ip_address) VALUES (?, ?, ?, ?)',
            [req.session.user.id, 'create_case', `Mencatat kasus BK untuk siswa ID ${student_id}`, req.ip]
        );

        req.flash('success', 'Kasus BK berhasil dicatat');
        res.redirect('/bk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal mencatat kasus');
        res.redirect('/bk');
    }
});

// Store counseling note
router.post('/counseling/store', isAuthenticated, allowRoles('guru_bk', 'admin'), async (req, res) => {
    try {
        const { student_id, counseling_date, topic, note, follow_up } = req.body;
        const [teacher] = await pool.query('SELECT id FROM teachers WHERE user_id = ?', [req.session.user.id]);
        const teacherId = teacher.length > 0 ? teacher[0].id : req.body.teacher_id;

        await pool.query(
            'INSERT INTO bk_counseling_notes (student_id, teacher_id, counseling_date, topic, note, follow_up) VALUES (?, ?, ?, ?, ?, ?)',
            [student_id, teacherId, counseling_date, topic, note, follow_up]
        );

        req.flash('success', 'Catatan konseling berhasil disimpan');
        res.redirect('/bk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal menyimpan catatan');
        res.redirect('/bk');
    }
});

// Store violation
router.post('/violations/store', isAuthenticated, allowRoles('guru_bk', 'admin'), async (req, res) => {
    try {
        const { student_id, violation_date, violation_type, description, sanction } = req.body;
        const [teacher] = await pool.query('SELECT id FROM teachers WHERE user_id = ?', [req.session.user.id]);
        const teacherId = teacher.length > 0 ? teacher[0].id : req.body.teacher_id;

        await pool.query(
            'INSERT INTO student_violations (student_id, teacher_id, violation_date, violation_type, description, sanction) VALUES (?, ?, ?, ?, ?, ?)',
            [student_id, teacherId, violation_date, violation_type, description, sanction]
        );

        req.flash('success', 'Pelanggaran berhasil dicatat');
        res.redirect('/bk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal mencatat pelanggaran');
        res.redirect('/bk');
    }
});

// Store achievement
router.post('/achievements/store', isAuthenticated, allowRoles('guru_bk', 'admin'), async (req, res) => {
    try {
        const { student_id, achievement_name, achievement_date, level, description } = req.body;

        await pool.query(
            'INSERT INTO student_achievements (student_id, achievement_name, achievement_date, level, description) VALUES (?, ?, ?, ?, ?)',
            [student_id, achievement_name, achievement_date, level, description]
        );

        req.flash('success', 'Prestasi berhasil dicatat');
        res.redirect('/bk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal mencatat prestasi');
        res.redirect('/bk');
    }
});

// Update case status
router.post('/cases/update-status/:id', isAuthenticated, allowRoles('guru_bk', 'admin'), async (req, res) => {
    try {
        const { status } = req.body;
        await pool.query('UPDATE bk_cases SET status = ? WHERE id = ?', [status, req.params.id]);
        req.flash('success', 'Status kasus berhasil diupdate');
        res.redirect('/bk');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal mengupdate status');
        res.redirect('/bk');
    }
});

module.exports = router;
