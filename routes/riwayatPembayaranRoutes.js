// routes/riwayatPembayaranRoutes.js
const express = require('express');
const router = express.Router();
const riwayatPembayaranController = require('../controllers/riwayatPembayaranController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');



router.get('/',  riwayatPembayaranController.getAllRiwayatPembayaran);

router.get('/:id',  riwayatPembayaranController.getRiwayatPembayaranById);

router.post(
  '/',
  
  [
    body('id_pengguna').isInt().withMessage('ID pengguna harus berupa integer'),
    body('id_konsultasi').isInt().withMessage('ID konsultasi harus berupa integer'),
    body('jumlah_bayar').isFloat({ gt: 0 }).withMessage('Jumlah bayar harus berupa angka positif'),
    body('tanggal_bayar').isISO8601().withMessage('Tanggal bayar harus dalam format ISO8601')
  ],
  validate,
  riwayatPembayaranController.createRiwayatPembayaran
);


router.put(
  '/:id',
  
  [
    body('jumlah_bayar').optional().isFloat({ gt: 0 }).withMessage('Jumlah bayar harus berupa angka positif'),
    body('tanggal_bayar').optional().isISO8601().withMessage('Tanggal bayar harus dalam format ISO8601')
  ],
  validate,
  riwayatPembayaranController.updateRiwayatPembayaran
);

router.delete('/:id',  riwayatPembayaranController.deleteRiwayatPembayaran);

module.exports = router;
