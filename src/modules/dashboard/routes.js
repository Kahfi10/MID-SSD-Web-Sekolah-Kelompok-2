const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const { isAuthenticated } = require('../../middleware/auth');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const [studentCount] = await pool.query('SELECT COUNT(*) as total FROM students WHERE status = ?', ['aktif']);
        const [teacherCount] = await pool.query('SELECT COUNT(*) as total FROM teachers');
        const [journalCount] = await pool.query('SELECT COUNT(*) as total FROM teaching_journals');
        const [bkCaseCount] = await pool.query('SELECT COUNT(*) as total FROM bk_cases WHERE status != ?', ['selesai']);

        const [recentLogs] = await pool.query(
            `SELECT al.*, u.full_name 
             FROM activity_logs al 
             JOIN users u ON al.user_id = u.id 
             ORDER BY al.created_at DESC LIMIT 10`
        );

        res.render('dashboard/index', {
            title: 'Dashboard - Web Sekolah',
            studentCount: studentCount[0].total,
            teacherCount: teacherCount[0].total,
            journalCount: journalCount[0].total,
            bkCaseCount: bkCaseCount[0].total,
            recentLogs
        });

    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi kesalahan');
        res.redirect('/auth/login');
    }
});

module.exports = router;
