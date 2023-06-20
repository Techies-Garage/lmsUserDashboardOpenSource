const PaymentModel = require('./model')
/**
 * Payment Controller class for handling payment operations.
 */
class PaymentController {
  /**
   * Charge a payment using Paystack.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  static async charge(req, res) {
    try {
      let { amount, email } = req.body;
      const response = await PaymentModel.charge(amount, email)
      Response.success(res, "Created Payment Link", response, 200);
    } catch (error) {
      Response.error(res, error.message);
    }
  }
}

module.exports = { PaymentController };
