
import mercadopago from 'mercadopago';
import dotenv from 'dotenv';
dotenv.config();

mercadopago.configure({
    access_token: process.env.ACCESS_TOKE || "",
  });

  const getAll = async(req, res) => {
    const paymentId = req.query.payment_id;
    console.log("paymentId", paymentId);
    try {
      const detalle = await mercadopago.payment.get(paymentId);
      const data = detalle.body;
      const dataItems = data.additional_info.items[0];
               
      const responseData = {
        payment_type: detalle.body.payment_type_id,
        payment_method: detalle.body.payment_method_id,
        status: detalle.body.status,
        status_detail: detalle.body.status_detail,
        monto: detalle.body.transaction_amount,
        description: detalle.body.description,
        cantidad: dataItems.quantity
      };
      
      console.log(responseData);
      res.status(200).json(responseData);
    }
    catch(error){
      console.error("Error al obtener el detalle del pago: ", error);
      res.status(500).json(error.message);
    }

};




const getOne = () => ({});
const create = () => ({});
const remove = () => ({});
const update = () => ({});

export default {
    getAll,
    getOne,
    create,
    remove,
    update
};