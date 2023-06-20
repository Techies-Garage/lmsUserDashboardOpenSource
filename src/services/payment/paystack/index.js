const Paystack = require('paystack');

const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
const paystack = new Paystack(paystackSecretKey);

/**
 * Represents a Paystack payment.
 */
class PaystackPayment {
  /**
   * Charges the specified amount to the provided email address.
   * @param {number} amount - The amount to charge in Naira.
   * @param {string} email - The email address of the customer.
   * @returns {Promise<{authorizationUrl: string}>} - The authorization URL for the payment.
   * @throws {Error} - If an error occurs while initiating payment.
   */
  static async charge(amount, email) {
    try {
      const response = await paystack.transaction.initialize({
        amount: amount * 100, // Amount in kobo (100 kobo = 1 Naira)
        email: email,
      });

      // Extract the authorization URL from the response
      const authorizationUrl = response.data.authorization_url;

      // Return the authorization URL to the frontend
      return { authorizationUrl };
    } catch (error) {
      // Handle any errors that occur during the payment initiation
      throw new Error('An error occurred while initiating payment');
    }
  }
}

module.exports = { PaystackPayment };
