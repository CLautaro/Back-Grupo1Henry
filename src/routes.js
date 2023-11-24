const { Router } = require("express");
const { getAllProducts, getProductoById, postProducto, deleteById } = require('./controllers/productController');
const deleteById = require('./controllers/deleteController');
const postProducto = require('./controllers/postProductController');
const {
  getAllCategorys,
  modifyCategorys,
  modifySubCategorys,
  createCategorys,
  createSubCategorys,
  deleteCategory,
  deleteSubCategory,
} = require("./controllers/categoryController");

const router = Router();

router.get('/products', getAllProducts);
router.get('/producto/:id', getProductoById);
router.post('/register', postUser);
router.post('/login', loginControler);
router.delete('/delete', deleteById);
router.post('/productos', postProducto);

router.get("/categorys", getAllCategorys);
router.put("/categorys/:id", modifyCategorys);
router.put("/subcategorys/:id", modifySubCategorys);
router.post("/createCategory", createCategorys);
router.post("/createSubCategorys", createSubCategorys);
router.delete("/categorys/:id", deleteCategory);
router.delete("/subcategorys/:id", deleteSubCategory);

module.exports = router;
