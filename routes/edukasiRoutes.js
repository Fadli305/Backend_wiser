// routes/edukasiRoutes.js
const express = require('express');
const router = express.Router();
const edukasiController = require('../controllers/edukasiController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');


router.get('/', edukasiController.getAllEdukasi);

router.get('/:id', edukasiController.getEdukasiById);

router.post(
  '/',
  [
    body('jenis_konten').isIn(['video', 'artikel', 'infografis']).withMessage('Jenis konten tidak valid'),
    body('judul').notEmpty().withMessage('Judul wajib diisi'),
    body('link_konten').isURL().withMessage('Link konten harus berupa URL yang valid'),
    body('deskripsi').optional().isString()
  ],
  validate,
  edukasiController.createEdukasi
);


router.put(
  '/:id',

  [
    body('jenis_konten').optional().isIn(['video', 'artikel', 'infografis']).withMessage('Jenis konten tidak valid'),
    body('judul').optional().notEmpty().withMessage('Judul tidak boleh kosong'),
    body('link_konten').optional().isURL().withMessage('Link konten harus berupa URL yang valid'),
    body('deskripsi').optional().isString()
  ],
  validate,
  edukasiController.updateEdukasi
);


router.delete('/:id', edukasiController.deleteEdukasi);

module.exports = router;
