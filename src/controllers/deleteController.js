const { Product } = require('../DB_connection');


const deleteById = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Product.findOne({ where: { id: id }});

        if (response){
            // Soft  delete 
            return res.status(200).send('Producto eliminado');
        }else{
            return res.status(404).send('Product Not Found');
        }

    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = deleteById;