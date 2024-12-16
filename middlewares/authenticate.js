// backend/middlewares/authenticate.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Mengambil token dari header Authorization
    const token = req.header('Authorization')?.split(' ')[1]; // Mengambil token setelah 'Bearer'

    if (!token) {
        return res.status(401).json({ error: 'Access Denied, No Token Provided' });
    }

    // Verifikasi token menggunakan secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid Token' });
        }
        req.user = user; // Menyimpan informasi pengguna di req.user
        next(); // Lanjutkan ke route handler
    });
};

module.exports = authenticateToken;
