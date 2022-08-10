const awilix = require('awilix');
const $ = require('express-async-handler');
const router = require('express').Router();

const Validator = require('../../../services/validator');

/**
 * auth routes loader
 * @param {awilix.AwilixContainer} container ioc container
 */
module.exports.loadCouponRoutes = function loadCouponRoutes(container) {
  /**
   * @type{import('../controllers/coupon.controller')}
   */
  const couponController = container.resolve('couponController');

  router.route('/').post(
    Validator(couponController.checkSchema),
    $((...args) => couponController.computeCoupon(...args))
  );

  router
    .route('/')
    // .post(
    //   Validator(couponController.couponSchema),
    //   $((...args) => couponController.createCoupon(...args))
    // )
    .get($((...args) => couponController.fetchCoupon(...args)));

  return router;
};
