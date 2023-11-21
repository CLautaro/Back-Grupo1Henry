const { Router } = require('express');


const router = Router();


router.get('/producto/:id', getProductoById);
router.post('/register', postUser);
router.post('/login', loginControler);
router.delete('/delete', deleteById);



module.exports = router;