
import mercadopago from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKE || "",
  });

const create = async(req, res) => {
    try {
        let preference = {
            items: [
                {
                    id: 'item-ID-1234',
                    title: "CPU AMD",
                    picture_url: "https://http2.mlstatic.com/D_NQ_NP_744890-MLU72340463933_102023-O.webp",
                    unit_price: 35900,
                    currency_id: "ARS",
                    description: "CPU descrip",
                    quantity: 1,
                    category_id: 'art',
                }
            ],

            // payer: {
            //     name: 'João',
            //     surname: 'Silva',
            //     email: 'user@email.com',
            //     phone: {
            //       area_code: 11,
            //       number: 4444-4444
            //     },
            //     identification: {
            //       type: 'CPF',
            //       number: 19119119100
            //     },
            // },

            back_urls: {
                success: "http://localhost:3000/success",
                failure: "http://localhost:3000/failure",
                pending: 'http://www.pending.com'
            },

            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preference);

        console.log(response);
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