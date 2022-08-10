module.exports = class CouponMapper {
  static toDB(couponData) {
    return {
      code: couponData.code,
      discountAmount: couponData.discountAmount,
      discountType: couponData.type,
      cartLength: couponData.cartLength,
      cartMinumumAmount: couponData.cartMinumumAmount,
    };
  }
};
