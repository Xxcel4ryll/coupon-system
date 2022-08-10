const { Model, DataTypes } = require('sequelize');
const { seq: DB } = require('../../../sequelize');

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'carts',
    underscored: true,
    timestamps: true,
    sequelize: DB,
  }
);

module.exports = Cart;
