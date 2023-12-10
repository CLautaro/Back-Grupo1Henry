import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.post('/', AuthController.auth);

export default router;
