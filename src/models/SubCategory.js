const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("SubCategoria", {
    id_sub_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categoria", // Aquí se refiere al nombre de la tabla en la base de datos
        key: "id_categoria",
      },
      onUpdate: "CASCADE",
    },
    nombre: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  });
};
