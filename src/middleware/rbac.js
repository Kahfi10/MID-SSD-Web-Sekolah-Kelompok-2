// Role-Based Access Control middleware
const roleHierarchy = {
    'admin': ['admin', 'kepala_sekolah', 'guru', 'guru_bk', 'wali_kelas', 'siswa', 'orang_tua'],
    'kepala_sekolah': ['kepala_sekolah', 'guru', 'guru_bk', 'wali_kelas'],
    'guru': ['guru'],
    'guru_bk': ['guru_bk'],
    'wali_kelas': ['wali_kelas', 'guru'],
    'siswa': ['siswa'],
    'orang_tua': ['orang_tua']
};

module.exports = {
    allowRoles: (...roles) => {
        return (req, res, next) => {
            if (!req.session || !req.session.user) {
                req.flash('error', 'Silakan login terlebih dahulu');
                return res.redirect('/auth/login');
            }

            const userRole = req.session.user.role_name;
            const allowed = roles.some(role => 
                roleHierarchy[userRole] && roleHierarchy[userRole].includes(role)
            );

            if (allowed) {
                return next();
            }

            req.flash('error', 'Anda tidak memiliki akses ke halaman ini');
            res.redirect('/dashboard');
        };
    }
};
