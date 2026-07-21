const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../../config/database');
const { isAuthenticated } = require('../../middleware/auth');
const { allowRoles } = require('../../middleware/rbac');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const [users] = await pool.query(
            `SELECT u.*, r.name as role_name
             FROM users u JOIN roles r ON u.role_id = r.id
             WHERE u.id = ?`,
            [req.session.user.id]
        );
        if (users.length === 0) {
            req.flash('error', 'User tidak ditemukan');
            return res.redirect('/dashboard');
        }
        res.render('profile/index', { title: 'Profil Saya', profile: users[0] });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal memuat data');
        res.redirect('/dashboard');
    }
});

router.post('/change-password', isAuthenticated, async (req, res) => {
    try {
        const { current_password, new_password, confirm_password } = req.body;

        if (!current_password || !new_password || !confirm_password) {
            req.flash('error', 'Semua field harus diisi');
            return res.redirect('/profile');
        }
        if (new_password.length < 6) {
            req.flash('error', 'Password baru minimal 6 karakter');
            return res.redirect('/profile');
        }
        if (new_password !== confirm_password) {
            req.flash('error', 'Konfirmasi password tidak cocok');
            return res.redirect('/profile');
        }

        const [users] = await pool.query('SELECT password FROM users WHERE id = ?', [req.session.user.id]);
        const valid = await bcrypt.compare(current_password, users[0].password);
        if (!valid) {
            req.flash('error', 'Password saat ini salah');
            return res.redirect('/profile');
        }

        const hashed = await bcrypt.hash(new_password, 10);
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, req.session.user.id]);

        await pool.query(
            'INSERT INTO activity_logs (user_id, action, description, ip_address) VALUES (?, ?, ?, ?)',
            [req.session.user.id, 'change_password', 'Mengubah password sendiri', req.ip]
        );

        req.flash('success', 'Password berhasil diubah');
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal mengubah password');
        res.redirect('/profile');
    }
});

router.post('/update', isAuthenticated, async (req, res) => {
    try {
        const { full_name, email } = req.body;

        if (!full_name || !email) {
            req.flash('error', 'Nama dan email tidak boleh kosong');
            return res.redirect('/profile');
        }

        // Cek email sudah dipakai user lain
        const [existEmail] = await pool.query(
            'SELECT id FROM users WHERE email = ? AND id != ?',
            [email, req.session.user.id]
        );
        if (existEmail.length > 0) {
            req.flash('error', 'Email sudah digunakan oleh pengguna lain');
            return res.redirect('/profile');
        }

        await pool.query(
            'UPDATE users SET full_name = ?, email = ? WHERE id = ?',
            [full_name, email, req.session.user.id]
        );

        req.session.user.full_name = full_name;
        req.session.user.email = email;

        await pool.query(
            'INSERT INTO activity_logs (user_id, action, description, ip_address) VALUES (?, ?, ?, ?)',
            [req.session.user.id, 'update_profile', 'Mengupdate profil', req.ip]
        );

        req.flash('success', 'Profil berhasil diupdate');
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Gagal mengupdate profil');
        res.redirect('/profile');
    }
});

module.exports = router;
