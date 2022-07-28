require('dotenv').config();

//import sequelize constructor from library
const Sequelize = require('sequelize');

//create a connection to database, pass in mysql information for db_name, db_user, db_password
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
        // port: 3001
      },
    });

module.exports = sequelize;
