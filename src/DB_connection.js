require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_BDD } = process.env;
const ProductModel = require('./models/Product');

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BDD}`,
    { logging: false, native: false }
);



module.exports = {
    User,
    Favorite,
    conn: sequelize,
 };
 