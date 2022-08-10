const { Model, DataTypes } = require('sequelize');
const { seq: DB } = require('../../../sequelize');

class Coupon extends Model {}

Coupon.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    discountType: {
      type: DataTypes.ENUM,
      values: ['FIXED', 'PERCENT', 'MIXED'],
      allowNull: false,
    },

    discountAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cartMinumumAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cartLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: 'coupons',
    underscored: true,
    timestamps: true,
    sequelize: DB,
  }
);

// Coupon.CouponDiscount = Coupon.hasOne(CouponDiscount, {
//   as: 'discount',
//   // foreignKey: 'id',
// });
// CouponDiscount.Coupon = CouponDiscount.belongsTo(Coupon);

module.exports = Coupon;
