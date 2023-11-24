import express from 'express';
import SubCategoriasController from '../controllers/SubCategoriasController';

const router = express.Router();

router.get('/', SubCategoriasController.getAll);
router.get('/:id', SubCategoriasController.getOne);
router.post('/', SubCategoriasController.create);
router.delete('/:id', SubCategoriasController.remove);
router.put('/:id', SubCategoriasController.update);

export default router;
