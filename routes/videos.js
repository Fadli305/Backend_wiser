// src/routes/videos.js
const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');
const { body, param } = require('express-validator');

// GET /api/videos - Mendapatkan semua video
router.get('/', videosController.getAllVideos);

// GET /api/videos/:id - Mendapatkan video berdasarkan ID
router.get(
  '/:id',
  param('id').isInt().withMessage('ID harus berupa angka'),
  videosController.getVideoById
);

// POST /api/videos - Menambahkan video baru
router.post(
  '/',
  [
    body('materi_id').isInt().withMessage('materi_id harus berupa angka'),
    body('title').notEmpty().withMessage('title harus diisi'),
    body('description').notEmpty().withMessage('description harus diisi'),
    body('duration').notEmpty().withMessage('duration harus diisi'),
    body('video_url').isURL().withMessage('video_url harus berupa URL yang valid'),
    body('image_url').isURL().withMessage('image_url harus berupa URL yang valid'),
    body('author').notEmpty().withMessage('author harus diisi'),
    body('is_main').optional().isBoolean().withMessage('is_main harus berupa boolean'),
  ],
  videosController.addVideo
);

// PUT /api/videos/:id - Mengupdate video berdasarkan ID
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('ID harus berupa angka'),
    body('title').notEmpty().withMessage('title harus diisi'),
    body('description').notEmpty().withMessage('description harus diisi'),
    body('duration').notEmpty().withMessage('duration harus diisi'),
    body('video_url').isURL().withMessage('video_url harus berupa URL yang valid'),
    body('image_url').isURL().withMessage('image_url harus berupa URL yang valid'),
    body('author').notEmpty().withMessage('author harus diisi'),
    body('is_main').optional().isBoolean().withMessage('is_main harus berupa boolean'),
  ],
  videosController.updateVideo
);

// DELETE /api/videos/:id - Menghapus video berdasarkan ID
router.delete(
  '/:id',
  param('id').isInt().withMessage('ID harus berupa angka'),
  videosController.deleteVideo
);

module.exports = router;
