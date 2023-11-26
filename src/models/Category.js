const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Categoria", {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true,
    },
  });
};
