require("dotenv").config();
const { Sequelize } = require("sequelize");
const CategoryFunction = require("./models/Category");
const SubCategoryFunction = require("./models/SubCategory");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_BDD } = process.env;
const ProductModel = require('./models/productModel');

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BDD}`,
  { logging: false, native: false }
);

CategoryFunction(sequelize);
SubCategoryFunction(sequelize);
ProductModel(sequelize);

const { Categoria, SubCategoria, Product } = sequelize.models;

Categoria.hasMany(SubCategoria, {
  foreignKey: "id_categoria",
  onDelete: "CASCADE",
});
SubCategoria.belongsTo(Categoria, {
  foreignKey: "id_categoria",
  onUpdate: "CASCADE",
});

Product.belongsTo(Categoria);
Categoria.hasMany(Product);

module.exports = {
  // User,
  // Favorite,
  ...sequelize.models,
  conn: sequelize,
};
