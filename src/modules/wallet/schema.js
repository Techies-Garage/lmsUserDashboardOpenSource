const mongoose = require('mongoose');

/**
 * @typedef {import('mongoose').Schema} MongooseSchema
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model<WalletDocument>} WalletModel
 * @typedef {import('mongoose').Document} MongooseDocument
 */

/**
 * @typedef {object} WalletDocument
 * @property {ObjectId} walletId - Wallet ID.
 * @property {ObjectId} userId - User ID.
 * @property {number} balance - Wallet balance.
 * @property {string} currency - Currency code (e.g., USD, EUR).
 * @property {Date} createdAt - Wallet creation timestamp.
 * @property {Date} updatedAt - Wallet update timestamp.
 */

/**
 * Mongoose schema for wallet.
 *
 * @type {MongooseSchema}
 */
const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  balance: { type: Number, default: 0 },
  currency: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

/**
 * Mongoose model for wallet.
 *
 * @class Wallet
 * @type {WalletModel}
 */
const Wallet = mongoose.model('Wallet', walletSchema);


const transactionHistorySchema = new mongoose.Schema({
  walletId: { type: mongoose.Schema.Types.ObjectId, required: true },
  transactionType: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  // Other transaction-related fields you may need
});

const TransactionHistory = mongoose.model('TransactionHistory', transactionHistorySchema);

module.exports = {
  Wallet,
  TransactionHistory
}
