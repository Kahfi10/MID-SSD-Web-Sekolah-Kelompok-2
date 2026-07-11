const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../../config/database');
const { isNotAuthenticated, isAuthenticated } = require('../../middleware/auth');

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('auth/login', { title: 'Login - Web Sekolah', layout: 'layouts/guest' });
});

router.post('/login', isNotAuthenticated, async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query(
            `SELECT u.*, r.name as role_name 
             FROM users u 
             JOIN roles r ON u.role_id = r.id 
             WHERE u.username = ? AND u.is_active = 1`,
            [username]
        );

        if (rows.length === 0) {
            req.flash('error', 'Username atau password salah');
            return res.redirect('/auth/login');
        }

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            req.flash('error', 'Username atau password salah');
            return res.redirect('/auth/login');
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            email: user.email,
            role_id: user.role_id,
            role_name: user.role_name
        };

        // Update last login
        await pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

        // Log activity
        await pool.query(
            'INSERT INTO activity_logs (user_id, action, description, ip_address) VALUES (?, ?, ?, ?)',
            [user.id, 'login', `User ${user.username} login`, req.ip]
        );

        req.flash('success', 'Selamat datang, ' + user.full_name);
        res.redirect('/dashboard');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Terjadi kesalahan server');
        res.redirect('/auth/login');
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router;
