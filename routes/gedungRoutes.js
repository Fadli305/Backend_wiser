// routes/gedungRoutes.js
const express = require('express');
const router = express.Router();
const gedungController = require('../controllers/gedungController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');



router.get('/', gedungController.getAllGedung);

router.get('/:id', gedungController.getGedungById);

router.post(
  '/',
  [
    body('id_pengguna').isInt().withMessage('ID pengguna harus berupa integer'),
    body('nama_gedung').notEmpty().withMessage('Nama gedung wajib diisi'),
    body('lokasi').notEmpty().withMessage('Lokasi wajib diisi')
  ],
  validate,
  gedungController.createGedung
);


router.put(
  '/:id',
  [
    body('nama_gedung').optional().notEmpty().withMessage('Nama gedung tidak boleh kosong'),
    body('lokasi').optional().notEmpty().withMessage('Lokasi tidak boleh kosong')
  ],
  validate,
  gedungController.updateGedung
);


router.delete('/:id', gedungController.deleteGedung);

module.exports = router;
