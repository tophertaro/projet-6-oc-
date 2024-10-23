const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/books')

router.get('/')
router.get('/:id')
router.get('/bestrating')
router.post('/')
router.put('/:id')
router.delete('/:id')
router.post('/:id/rating')