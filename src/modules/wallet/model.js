const WalletRepository = require('./repository');

/**
 * Represents a Wallet model.
 */
class WalletModel {
  /**
   * Creates a new wallet for the specified user.
   * @param {string} userId - The ID of the user.
   * @param {number} initialBalance - The initial balance of the wallet.
   * @param {string} currency - The currency of the wallet.
   * @returns {Promise<object>} The created wallet object.
   * @throws {Error} If failed to create the wallet.
   */
  static async createWallet(userId, initialBalance, currency) {
    try {
      const wallet = await WalletRepository.createWallet(userId, initialBalance, currency);
      return wallet;
    } catch (error) {
      throw new Error(`Failed to create wallet: ${error.message}`);
    }
  }

  /**
   * Retrieves the wallet of the specified user.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<object>} The retrieved wallet object.
   * @throws {Error} If failed to retrieve the wallet.
   */
  static async getWallet(userId) {
    try {
      const wallet = await WalletRepository.getWallet(userId);
      return wallet;
    } catch (error) {
      throw new Error(`Failed to retrieve wallet: ${error.message}`);
    }
  }

  /**
   * Updates the wallet of the specified user with the provided updates.
   * @param {string} userId - The ID of the user.
   * @param {object} updates - The updates to be applied to the wallet.
   * @returns {Promise<object>} The updated wallet object.
   * @throws {Error} If failed to update the wallet.
   */
  static async updateWallet(userId, updates) {
    try {
      const wallet = await WalletRepository.updateWallet(userId, updates);
      return wallet;
    } catch (error) {
      throw new Error(`Failed to update wallet: ${error.message}`);
    }
  }

  /**
   * Adds funds to the wallet of the specified user.
   * @param {string} userId - The ID of the user.
   * @param {number} amount - The amount to be added to the wallet.
   * @returns {Promise<object>} The updated wallet object.
   * @throws {Error} If failed to add funds to the wallet.
   */
  static async addFunds(userId, amount) {
    try {
      const wallet = await WalletRepository.addFunds(userId, amount);
      return wallet;
    } catch (error) {
      throw new Error(`Failed to add funds to wallet: ${error.message}`);
    }
  }

  /**
   * Deducts funds from the wallet of the specified user.
   * @param {string} userId - The ID of the user.
   * @param {number} amount - The amount to be deducted from the wallet.
   * @returns {Promise<object>} The updated wallet object.
   * @throws {Error} If failed to deduct funds from the wallet.
   */
  static async deductFunds(userId, amount) {
    try {
      const wallet = await WalletRepository.deductFunds(userId, amount);
      return wallet;
    } catch (error) {
      throw new Error(`Failed to deduct funds from wallet: ${error.message}`);
    }
  }

  /**
   * Retrieves the transaction history of the specified user.
   * @param {string} userId - The ID of the user.
   * @param {number} page - The page number of the transaction history.
   * @param {number} limit - The maximum number of transactions per page.
   * @param {string} sort - The sorting order for the transactions.
   * @returns {Promise<Array>} The transaction history.
   * @throws {Error} If failed to retrieve the transaction history.
   */
  static async getTransactionHistory(userId, page, limit, sort) {
    try {
      const transactionHistory = await WalletRepository.getTransactionHistory(userId, page, limit, sort);
      return transactionHistory;
    } catch (error) {
      throw new Error(`Failed to retrieve transaction history: ${error.message}`);
    }
  }

  /**
   * Retrieves the balance of the wallet for the specified user.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<number>} The wallet balance.
   * @throws {Error} If failed to retrieve the wallet balance.
   */
  static async getWalletBalance(userId) {
    try {
      const balance = await WalletRepository.getWalletBalance(userId);
      return balance;
    } catch (error) {
      throw new Error(`Failed to retrieve wallet balance: ${error.message}`);
    }
  }
}

module.exports = WalletModel;
