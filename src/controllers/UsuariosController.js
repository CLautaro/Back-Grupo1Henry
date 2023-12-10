const getAll = () => ({});
const getOne = () => ({});
const create = async (request, response) => {
    response.status(201).json(request.body);
};
const remove = () => ({});
const update = () => ({});

export default {
    getAll,
    getOne,
    create,
    remove,
    update
};
