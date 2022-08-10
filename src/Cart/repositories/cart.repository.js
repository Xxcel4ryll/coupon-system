const CartModel = require('../models/cart.model');

module.exports = class CartRepository extends CartModel {
  static async createCart(data) {
    const { name } = data;

    const cart = await super.findOne({
      where: { name },
    });

    return !cart
      ? super.create({
          ...data,
        })
      : null;
  }

  static async update(criteriaObj, updates) {
    return await super.update(updates, {
      where: criteriaObj,
    });
  }

  static async fetch() {
    return await this.findAll({
      attributes: {
        exclude: ['updatedAt'],
      },
      raw: true,
    });
  }
};
