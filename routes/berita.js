// src/routes/berita.js
const express = require('express');
const router = express.Router();
const beritaController = require('../controllers/beritaController');

// Route untuk mendapatkan semua berita
router.get('/', beritaController.getAllBerita);

// Route untuk mendapatkan berita berdasarkan ID
router.get('/:id', beritaController.getBeritaById);

// Route untuk menambahkan berita baru
router.post('/', beritaController.addBerita);

// Route untuk menambahkan referensi berita
router.post('/:id/references', beritaController.addBeritaReference);

module.exports = router;
