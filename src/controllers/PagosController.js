
import mercadopago from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKE || "",
  });

const create = async(req, res) => {
    const { id, nombre, precio, cantidad } = req.body;
    try {
        let preference = {
            items: [
                {
                    id: id,
                    title: nombre,
                    picture_url: "https://http2.mlstatic.com/D_NQ_NP_744890-MLU72340463933_102023-O.webp",
                    unit_price: precio,
                    currency_id: "ARS",
                    description: "CPU description",
                    quantity: cantidad,
                    category_id: 'art',
                }
            ],

            // payer: {
            //     name: 'Josue',
            //     surname: 'Silva',
            //     email: 'user@email.com',
               
            // },

            back_urls: {
                success: "http://localhost:3001/detalle",
                failure: "http://localhost:3000/failure",
                pending: 'http://www.pending.com'
            },

            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preference);
        
        console.log(response.body);
        res.status(200).json(response.response.init_point);

    }catch(error){
        console.error("Error al crear la preferencia:", error);
        res.status(500).json(error.message);
    }
};





const getAll = () => ({});
const getOne = () => ({});
const remove = () => ({});
const update = () => ({});

export default {
    getAll,
    getOne,
    create,
    remove,
    update
};