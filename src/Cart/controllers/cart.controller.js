const Joi = require('joi');

module.exports = class CartController {
  /**
   *
   * @param {{cartService: import('../services/cart.service')}} deps.cartService
   */
  constructor({ cartService }) {
    this.cartService = cartService;
  }

  get cartSchema() {
    return Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.string().required(),
    });
  }

  async createCart(req, res) {
    return res.data(await this.cartService.create(req.body));
  }

  async fetchCart(req, res) {
    return res.data(await this.cartService.fetch());
  }
};
