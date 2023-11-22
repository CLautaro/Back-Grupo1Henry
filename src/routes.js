const { Router } = require('express');
const getProductoById = require('./controllers/productController');
const deleteById = require('./controllers/deleteController');
const postProducto = require('./controllers/postProductController');

const router = Router();


router.get('/producto/:id', getProductoById);
router.post('/register', postUser);
router.post('/login', loginControler);
router.delete('/delete', deleteById);
router.post('/productos', postProducto);

module.exports = router;