const awilix = require('awilix');
const $ = require('express-async-handler');
const router = require('express').Router();

const Validator = require('../../../services/validator');

/**
 * auth routes loader
 * @param {awilix.AwilixContainer} container ioc container
 */
module.exports.loadCartRoutes = function loadCartRoutes(container) {
  /**
   * @type{import('../controllers/cart.controller')}
   */
  const cartController = container.resolve('cartController');

  router
    .route('/')
    .post(
      Validator(cartController.cartSchema),
      $((...args) => cartController.createCart(...args))
    )
    .get($((...args) => cartController.fetchCart(...args)));

  return router;
};
