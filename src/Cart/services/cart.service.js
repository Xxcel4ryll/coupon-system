module.exports = class CartService {
  /**
   * Cart srevice constructor
   * @param {{
   *    CartRepository: typeof import('../repositories/cart.repository')
   * }} param0
   */
  constructor({ CartRepository }) {
    this.CartRepository = CartRepository;
  }

  /**
   * Create cart
   * @param {{
   *    name: string,
   *    price: string,
   * }} data cart data
   */
  async create(data) {
    const cart = await this.CartRepository.createCart(data);

    if (!cart) {
      return Promise.reject('Cart already exist');
    }

    return cart;
  }

  /**
   * Fetch cart items
   * @param {{
   *    name: string,
   *    price: string,
   * }} data cart data
   */
  async fetch() {
    const cartItems = await this.CartRepository.fetch();
    let cartPrice = 0;
    
    cartItems.map(({ price }) => {
      cartPrice += +price;
    });

    return { cartItems, cartPrice };
  }
};
