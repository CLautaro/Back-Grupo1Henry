import { createConnection } from '../database/Connection.js'

const ERROR_UNIQUE_KEY = '23505';

const db = await createConnection();

const getAll = async (request, response) => {
    const result = await db.query('SELECT * FROM categorias');

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

    response.send(result.rows[0], 200);
};

const create = async (request, response) => {
    const { nombre } = request.body;

    const query = {
        name: 'create-category',
        text: 'INSERT INTO categorias (nombre) VALUES ( $1 )',
        values: [ nombre ]
    };

    let result;

    try {
        result = await db.query(query);
    } catch (exception) {
        if (exception.code === ERROR_UNIQUE_KEY) {
            response
                .status(400)
                .send(JSON.stringify({ mensaje: exception.detail }));
            return;
        }

        response
            .status(400)
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

    const query = {
        name: 'update-category',
        text: 'UPDATE categorias SET nombre = $2 WHERE id_categoria = $1 RETURNING id_categoria, nombre',
        values: [ id, nombre ]
    };

    let result;
    
    try {
        result = await db.query(query);
    } catch (exception) {
        if (exception.code === ERROR_UNIQUE_KEY) {
            response
                .status(400)
                .send(JSON.stringify({ mensaje: exception.detail }));
            return;
        }

        response
            .status(400)
            .send(JSON.stringify({ mensaje: 'Ocurrió un error al actualizar la categoría.' }));
        return;
    }

    if (!result.rowCount) {
        response
            .status(404)
            .send(JSON.stringify({ mensaje: 'La categoría no existe.' }));
        return;
    }

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

    response
        .status(200)
        .send(JSON.stringify(result.rows[0]));
};

export default {
    getAll,
    getOne,
    create,
    remove,
    update
};
