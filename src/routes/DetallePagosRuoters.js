import express from 'express';
import DetallePagosController from '../controllers/DetallePagosController.js';

const router = express.Router();

router.post('/', DetallePagosController.create);
router.get('/', DetallePagosController.getAll);
router.get('/:id', DetallePagosController.getOne);
router.delete('/:id', DetallePagosController.remove);
router.put('/:id', DetallePagosController.update);

export default router;