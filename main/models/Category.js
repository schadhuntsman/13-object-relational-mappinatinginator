const { Model, DataTypes } = require('sequelize');
const { DataTypes } = require('sequelize/types/index.js');
const { DataTypes } = require('sequelize/types/index.js');

const sequelize = require('../config/connection.js');

class Category extends Model {
  static 
}

Category.init(
  {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
 },
 {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category'
  }
);

module.exports = Category;
