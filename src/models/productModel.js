const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define(
      'Product', 
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
         },
         nombre: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         sku: {
            type: DataTypes.STRING,
            allowNull: false,
         },

         descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         precio: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         id_sub_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },

      }, 
         { timestamps: false }
   );
};
