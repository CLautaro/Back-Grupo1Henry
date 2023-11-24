import express from 'express';
import CategoriasController from '../controllers/CategoriasController';

const router = express.Router();

router.get('/', CategoriasController.getAll);
router.get('/:id', CategoriasController.getOne);
router.post('/', CategoriasController.create);
router.delete('/:id', CategoriasController.remove);
router.put('/:id', CategoriasController.update);

export default router;
