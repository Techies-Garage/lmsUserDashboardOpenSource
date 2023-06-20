const WalletModel = require('./model');

/**
 * Controller for managing wallet operations.
 */
class WalletController {
  /**
   * Creates a new wallet for a user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} A Promise that resolves when the wallet is created.
   */
  static async createWallet(req, res, next) {
    try {
      const userId = req.user.id;
      const { initialBalance, currency } = req.body;
      const wallet = await WalletModel.createWallet(userId, initialBalance, currency);
      Response.success(res, "Wallet Created Successful", wallet, 201);
    } catch (error) {
      Response.error(res, error.message);
    }
  }

  /**
   * Retrieves the wallet for a user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} A Promise that resolves when the wallet is retrieved.
   */
  static async getWallet(req, res, next) {
    try {
      const userId = req.user.id;
      const wallet = await WalletModel.getWallet(userId);
      Response.success(res, "Balance Enquiry successful", wallet, 200);
    } catch (error) {
      Response.error(res, error.message);
    }
  }

  /**
   * Updates the wallet for a user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} A Promise that resolves when the wallet is updated.
   */
  static async updateWallet(req, res, next) {
    try {
      const userId = req.user.id;
      const updates = req.body;
      const wallet = await WalletModel.updateWallet(userId, updates);
      Response.success(res, "Transaction Successful", wallet, 200);
    } catch (error) {
      Response.error(res, error.message);
    }
  }

  /**
   * Adds funds to the user's wallet.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} A Promise that resolves when the funds are added to the wallet.
   */
  static async addFunds(req, res, next) {
    try {
      const userId = req.user.id;
      const { amount } = req.body;
      const wallet = await WalletModel.addFunds(userId, amount);
      Response.success(res, "Transaction Successful", wallet, 200);
    } catch (error) {
      Response.error(res, error.message);
    }
  }

  /**
   * Deducts funds from the user's wallet.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} A Promise that resolves when the funds are deducted from the wallet.
   */
  static async deductFunds(req, res, next) {
    try {
      const userId = req.user.id;
      const { amount } = req.body;
      const wallet = await WalletModel.deductFunds(userId, amount);
      Response.success(res, "Transaction Successful", wallet, 200);
    } catch (error) {
      Response.error(res, error.message);
    }
  }

  /**
   * Retrieves the transaction history for a user's wallet.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} A Promise that resolves when the transaction history is retrieved.
   */
  static async getTransactionHistory(req, res, next) {
    try {
      let { page, limit, sort } = {...req.query}
      const userId = req.user.id;
      const transactionHistory = await WalletModel.getTransactionHistory(userId, page, limit, sort);
      Response.success(res, "Successfully Retrieved Transaction History", transactionHistory, 200);
    } catch (error) {
      Response.error(res, error.message);
    }
  }

  /**
   * Retrieves the balance of the user's wallet.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   * @returns {Promise<void>} A Promise that resolves when the wallet balance is retrieved.
   */
  static async getWalletBalance(req, res, next) {
    try {
      const userId = req.user.id;
      const balance = await WalletModel.getWalletBalance(userId);
      Response.success(res, "Successfully Retrieved", balance, 200);
    } catch (error) {
      Response.error(res, error.message);
    }
  }
}

module.exports = { WalletController };
