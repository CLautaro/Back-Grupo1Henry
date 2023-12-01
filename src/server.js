import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import expressOpenidConnect from 'express-openid-connect';
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
    productosFilterRouter,
    ordenesProductosRouter
} from './routes/index.js'

const {
    AUTH_CLIENT_ID,
    AUTH_ISSUER_BASE_URL,
    AUTH_SECRET,
    AUTH_URL_APP_FRONT,
    AUTH_URL_CALLBACK
} = process.env;

const { auth } = expressOpenidConnect;

const app = express();

const oauthConfig = {
    authRequired: false,
    auth0Logout: true,
    // URL de la aplicación front
    baseURL: AUTH_URL_APP_FRONT,
    clientID: AUTH_CLIENT_ID,
    issuerBaseURL: AUTH_ISSUER_BASE_URL,
    secret: AUTH_SECRET,
    routes: {
        // armamos la redirección al front cuando logueamos
        login: false
    }
};

app.use(auth(oauthConfig));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/login', (req, res) =>
    res.oidc.login({
        // devolver a la aplicación front
        returnTo: AUTH_URL_APP_FRONT,
        authorizationParams: {
            // el callback siempre desde el backend
            redirect_uri: AUTH_URL_CALLBACK,
        },
    })
);

app.use('/categorias', categoriasRouter);
app.use('/emisoras-de-tarjetas', emisorasDeTarjetasRouter);
app.use('/entidades-financieras', entidadesFinancierasRouter);
app.use('/roles', rolesRouter);
app.use('/tipos-de-pago', tiposDePagoRouter);

app.use('/subcategorias', subCategoriasRouter);
app.use('/formas-de-pago', formasDePagoRouter);
app.use('/usuarios', usuariosRouter);

app.use('/ordenes', ordenesRouter);
app.use('/productos', productosRouter);
app.use('/usuarios-direcciones', usuariosDireccionesRouter);

app.use('/productos-filter-price', productosFilterRouter);

app.use('/ordenes-productos', ordenesProductosRouter);

export default app;
