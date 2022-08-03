const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

{ force: true }

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    // define columns
  },
 tag_name: {
    type: DataTypes.STRING,
    allowNull: false,

  // define columns
},
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
  
);

module.exports = Tag;
