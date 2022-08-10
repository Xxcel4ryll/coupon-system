const { Model, DataTypes } = require('sequelize');
const { seq: DB } = require('../../../sequelize');

class Discount extends Model {}

Discount.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    couponId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    type: {
      type: DataTypes.ENUM,
      values: ['FIXED', 'PERCENT', 'MIXED'],
      allowNull: false,
    },

    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'coupon_discounts',
    modelName: 'couponDiscount',
    underscored: true,
    timestamps: true,
    sequelize: DB,
  }
);

module.exports = Discount;
