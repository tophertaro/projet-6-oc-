const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

router.get('/', auth, bookCtrl.getAllBooks)
router.get('/:id', auth, bookCtrl.getOneBook)
router.get('/bestrating', auth, bookCtrl.getBestRatedBooks)
router.post('/', auth, multer, bookCtrl.createBook)
router.put('/:id', auth,)
router.delete('/:id', auth,)
router.post('/:id/rating', auth,)

module.exports = router;