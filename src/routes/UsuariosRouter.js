import express from 'express';
import UsuariosController from '../controllers/UsuariosController';

const router = express.Router();

router.get('/', UsuariosController.getAll);
router.get('/:id', UsuariosController.getOne);
router.post('/', UsuariosController.create);
router.delete('/:id', UsuariosController.remove);
router.put('/:id', UsuariosController.update);

export default router;
