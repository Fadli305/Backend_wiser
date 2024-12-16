// src/routes/materi.js
const express = require('express');
const router = express.Router();
const materiController = require('../controllers/materiController');

// Route untuk mendapatkan semua materi
router.get('/', materiController.getAllMateri);

// Route untuk mendapatkan materi berdasarkan ID, beserta videos dan related_materi
router.get('/:id', materiController.getMateriById);

// Route untuk menambahkan materi baru
router.post('/', materiController.addMateri);

// Route untuk mengupdate materi berdasarkan ID
router.put('/:id', materiController.updateMateri);

// Route untuk menghapus materi berdasarkan ID
router.delete('/:id', materiController.deleteMateri);

// Route untuk mendapatkan semua video untuk sebuah materi
router.get('/:id/videos', materiController.getVideosByMateriId);

// Route untuk menambahkan video baru ke sebuah materi
router.post('/:id/videos', materiController.addVideoToMateri);

// Route untuk mendapatkan semua related_materi untuk sebuah materi
router.get('/:id/related', materiController.getRelatedMateriById);

// Route untuk menambahkan related_materi baru ke sebuah materi
router.post('/:id/related', materiController.addRelatedMateri);

module.exports = router;
