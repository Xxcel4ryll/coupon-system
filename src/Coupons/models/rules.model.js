const { Model, DataTypes } = require('sequelize');
const { seq: DB } = require('../../../sequelize');

class Rules extends Model {}

Rules.init(
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

    cartMinumumAmount: {
      type: DataTypes.STRING,
      allowNull: false
    },

    cartLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: 'coupon_rules',
    underscored: true,
    timestamps: true,
    sequelize: DB,
  }
);

module.exports = Rules;
