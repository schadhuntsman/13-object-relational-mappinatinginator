const { Model, DataTypes } = require('sequelize');
const { DataTypes } = require('sequelize/types/index.js');
const { DataTypes } = require('sequelize/types/index.js');

const sequelize = require('../config/connection.js');

// create our User model
class Category extends Model {}

// define table columns and configuration
Category.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
     // turn on auto increment
     autoIncrement: true
    
    },
    
    // TABLE COLUMN DEFINITIONS GO HERE
  }, //define shirts
  Shirts: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //define shorts
  Shorts: {
    type: DataTypes.STRING,
    allowNull: false,
  },//define music
  Music: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //define hats
  Hats: {
    type: DataTypes.STRING,
    allowNull: false,
  },//define Shoes
  Shoes: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  {
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
     // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
     // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'category',
  }
);

module.exports = Category;
