require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_BDD } = process.env;
const ProductModel = require('./models/Product');
const CategoryModel = require('./models/Category');


const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BDD}`,
    { logging: false, native: false }
);


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
 