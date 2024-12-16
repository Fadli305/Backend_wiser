// routes/produksiRoutes.js
const express = require('express');
const router = express.Router();
const produksiController = require('../controllers/produksiController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');



router.get('/',  produksiController.getAllProduksi);


router.get('/:id',  produksiController.getProduksiById);


router.post(
  '/',
  
  [
    body('id_gedung').isInt().withMessage('ID gedung harus berupa integer'),
    body('laporan_perkembangan').notEmpty().withMessage('Laporan perkembangan wajib diisi'),
    body('tanggal_laporan').isISO8601().withMessage('Tanggal laporan harus dalam format ISO8601')
  ],
  validate,
  produksiController.createProduksi
);


router.put(
  '/:id',
  
  [
    body('laporan_perkembangan').optional().notEmpty().withMessage('Laporan perkembangan tidak boleh kosong'),
    body('tanggal_laporan').optional().isISO8601().withMessage('Tanggal laporan harus dalam format ISO8601')
  ],
  validate,
  produksiController.updateProduksi
);


router.delete('/:id',  produksiController.deleteProduksi);

module.exports = router;
