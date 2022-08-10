const awilix = require('awilix');

const CartController = require('./src/Cart/controllers/cart.controller');
const CartService = require('./src/Cart/services/cart.service');
const CartRepository = require('./src/Cart/repositories/cart.repository');
const CouponController = require('./src/Coupons/controllers/coupon.controller');
const CouponService = require('./src/Coupons/services/coupon.service');
const CouponRepository = require('./src/Coupons/repositories/coupon.repository');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  cartController: awilix.asClass(CartController),
  cartService: awilix.asClass(CartService),
  CartRepository: awilix.asValue(CartRepository),
});

container.register({
  couponController: awilix.asClass(CouponController),
  couponService: awilix.asClass(CouponService),
  CouponRepository: awilix.asValue(CouponRepository),
});

module.exports = container;
