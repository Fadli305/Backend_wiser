// routes/obrolanRoutes.js
const express = require('express');
const router = express.Router();
const obrolanController = require('../controllers/obrolanController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');


router.get('/', obrolanController.getAllObrolan);

router.get('/:id', obrolanController.getObrolanById);

router.post(
  '/',

  [
    body('id_komunitas').isInt().withMessage('ID komunitas harus berupa integer'),
    body('id_pengguna').isInt().withMessage('ID pengguna harus berupa integer'),
    body('pesan').notEmpty().withMessage('Pesan wajib diisi')
  ],
  validate,
  obrolanController.createObrolan
);

router.put(
  '/:id',

  [
    body('pesan').optional().notEmpty().withMessage('Pesan tidak boleh kosong')
  ],
  validate,
  obrolanController.updateObrolan
);

router.delete('/:id', obrolanController.deleteObrolan);

module.exports = router;
