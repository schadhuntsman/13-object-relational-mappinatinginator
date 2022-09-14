const express = require('express');
const routes = require('./routes');


const sequelize = require('./db/connection');
// const sequelize = require('sequelize')
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
// turn on connection to database and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
// sync sequelize models to the database, then turn on the server
