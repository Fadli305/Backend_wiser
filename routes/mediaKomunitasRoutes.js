// routes/mediaKomunitasRoutes.js
const express = require('express');
const router = express.Router();
const mediaKomunitasController = require('../controllers/mediaKomunitasController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');


router.get('/', mediaKomunitasController.getAllMediaKomunitas);

router.get('/:id', mediaKomunitasController.getMediaKomunitasById);

router.post(
  '/',

  [
    body('id_komunitas').isInt().withMessage('ID komunitas harus berupa integer'),
    body('jenis_media').isIn(['gambar', 'video', 'file']).withMessage('Jenis media tidak valid'),
    body('link_media').isURL().withMessage('Link media harus berupa URL yang valid')
  ],
  validate,
  mediaKomunitasController.createMediaKomunitas
);

router.put(
  '/:id',

  [
    body('jenis_media').optional().isIn(['gambar', 'video', 'file']).withMessage('Jenis media tidak valid'),
    body('link_media').optional().isURL().withMessage('Link media harus berupa URL yang valid')
  ],
  validate,
  mediaKomunitasController.updateMediaKomunitas
);

router.delete('/:id', mediaKomunitasController.deleteMediaKomunitas);

module.exports = router;
