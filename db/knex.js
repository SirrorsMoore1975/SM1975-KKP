const knex = require('knex');
require('dotenv').config();
// procuction or dev env
const enviroment = process.env.NODE_ENV === "production" ? "production" : "development";
const config = require('../knexfile')[enviroment];

module.exports = knex(config);
