// src/routes/videos.js
const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');

// Route untuk mendapatkan semua video
router.get('/', videosController.getAllVideos);

// Route untuk mendapatkan video berdasarkan ID
router.get('/:id', videosController.getVideoById);

// Route untuk menambahkan video baru
router.post('/', videosController.addVideo);

// Route untuk mengupdate video berdasarkan ID
router.put('/:id', videosController.updateVideo);

// Route untuk menghapus video berdasarkan ID
router.delete('/:id', videosController.deleteVideo);

module.exports = router;
