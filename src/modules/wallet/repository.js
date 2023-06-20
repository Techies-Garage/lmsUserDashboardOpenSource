const { Wallet, TransactionHistory } = require('./schema');
const math = require('mathjs');

/**
 * Repository class for managing wallet operations.
 */
class WalletRepository {
  /**
   * Create a new wallet.
   * @param {string} userId - The ID of the user associated with the wallet.
   * @param {number} initialBalance - The initial balance of the wallet.
   * @param {string} currency - The currency of the wallet.
   * @returns {Promise<Wallet>} The created wallet.
   * @throws {Error} If there is an error creating the wallet.
   */
  static async createWallet(userId, initialBalance, currency) {
    try {
      const wallet = new Wallet({ userId, balance: initialBalance, currency });
      const createdWallet = await wallet.save();
      return createdWallet;
    } catch (error) {
      throw new Error(`Failed to create wallet: ${error.message}`);
    }
  }

  /**
   * Retrieve the wallet for a specific user.
   * @param {string} userId - The ID of the user associated with the wallet.
   * @returns {Promise<Wallet>} The retrieved wallet.
   * @throws {Error} If there is an error retrieving the wallet.
   */
  static async getWallet(userId) {
    try {
      const wallet = await Wallet.findOne({ userId }).exec();
      return wallet;
    } catch (error) {
      throw new Error(`Failed to retrieve wallet: ${error.message}`);
    }
  }

  /**
   * Update the wallet for a specific user.
   * @param {string} userId - The ID of the user associated with the wallet.
   * @param {object} updates - The updates to be applied to the wallet.
   * @returns {Promise<Wallet>} The updated wallet.
   * @throws {Error} If there is an error updating the wallet.
   */
  static async updateWallet(userId, updates) {
    try {
      const options = { new: true, upsert: true };
      const wallet = await Wallet.findOneAndUpdate({ userId }, updates, options).exec();
      return wallet;
    } catch (error) {
      throw new Error(`Failed to update wallet: ${error.message}`);
    }
  }

  /**
   * Add funds to a user's wallet.
   * @param {string} userId - The ID of the user associated with the wallet.
   * @param {number} amount - The amount of funds to be added.
   * @returns {Promise<Wallet>} The updated wallet.
   * @throws {Error} If there is an error adding funds to the wallet.
   */
  static async addFunds(userId, amount) {
    try {
      const wallet = await Wallet.findOne({ userId }).exec();
      if (!wallet) {
        throw new Error('Wallet not found');
      }
      const updatedBalance = math.add(wallet.balance, amount);
      wallet.balance = updatedBalance;
      await wallet.save();

      // Add transaction record
      await Transaction.addTransaction(wallet._id, "top-up", amount);

      return wallet;
    } catch (error) {
      throw new Error(`Failed to add funds to wallet: ${error.message}`);
    }
  }

  /**
   * Deduct funds from a user's wallet.
   * @param {string} userId - The ID of the user associated with the wallet.
   * @param {number} amount - The amount of funds to be deducted.
   * @returns {Promise<Wallet>} The updated wallet.
   * @throws {Error} If there is an error deducting funds from the wallet.
   */
  static async deductFunds(userId, amount) {
    try {
      const wallet = await Wallet.findOne({ userId }).exec();
      if (!wallet) {
        throw new Error('Wallet not found');
      }
      if (math.smaller(amount, 0)) {
        throw new Error('Invalid amount');
      }
      if (math.smaller(wallet.balance, amount)) {
        throw new Error('Insufficient funds');
      }
      const updatedBalance = math.subtract(wallet.balance, amount);
      wallet.balance = updatedBalance;
      await wallet.save();

      // Add transaction record
      await Transaction.addTransaction(wallet._id, "debit", amount);

      return wallet;
    } catch (error) {
      throw new Error(`Failed to deduct funds from wallet: ${error.message}`);
    }
  }

  /**
   * Retrieve the transaction history for a user's wallet.
   * @param {string} userId - The ID of the user associated with the wallet.
   * @param {number} [page=1] - The page number of the transaction history.
   * @param {number} [limit=10] - The maximum number of transactions per page.
   * @param {string} [sort="asc"] - The sort order of the transactions ("asc" or "desc").
   * @returns {Promise<TransactionHistory[]>} The transaction history.
   * @throws {Error} If there is an error retrieving the transaction history.
   */
  static async getTransactionHistory(userId, page = 1, limit = 10, sort = "asc") {
    try {
      sort = (sort === "asc") ? -1 : 1;

      const wallet = await Wallet.findOne({ userId }).exec();
      if (!wallet) {
        throw new Error('Wallet not found');
      }

      // Calculate the skip value based on the current page and limit
      const skip = (page - 1) * limit;

      // Fetch the transaction history associated with the wallet
      const transactionHistory = await TransactionHistory.find({ walletId: wallet._id })
        .sort({ date: sort })
        .skip(skip)
        .limit(limit)
        .exec();

      return transactionHistory;
    } catch (error) {
      throw new Error(`Failed to retrieve transaction history: ${error.message}`);
    }
  }

  /**
   * Retrieve the balance of a user's wallet.
   * @param {string} userId - The ID of the user associated with the wallet.
   * @returns {Promise<number>} The wallet balance.
   * @throws {Error} If there is an error retrieving the wallet balance.
   */
  static async getWalletBalance(userId) {
    try {
      const wallet = await Wallet.findOne({ userId }).exec();
      if (!wallet) {
        throw new Error('Wallet not found');
      }
      return wallet.balance;
    } catch (error) {
      throw new Error(`Failed to retrieve wallet balance: ${error.message}`);
    }
  }
}

/**
 * Utility class for managing transaction operations.
 */
class Transaction {
  /**
   * Fetch the transaction history for a specific wallet.
   * @param {string} walletId - The ID of the wallet associated with the transactions.
   * @returns {Promise<TransactionHistory[]>} The fetched transaction history.
   * @throws {Error} If there is an error fetching the transaction history.
   */
  static async fetchTransactionHistory(walletId) {
    try {
      const transactionHistory = await TransactionHistory.find({ walletId }).exec();
      return transactionHistory;
    } catch (error) {
      throw new Error(`Failed to fetch transaction history: ${error.message}`);
    }
  }

  /**
   * Add a transaction record to the transaction history.
   * @param {string} walletId - The ID of the wallet associated with the transaction.
   * @param {string} transactionType - The type of the transaction.
   * @param {number} amount - The amount involved in the transaction.
   * @returns {Promise<TransactionHistory>} The added transaction record.
   * @throws {Error} If there is an error adding the transaction record.
   */
  static async addTransaction(walletId, transactionType, amount) {
    try {
      const transaction = new TransactionHistory({
        walletId,
        transactionType,
        amount,
      });

      const newTransaction = await transaction.save();
      return newTransaction;
    } catch (error) {
      throw new Error(`Failed to add transaction history: ${error.message}`);
    }
  }
}

module.exports = WalletRepository;
