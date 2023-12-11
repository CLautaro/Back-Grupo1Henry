import 'dotenv/config';
import express from 'express';
import ProductosController from '../controllers/ProductosController.js';
import { auth } from 'express-oauth2-jwt-bearer';

const {
    AUTH_AUDIENCE_URL,
    AUTH_ISSUER_BASE_URL,
} = process.env;

const checkJwt = auth({
    audience: AUTH_AUDIENCE_URL,
    issuerBaseURL: AUTH_ISSUER_BASE_URL
});

const checkPermissionsMiddleware = (request, result, next) => {
    console.log('headers', request.headers);
    next();
};

const router = express.Router();

router.get('/', ProductosController.getAll);
router.get('/:id', ProductosController.getOne);
router.post('/', checkJwt, checkPermissionsMiddleware, ProductosController.create);
router.delete('/:id', checkJwt, checkPermissionsMiddleware, ProductosController.remove);
router.put('/:id', checkJwt, checkPermissionsMiddleware, ProductosController.update);

export default router;
