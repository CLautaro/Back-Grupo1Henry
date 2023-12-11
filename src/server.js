import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {
    categoriasRouter,
    emisorasDeTarjetasRouter,
    entidadesFinancierasRouter,
    rolesRouter,
    tiposDePagoRouter,
    subCategoriasRouter,
    formasDePagoRouter,
    usuariosRouter,
    ordenesRouter,
    productosRouter,
    usuariosDireccionesRouter,
    ordenesProductosRouter,
    pagosRouter,
    authRouter
} from './routes/index.js'

import { auth } from 'express-oauth2-jwt-bearer';

const {
    AUTH_AUDIENCE_URL,
    AUTH_ISSUER_BASE_URL,
} = process.env;

const app = express();

const checkJwt = auth({
    audience: AUTH_AUDIENCE_URL,
    issuerBaseURL: AUTH_ISSUER_BASE_URL
});

const checkPermissionsMiddleware = (request, result, next) => {
    console.log('headers', request.headers);
    next();
};

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/categorias', categoriasRouter);
app.use('/emisoras-de-tarjetas', checkJwt, emisorasDeTarjetasRouter);
app.use('/entidades-financieras', checkJwt, entidadesFinancierasRouter);
app.use('/roles', checkJwt, rolesRouter);
app.use('/tipos-de-pago', tiposDePagoRouter);

app.use('/subcategorias', subCategoriasRouter);
app.use('/formas-de-pago', checkJwt, formasDePagoRouter);
app.use('/usuarios', checkJwt, usuariosRouter);
app.use('/pagos', checkJwt, pagosRouter);

app.use('/ordenes', checkJwt, ordenesRouter);
app.use('/productos', productosRouter);
app.use('/usuarios-direcciones', checkJwt, usuariosDireccionesRouter);

app.use('/ordenes-productos', checkJwt, ordenesProductosRouter);

app.use('/auth', checkJwt, authRouter);

export default app;
