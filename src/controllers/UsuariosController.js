import { createConnection } from '../database/Connection.js';

const db = await createConnection();

const ERROR_UNIQUE_KEY_EXISTS = '23505';

const getAll = async (request, response) => {
    const query = {
        name: 'get-users',
        text: 'SELECT * FROM usuarios'
    };

    const result = await db.query(query);

    response
        .status(200)
        .send(result.rows);
};

const getOne = async (request, response) => {
    const { id } = request.params;
    
    const query = {
        name: 'get-one-user',
        text: 'SELECT * FROM usuarios WHERE nombre_usuario = $1',
        values: [ id ]
    };

    const result = await db.query(query);

    if (!result.rows.length) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'El usuario no existe.' }));
        return;
    }

    response
        .status(200)
        .send(result.rows[0]);
};

const create = async (request, response) => {
    response.status(201).json(request.body);
};
const remove = () => ({});

const update = async (request, response) => {
    const { id } = request.params;
    const { nombre_completo, correo, nombre_usuario, id_rol, habilitado } = request.body;

    if ( !nombre_completo || !correo || !nombre_usuario || !id_rol || habilitado === null || habilitado === undefined ) {
        response
            .status(400)
            .send(JSON.stringify({ mensaje: 'Faltan datos para actualizar el usuario.' }));
        return;
    }

    const query = {
        name: 'update-user',
        text: 'UPDATE usuarios SET nombre_completo = $2, correo = $3, nombre_usuario = $4, id_rol = $5, habilitado = $6 WHERE id_usuario = $1',
        values: [ id, nombre_completo, correo, nombre_usuario, id_rol, habilitado ]
    };

    console.log(id, nombre_completo, correo, nombre_usuario, id_rol, habilitado);

    let result;
    
    try {
        result = await db.query(query);
    } catch (exception) {
        if (exception.code === ERROR_UNIQUE_KEY_EXISTS) {
            response
                .status(500)
                .send(JSON.stringify({ mensaje: exception.detail }));
            return;
        }

        response
            .status(500)
            .send(JSON.stringify({ mensaje: 'Ocurrió un error al actualizar al usuario.', exception }));
        return;
    }

    if (!result.rowCount) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'El usuario no existe.' }));
        return;
    }

    // si se llega a remover el id de la query, podemos tener problemas...
    if (result.rowCount > 1) {
        response
            .status(500)
            .send(
                JSON.stringify({
                    mensaje: 'Error en la actualización de la categoría. Se actualizó más de un registro.',
                    registros: result.rows
                })
            );
        return;
    }

    response.status(204).send();
};

export default {
    getAll,
    getOne,
    create,
    remove,
    update
};
