const CouponModel = require('../models/coupon.model');

module.exports = class CouponRepository extends CouponModel {
  static async create(data) {
    const { code } = data;

    const coupon = await super.findOne({
      where: { code },
    });

    return !coupon ? super.create(data) : null;
  }

  static async update(criteriaObj, updates) {
    return await super.update(updates, {
      where: criteriaObj,
    });
  }

  static async fetch() {
    return await super.findAll();
  }

  static async findOne(criteria) {
    return await super.findOne({ where: criteria });
  }
};
