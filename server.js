// src/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

// Inisialisasi dotenv
dotenv.config();

// Inisialisasi Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve file statis dari folder 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Import routes
const articlesRoutes = require('./routes/articles');
const beritaRoutes = require('./routes/berita');
const materiRoutes = require('./routes/materi');
const videosRoutes = require('./routes/videos');
const penggunaRoutes = require('./routes/penggunaRoutes');
const gedungRoutes = require('./routes/gedungRoutes');
const produksiRoutes = require('./routes/produksiRoutes');
const biayaRoutes = require('./routes/biayaRoutes');
const pakarRoutes = require('./routes/pakarRoutes');
const konsultasiRoutes = require('./routes/konsultasiRoutes');
const riwayatPembayaranRoutes = require('./routes/riwayatPembayaranRoutes');
const edukasiRoutes = require('./routes/edukasiRoutes');
const favoritRoutes = require('./routes/favoritRoutes');
const komunitasRoutes = require('./routes/komunitasRoutes');
const mediaKomunitasRoutes = require('./routes/mediaKomunitasRoutes');
const obrolanRoutes = require('./routes/obrolanRoutes');
const notifikasiRoutes = require('./routes/notifikasiRoutes');


// Gunakan routes
app.use('/api/articles', articlesRoutes);
app.use('/api/berita', beritaRoutes);
app.use('/api/materi', materiRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/pengguna', penggunaRoutes);
app.use('/api/gedung', gedungRoutes);
app.use('/api/produksi', produksiRoutes);
app.use('/api/biaya', biayaRoutes);
app.use('/api/pakar', pakarRoutes);
app.use('/api/konsultasi', konsultasiRoutes);
app.use('/api/riwayat-pembayaran', riwayatPembayaranRoutes);
app.use('/api/edukasi', edukasiRoutes);
app.use('/api/favorit', favoritRoutes);
app.use('/api/komunitas', komunitasRoutes);
app.use('/api/media-komunitas', mediaKomunitasRoutes);
app.use('/api/obrolan', obrolanRoutes);
app.use('/api/notifikasi', notifikasiRoutes);

// Route dasar
app.get("/", (req, res) => {
    res.send("Server sedang berjalan!");
});

// Global Error Handler (Opsional)
app.use((err, req, res, next) => {
    console.error("Global error handler:", err.message);
    res.status(500).json({ error: "Something went wrong" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
