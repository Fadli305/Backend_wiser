// routes/komunitasRoutes.js
const express = require('express');
const router = express.Router();
const komunitasController = require('../controllers/komunitasController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');


router.get('/', komunitasController.getAllKomunitas);

router.get('/:id', komunitasController.getKomunitasById);

router.post(
  '/',

  [
    body('jenis_konten').isIn(['diskusi', 'pengumuman', 'acara']).withMessage('Jenis konten tidak valid'),
    body('judul').notEmpty().withMessage('Judul wajib diisi'),
    body('deskripsi').optional().isString(),
    body('tanggal_posting').isISO8601().withMessage('Tanggal posting harus dalam format ISO8601'),
    body('id_pengguna').isInt().withMessage('ID pengguna harus berupa integer')
  ],
  validate,
  komunitasController.createKomunitas
);

router.put(
  '/:id',

  [
    body('jenis_konten').optional().isIn(['diskusi', 'pengumuman', 'acara']).withMessage('Jenis konten tidak valid'),
    body('judul').optional().notEmpty().withMessage('Judul tidak boleh kosong'),
    body('deskripsi').optional().isString(),
    body('tanggal_posting').optional().isISO8601().withMessage('Tanggal posting harus dalam format ISO8601')
  ],
  validate,
  komunitasController.updateKomunitas
);

router.delete('/:id', komunitasController.deleteKomunitas);

module.exports = router;
