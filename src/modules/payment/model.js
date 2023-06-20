
class PaymentModel {
  static async charge(amount, email) {
    try {
      return await Services.Payment.PaystackPayment.charge(parseInt(amount), email);
    } catch(err) {
      throw err.message
    }
  }
}

module.exports = PaymentModel
