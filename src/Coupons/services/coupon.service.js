const CouponMapper = require('../mappers/coupons.mapper');

module.exports = class CouponService {
  /**
   * Coupon srevice constructor
   * @param {{
   *    CouponRepository: typeof import('../repositories/coupon.repository')
   * }} param0
   */
  constructor({ CouponRepository, cartService }) {
    this.CouponRepository = CouponRepository;
    this.cartService = cartService;
  }

  /**
   * Create coupon
   * @param {{
   *    code: string,
   *    discount: string,
   *    rules: string,
   * }} data coupon data
   */
  async create(createCouponData) {
    const rest = CouponMapper.toDB(createCouponData);

    const coupon = await this.CouponRepository.create(rest);

    if (!coupon) {
      return Promise.reject('coupon already exist');
    }

    return coupon;
  }

  /**
   * Compute checks
   * @param {{
   *    code: string,
   * }} data coupon data
   */
  async compute(code) {
    const validCoupon = await this.CouponRepository.findOne(code);

    if (!validCoupon) {
      return Promise.reject('Invalid coupon code');
    }

    const { cartPrice, cartItems } = await this.cartService.fetch();

    const ruleCheck =
      this.checkRules(cartPrice, validCoupon, cartItems) &&
      this.calculateDiscount(cartPrice, validCoupon);

    if (!ruleCheck) return Promise.reject(`${code.code} rules not meant`);

    return {
      adjustedPrice: ruleCheck.adjustedPrice,
      discountAmount: ruleCheck.discountAmount,
      cartPrice,
      cartItems,
    };
  }

  /**
   * Fetch coupon
   * @param {{
   *    code: string,
   *    discount: string,
   *    rules: string,
   * }} data coupon data
   */
  async fetch() {
    return this.CouponRepository.fetch();
  }

  calculateDiscount(cartPrice, coupon) {
    const { discountType, code, discountAmount } = coupon;
    let adjustedPrice = 0;
    let fixed = 0;
    let percent = 0;

    discountType === 'FIXED'
      ? (adjustedPrice = cartPrice - discountAmount)
      : discountType === 'PERCENT'
      ? (adjustedPrice = cartPrice - cartPrice * (discountAmount / 100))
      : discountType === 'MIXED'
      ? [
          (fixed = cartPrice - discountAmount),
          (percent = cartPrice - cartPrice * (discountAmount / 100)),
          (adjustedPrice = fixed < percent ? fixed : percent),
        ]
      : '';

    if (code === 'REJECTED10') {
      adjustedPrice = cartPrice - cartPrice * (discountAmount / 100);
    }

    return {
      adjustedPrice,
      discountAmount:
        discountType == 'FIXED'
          ? `$${discountAmount}`
          : discountType == 'PERCENT'
          ? `${discountAmount}%`
          : discountType == 'MIXED'
          ? `${fixed < percent ? `$${discountAmount}` : `${discountAmount}%`}`
          : discountAmount,
    };
  }

  checkRules(cartPrice, coupon, cartItems) {
    return (
      cartItems.length >= coupon.cartLength &&
      cartPrice > coupon.cartMinumumAmount
    );
  }
};
