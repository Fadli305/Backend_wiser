// routes/pakarRoutes.js
const express = require('express');
const router = express.Router();
const pakarController = require('../controllers/pakarController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');


router.get('/',  pakarController.getAllPakar);

router.get('/:id',  pakarController.getPakarById);

router.post(
  '/',
  
  [
    body('nama_pakar').notEmpty().withMessage('Nama pakar wajib diisi'),
    body('spesialisasi').notEmpty().withMessage('Spesialisasi wajib diisi'),
    body('harga').isFloat({ gt: 0 }).withMessage('Harga harus berupa angka positif'),
    body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating harus antara 0 dan 5')
  ],
  validate,
  pakarController.createPakar
);


router.put(
  '/:id',
  
  [
    body('nama_pakar').optional().notEmpty().withMessage('Nama pakar tidak boleh kosong'),
    body('spesialisasi').optional().notEmpty().withMessage('Spesialisasi tidak boleh kosong'),
    body('harga').optional().isFloat({ gt: 0 }).withMessage('Harga harus berupa angka positif'),
    body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating harus antara 0 dan 5')
  ],
  validate,
  pakarController.updatePakar
);


router.delete('/:id',  pakarController.deletePakar);

module.exports = router;
