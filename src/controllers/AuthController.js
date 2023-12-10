import { createConnection } from '../database/Connection.js';

const ERROR_UNIQUE_KEY_EXISTS = '23505';

const db = await createConnection();

const auth = async (request, response) => {
    const { sub, name, email } = request.body;

    if ( !sub || !name || !email ) {
        response
            .status(400)
            .send(JSON.stringify({ mensaje: 'Faltan datos para autenticar al usuario.' }));
        return;
    }
    
    const checkUserQuery = {
        name: 'check-user-exists',
        text: 'SELECT nombre_usuario, nombre_completo, correo, habilitado FROM usuarios WHERE nombre_usuario = $1',
        values: [ sub ]
    };

    const result = await db.query(checkUserQuery);

    if ( !result.rowCount ) {
        console.info(`Usuario ${sub} no está registrado. Registrando nuevo usuario...`);

        const createUserQuery = {
            name: 'create-user',
            text: 'INSERT INTO usuarios (nombre_completo, correo, nombre_usuario) VALUES ($1, $2, $3)',
            values: [ name, email, sub ]
        };
    
        try {
            await db.query(createUserQuery);
        } catch (exception) {
            console.error('Ocurrió un error al registrar al usuario.', exception);

            if ( exception.code === ERROR_UNIQUE_KEY_EXISTS ) {
                response
                    .status(500)
                    .send(JSON.stringify({ mensaje: exception.detail }));
                return;
            }
    
            response
                .status(500)
                .send(JSON.stringify({ mensaje: 'Ocurrió un error al registrar al usuario.', exception }));
            return;
        }
    
        console.info(`Usuario ${sub} registrado con éxito.`);
    
        response
            .status(201)
            .send();
    
        return;
    }

    if ( !result.rows[0].habilitado ) {
        console.info(`Usuario ${sub} no se encuentra habilitado para acceso al sitio.`);

        response
            .status(401)
            .send(JSON.stringify({ mensaje: `El usuario actual no se encuentra habilitado para acceso al sitio.` }));

        return;
    }

    console.info(`Usuario ${sub} autenticado correctamente.`);

    response
        .status(204)
        .send();
};

export default {
    auth
};
