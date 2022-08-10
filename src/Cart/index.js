const container = require('../../ioc-container');
const { loadCartRoutes } = require('./routes/cart.route');

module.exports.cartRoutes = loadCartRoutes(container);
