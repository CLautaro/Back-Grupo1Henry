const { Product } = require('../DB_connection');


const getProductoById = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await Product.findOne({ 
            where: { id: id }});

        if (response){
            return res.status(200).json(response);
        }else{
            return res.status(404).send('Produc not found');
        }
    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = getProductoById;