const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')
const sharp = require('../middlewares/sharp')

router.get('/', bookCtrl.getAllBooks)
router.get('/:id', bookCtrl.getOneBook)
router.get('/bestrating', bookCtrl.getBestRatedBooks)
router.post('/', auth, multer, sharp, bookCtrl.createBook)
router.put('/:id', auth, multer, bookCtrl.updateBook)
router.delete('/:id', auth, bookCtrl.deleteBook)
router.post('/:id/rating', auth, bookCtrl.rateBook)

module.exports = router;