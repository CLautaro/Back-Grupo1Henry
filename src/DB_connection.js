require("dotenv").config();
const { Sequelize } = require("sequelize");
const CategoryFunction = require("./models/Category");
const SubCategoryFunction = require("./models/SubCategory");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_BDD } = process.env;
const ProductModel = require('./models/productModel');
const CategoryModel = require('./models/categoryModel');

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

ProductModel(sequelize);
CategoryModel(sequelize);

const { Product, Category } = sequelize.models;

Product.belongsTo(Category);
Category.hasMany(Product);

module.exports = {
    Product,
    Category,
    conn: sequelize,
};
