const Joi = require('joi');

module.exports = class CouponController {
  /**
   *
   * @param {{couponService: import('../services/coupon.service')}} deps.couponService
   */
  constructor({ couponService }) {
    this.couponService = couponService;
  }

  get couponSchema() {
    return Joi.object().keys({
      code: Joi.string().required(),
      type: Joi.string().valid('FIXED', 'PERCENT', 'MIXED').required(),
      discountAmount: Joi.string().required(),
      cartLength: Joi.string().required(),
      cartMinumumAmount: Joi.string().required(),
    });
  }

  get checkSchema() {
    return Joi.object().keys({
      code: Joi.string().required(),
    });
  }

  async computeCoupon(req, res) {
    return res.data(await this.couponService.compute(req.body));
  }

  async createCoupon(req, res) {
    return res.data(await this.couponService.create(req.body));
  }

  async fetchCoupon(req, res) {
    return res.data(await this.couponService.fetch());
  }
};
