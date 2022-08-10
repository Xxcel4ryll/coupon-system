require('dotenv').config();

const {
  MYSQL_USER,
  NODE_ENV,
  MYSQL_PORT,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_NAME,
  JWT_SECRET_KEY,
  PORT,
} = process.env;

const devEnvs = ['develop', 'development', 'local', 'staging', 'qa'];

module.exports = {
  appEnv: NODE_ENV,
  envIsDev: NODE_ENV ? devEnvs.includes(NODE_ENV) : true,
  port: PORT || 2022,
  database: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_NAME,
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: 'mysql',
  },
  auth: {
    secret: JWT_SECRET_KEY,
  },
};
