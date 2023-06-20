/**
 * Express Router for payment routes.
 * @type {import('express').Router}
 */
const paymentRoute = require('express').Router();

// Payment controller
const { PaymentController } = require('./controller');

// Schema validator middleware
const { schemaValidator } = require('../../middleware/schemaValidator');

// User validation middleware
const { UserValidator } = require('../../middleware/UserValidator');

// User permissions middleware
const { UserPermissions } = require('../../middleware/UserPermissions');

/**
 * Route for charging via Paystack.
 * @name POST /paystack/charge
 * @memberof paymentRoute
 * @inner
 * @param {function} UserValidator - Middleware for user validation.
 * @param {function} PaymentController.charge - Controller method for charging.
 * @returns {undefined}
 */
paymentRoute.post('/paystack/charge', UserValidator(), PaymentController.charge);

module.exports = paymentRoute;
