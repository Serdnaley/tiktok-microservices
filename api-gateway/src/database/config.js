require('dotenv').config();

const {
  DATABASE_DIALECT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DATABASE,
} = process.env;

module.exports = {
  dialect: DATABASE_DIALECT,
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_DATABASE,
};
