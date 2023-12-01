import express from 'express';
import ProductosFilterController from '../controllers/ProductosFilterController';

const router = express.Router();

router.post('/', ProductosFilterController.priceRange);

export default router;