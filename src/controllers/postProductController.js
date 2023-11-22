const { Product } = require('../DB_connection');


const postProducto = async (req, res) => {
    try {
        
        const {nombre, sku, descripcion, precio, stock, id_sub_categoria} = req.body;

        if (!nombre || !sku || !descripcion || !precio || !stock || !id_sub_categoria) 
            return res.status(401).send("Faltan datos.");

        await Favorite.findOrCreate({ 
            where: {nombre, sku, descripcion, precio, stock, id_sub_categoria}});

        const allFavor = await Product.findAll();
        return res.status(200).json({allFavor});
    } 
    catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = postProducto;