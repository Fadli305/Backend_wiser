// src/routes/articles.js
const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');

// Route untuk mendapatkan semua artikel
router.get('/', articlesController.getAllArticles);

// Route untuk mendapatkan artikel berdasarkan ID
router.get('/:id', articlesController.getArticleById);

// Route untuk memasukan komentar
router.post('/:id/comments', articlesController.addComment);

module.exports = router;
