// routes/favoritRoutes.js
const express = require('express');
const router = express.Router();
const favoritController = require('../controllers/favoritController');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');



router.get('/', favoritController.getAllFavorit);

router.get('/:id', favoritController.getFavoritById);

router.post(
  '/',

  [
    body('id_pengguna').isInt().withMessage('ID pengguna harus berupa integer'),
    body('id_edukasi').isInt().withMessage('ID edukasi harus berupa integer')
  ],
  validate,
  favoritController.createFavorit
);

router.delete('/:id', favoritController.deleteFavorit);

module.exports = router;
