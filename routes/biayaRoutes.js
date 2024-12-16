// routes/biayaRoutes.js
const express = require('express');
const router = express.Router();
const biayaController = require('../controllers/biayaController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');



router.get('/',  biayaController.getAllBiaya);

router.get('/:id',  biayaController.getBiayaById);

router.post(
  '/',
  
  [
    body('id_gedung').isInt().withMessage('ID gedung harus berupa integer'),
    body('jenis_biaya').isIn(['operasional', 'investasi', 'pemeliharaan']).withMessage('Jenis biaya tidak valid'),
    body('jumlah').isFloat({ gt: 0 }).withMessage('Jumlah harus berupa angka positif'),
    body('tanggal').isISO8601().withMessage('Tanggal harus dalam format ISO8601')
  ],
  validate,
  biayaController.createBiaya
);


router.put(
  '/:id',
  
  [
    body('jenis_biaya').optional().isIn(['operasional', 'investasi', 'pemeliharaan']).withMessage('Jenis biaya tidak valid'),
    body('jumlah').optional().isFloat({ gt: 0 }).withMessage('Jumlah harus berupa angka positif'),
    body('tanggal').optional().isISO8601().withMessage('Tanggal harus dalam format ISO8601')
  ],
  validate,
  biayaController.updateBiaya
);


router.delete('/:id',  biayaController.deleteBiaya);

module.exports = router;
