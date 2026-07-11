const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const { isAuthenticated } = require('../../middleware/auth');
const { allowRoles } = require('../../middleware/rbac');

router.get('/', isAuthenticated, allowRoles('guru', 'admin', 'kepala_sekolah', 'wali_kelas'), async (req, res) => {
    try {
        let query;
        let params = [];

        if (req.session.user.role_name === 'guru') {
            // Get teacher ID for this user
            const [teacher] = await pool.query('SELECT id FROM teachers WHERE user_id = ?', [req.session.user.id]);
            if (teacher.length === 0) {
                req.flash('error', 'Data guru tidak ditemukan');
                return res.redirect('/dashboard');
            }
            query = `SELECT tj.*, c.class_name, s.subject_name, t.full_name as teacher_name
                     FROM teaching_journals tj
                     JOIN classes c ON tj.class_id = c.id
                     JOIN subjects s ON tj.subject_id = s.id
                     JOIN teachers t ON tj.teacher_id = t.id
                     WHERE tj.teacher_id = ?
                     ORDER BY tj.teaching_date DESC`;
            params = [teacher[0].id];
        } else {
            query = `SELECT tj.*, c.class_name, s.subject_name, t.full_name as teacher_name
                     FROM teaching_journals tj
                     JOIN classes c ON tj.class_id = c.id
                     JOIN subjects s ON tj.subject_id = s.id
                     JOIN teachers t ON tj.teacher_id = t.id
                     ORDER BY tj.teaching_date DESC`;
        }

        const [journals] = await pool.query(query, params);
        const [classes] = await pool.query('SELECT * FROM classes');
        const [subjects] = await pool.query('SELECT * FROM subjects');
        const [teachers] = await pool.query('SELECT * FROM teachers');
        const [semesters] = await pool.query('SELECT * FROM semesters WHERE is_active = 1');

        res.render('jurnal/index', {
            title: 'Jurnal Mengajar',
            journals,
            classes,
            subjects,
            teachers,
            semesters,
            userRole: req.session.user.role_name
        });

    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal memuat data');
        res.redirect('/dashboard');
    }
});

router.post('/store', isAuthenticated, allowRoles('guru', 'admin'), async (req, res) => {
    try {
        const { class_id, subject_id, teaching_date, material, method, notes, semester_id } = req.body;
        const [teacher] = await pool.query('SELECT id FROM teachers WHERE user_id = ?', [req.session.user.id]);

        if (teacher.length === 0 && req.session.user.role_name !== 'admin') {
            req.flash('error', 'Data guru tidak ditemukan');
            return res.redirect('/jurnal');
        }

        const teacherId = req.session.user.role_name === 'admin' 
            ? req.body.teacher_id 
            : teacher[0].id;

        await pool.query(
            'INSERT INTO teaching_journals (teacher_id, class_id, subject_id, teaching_date, material, method, notes, semester_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [teacherId, class_id, subject_id, teaching_date, material, method, notes, semester_id]
        );

        await pool.query(
            'INSERT INTO activity_logs (user_id, action, description, ip_address) VALUES (?, ?, ?, ?)',
            [req.session.user.id, 'create_journal', `Membuat jurnal mengajar ${teaching_date}`, req.ip]
        );

        req.flash('success', 'Jurnal mengajar berhasil disimpan');
        res.redirect('/jurnal');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal menyimpan jurnal');
        res.redirect('/jurnal');
    }
});

router.post('/delete/:id', isAuthenticated, allowRoles('admin'), async (req, res) => {
    try {
        await pool.query('DELETE FROM teaching_journals WHERE id = ?', [req.params.id]);
        req.flash('success', 'Jurnal berhasil dihapus');
        res.redirect('/jurnal');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal menghapus jurnal');
        res.redirect('/jurnal');
    }
});

module.exports = router;
