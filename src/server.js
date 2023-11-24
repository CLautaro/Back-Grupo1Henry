import express from 'express';
import morgan from 'morgan';
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
    ordenesProductosRouter
} from './routes/index.js'

const app = express();

app.use(express.json());

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

app.use('/ordenes-productos', ordenesProductosRouter);

export default app;
