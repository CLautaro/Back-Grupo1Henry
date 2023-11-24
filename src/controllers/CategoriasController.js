import { createConnection } from '../database/Connection.js'

const ERROR_UNIQUE_KEY_EXISTS = '23505';

const db = await createConnection();

const getAll = async (request, response) => {
    const query = {
        name: 'get-categories',
        text: 'SELECT * FROM categorias'
    };

    const result = await db.query(query);

    response
        .status(200)
        .send(result.rows);
};

const getOne = async (request, response) => {
    const { id } = request.params;
    
    const query = {
        name: 'get-one-category',
        text: 'SELECT * FROM categorias WHERE id_categoria = $1',
        values: [ id ]
    };

    const result = await db.query(query);

    if (!result.rows.length) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'La categoría no existe.' }));
        return;
    }

    response
        .status(200)
        .send(result.rows[0]);
};

const create = async (request, response) => {
    const { nombre } = request.body;

    if (!nombre) {
        response
            .status(400)
            .send(JSON.stringify({ mensaje: 'Faltan datos para crear la categoría.' }));
        return;
    }

    const query = {
        name: 'create-category',
        text: 'INSERT INTO categorias (nombre) VALUES ($1)',
        values: [ nombre ]
    };

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
            .send(JSON.stringify({ mensaje: 'Ocurrió un error al crear la categoría.' }));
        return;
    }

    response.status(201).send();
};

const remove = async (request, response) => {
    const { id } = request.params;

    const query = {
        name: 'remove-category',
        text: 'DELETE FROM categorias WHERE id_categoria = $1',
        values: [ id ]
    };

    const result = await db.query(query);

    if (!result.rowCount) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'La categoría no existe.' }));
        return;
    }

    response.status(204).send();
};

const update = async (request, response) => {
    const { id } = request.params;
    const { nombre } = request.body;

    if (!nombre) {
        response
            .status(400)
            .send(JSON.stringify({ mensaje: 'Faltan datos para actualizar la categoría.' }));
        return;
    }

    const query = {
        name: 'update-category',
        text: 'UPDATE categorias SET nombre = $2 WHERE id_categoria = $1',
        values: [ id, nombre ]
    };

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
            .send(JSON.stringify({ mensaje: 'Ocurrió un error al actualizar la categoría.' }));
        return;
    }

    if (!result.rowCount) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'La categoría no existe.' }));
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
