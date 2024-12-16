// routes/konsultasiRoutes.js
const express = require('express');
const router = express.Router();
const konsultasiController = require('../controllers/konsultasiController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');


router.get('/',  konsultasiController.getAllKonsultasi);

router.get('/:id',  konsultasiController.getKonsultasiById);

router.post(
  '/',
  
  [
    body('id_pengguna').isInt().withMessage('ID pengguna harus berupa integer'),
    body('id_pakar').isInt().withMessage('ID pakar harus berupa integer'),
    body('status_pembayaran').isIn(['pending', 'paid', 'failed']).withMessage('Status pembayaran tidak valid'),
    body('tanggal_konsultasi').isISO8601().withMessage('Tanggal konsultasi harus dalam format ISO8601'),
    body('durasi').isInt({ gt: 0 }).withMessage('Durasi harus berupa integer positif')
  ],
  validate,
  konsultasiController.createKonsultasi
);


router.put(
  '/:id',
  
  [
    body('status_pembayaran').optional().isIn(['pending', 'paid', 'failed']).withMessage('Status pembayaran tidak valid'),
    body('tanggal_konsultasi').optional().isISO8601().withMessage('Tanggal konsultasi harus dalam format ISO8601'),
    body('durasi').optional().isInt({ gt: 0 }).withMessage('Durasi harus berupa integer positif')
  ],
  validate,
  konsultasiController.updateKonsultasi
);


router.delete('/:id',  konsultasiController.deleteKonsultasi);

module.exports = router;
