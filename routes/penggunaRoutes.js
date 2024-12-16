// routes/penggunaRoutes.js
const express = require('express');
const router = express.Router();
const penggunaController = require('../controllers/penggunaController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const authenticateToken = require('../middlewares/authenticate');  // Pastikan mengimpor middleware ini


router.get('/', authenticateToken, penggunaController.getAllPengguna);

router.get('/:id', authenticateToken, penggunaController.getPenggunaById);

router.post(
  '/',
  authenticateToken, // Hapus jika registrasi tidak memerlukan autentikasi
  [
    body('nama').notEmpty().withMessage('Nama wajib diisi'),
    body('email').isEmail().withMessage('Email tidak valid'),
    body('kata_sandi').isLength({ min: 6 }).withMessage('Kata sandi minimal 6 karakter')
  ],
  validate,
  penggunaController.createPengguna
);

router.put(
  '/:id',
  authenticateToken,
  [
    body('nama').optional().notEmpty().withMessage('Nama tidak boleh kosong'),
    body('email').optional().isEmail().withMessage('Email tidak valid'),
    body('kata_sandi').optional().isLength({ min: 6 }).withMessage('Kata sandi minimal 6 karakter')
  ],
  validate,
  penggunaController.updatePengguna
);

router.delete('/:id', authenticateToken, penggunaController.deletePengguna);

module.exports = router;
