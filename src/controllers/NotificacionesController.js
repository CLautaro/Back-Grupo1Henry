




const paymentId = response.body.id;

https://api.mercadopago.com/v1/payments/{id}
const payment = await mercadopago.payment.findById(Number(paymentId));


console.log(payment);