import { createConnection } from "../database/Connection.js";
const db = await createConnection();

const priceRange = async (request, response) => {
  const minPrice = parseInt(request.body.minPrice, 10);
  const maxPrice = parseInt(request.body.maxPrice, 10);

  if (isNaN(minPrice) || isNaN(maxPrice)) {
    response
      .status(400)
      .send(
        JSON.stringify({ mensaje: "Los valores de precio no son válidos." })
      );
    return;
  }

  const query = {
    name: "get-products-by-price-range",
    text: "SELECT * FROM productos WHERE precio >= $1 AND precio <= $2",
    values: [minPrice, maxPrice],
  };

  try {
    const result = await db.query(query);
    response.status(200).send(result.rows);
  } catch (exception) {
    response.status(500).send(
      JSON.stringify({
        mensaje: "Ocurrió un error al obtener productos por precio.",
        error: exception.message,
      })
    );
  }
};

export default {
  priceRange,
};