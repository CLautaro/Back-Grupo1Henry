const { Router } = require('express');
const { getAllProducts, getProductoById, 
        postProducto, deleteById } = require('./controllers/productController');
const { getProductByCategory, getProductByPrice } =require('./controllers/filterController');


const router = Router();

router.get('/productos', getAllProducts);
router.get('/producto/:id', getProductoById);
// router.post('/register', );
// router.post('/login', );
router.delete('/delete', deleteById);
router.post('/product', postProducto);
router.get('/productos/:category', getProductByCategory);    // filtrado de productos por categoria 
router.get('/productos/:minPrice/:maxPrice', getProductByPrice);    // filtrado por precio min. / max. 


module.exports = router;