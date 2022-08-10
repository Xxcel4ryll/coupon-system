const container = require('../../ioc-container');
const { loadCouponRoutes } = require('./routes/coupon.route');

module.exports.couponRoutes = loadCouponRoutes(container);
