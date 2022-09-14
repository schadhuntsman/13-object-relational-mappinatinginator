const express = require('express');
const routes = require('./routes');
const{ Sequelize } = require('sequelize');

// const sequelize = require('./db/connection');

const sequelize = new Sequelize('ecommerce_db', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});
// import sequelize connection



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

