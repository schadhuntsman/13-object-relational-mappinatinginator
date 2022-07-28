// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true

  },
  "Plain T-Shirt": {
    type: DataTypes.STRING,
    allowNull: false,
  },
  "Running Sneakers": {
    type: DataTypes.STRING,
    allowNull: false,
  },
  "Branded Baseball Hat": {
    type: DataTypes.STRING,
    allowNull: false,
  },
  "Branded Baseball Hat": {
    type: DataTypes.STRING,
    allowNull: false,
  },
  "Cargo Shorts": {
    type: DataTypes.STRING,
    allowNull: false,
  },
    // hooks: {
    //   async beforeCreate(newProductData) {
    //   //   newProductDat
    //   },

    //   async beforeUpdate(update) {

    //   }
    // },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
}

);
module.exports = Product;
