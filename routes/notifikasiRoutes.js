// routes/notifikasiRoutes.js
const express = require('express');
const router = express.Router();
const notifikasiController = require('../controllers/notifikasiController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');


router.get('/', notifikasiController.getAllNotifikasi);

router.get('/:id', notifikasiController.getNotifikasiById);

router.post(
  '/',

  [
    body('id_pengguna').isInt().withMessage('ID pengguna harus berupa integer'),
    body('pesan').notEmpty().withMessage('Pesan wajib diisi'),
    body('tanggal_dikirim').isISO8601().withMessage('Tanggal dikirim harus dalam format ISO8601'),
    body('status_baca').isBoolean().withMessage('Status baca harus berupa boolean')
  ],
  validate,
  notifikasiController.createNotifikasi
);

router.put(
  '/:id',

  [
    body('pesan').optional().notEmpty().withMessage('Pesan tidak boleh kosong'),
    body('tanggal_dikirim').optional().isISO8601().withMessage('Tanggal dikirim harus dalam format ISO8601'),
    body('status_baca').optional().isBoolean().withMessage('Status baca harus berupa boolean')
  ],
  validate,
  notifikasiController.updateNotifikasi
);

router.delete('/:id', notifikasiController.deleteNotifikasi);

module.exports = router;
