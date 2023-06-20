const { WalletController } = require('./controller'); // controllers
const { schemaValidator } = require('../../middleware/schemaValidator'); // schema validator middleware

// validations & permissions middleware
const { UserValidator } = require('../../middleware/UserValidator'); // user validation middleware
const { UserPermissions } = require('../../middleware/UserPermissions'); // user permissions middleware

/**
 * Express router for preference routes.
 *
 * @type {import('express').Router}
 */
const walletRoute = require('express').Router();

// Create a wallet
/**
 * @route POST /wallet
 * @group Wallet
 * @summary Create a wallet
 * @security UserValidator
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void}
 */
walletRoute.post('/wallet', UserValidator(), WalletController.createWallet);

// Get user's wallet
/**
 * @route GET /wallet
 * @group Wallet
 * @summary Get user's wallet
 * @security UserValidator
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void}
 */
walletRoute.get('/wallet', UserValidator(), WalletController.getWallet);

// Update user's wallet
/**
 * @route PATCH /wallet
 * @group Wallet
 * @summary Update user's wallet
 * @security UserValidator
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void}
 */
walletRoute.patch('/wallet', UserValidator(), WalletController.updateWallet);

// Add funds to user's wallet
/**
 * @route POST /wallet/funds
 * @group Wallet
 * @summary Add funds to user's wallet
 * @security UserValidator
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void}
 */
walletRoute.post('/wallet/funds', UserValidator(), WalletController.addFunds);

// Deduct funds from user's wallet
/**
 * @route POST /wallet/deduct
 * @group Wallet
 * @summary Deduct funds from user's wallet
 * @security UserValidator
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void}
 */
walletRoute.post('/wallet/deduct', UserValidator(), WalletController.deductFunds);

// Get user's transaction history
/**
 * @route GET /wallet/transactions
 * @group Wallet
 * @summary Get user's transaction history
 * @security UserValidator
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void}
 */
walletRoute.get('/wallet/transactions', UserValidator(), WalletController.getTransactionHistory);

// Get user's wallet balance
/**
 * @route GET /wallet/balance
 * @group Wallet
 * @summary Get user's wallet balance
 * @security UserValidator
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {void}
 */
walletRoute.get('/wallet/balance', UserValidator(), WalletController.getWalletBalance);

module.exports = walletRoute;
