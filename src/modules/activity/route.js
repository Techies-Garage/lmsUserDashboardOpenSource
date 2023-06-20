/**
 * Express Router for user activity routes.
 * @module routes/userActivityRoute
 */

const userActivityRoute = require('express').Router();

const { UserActivityController } = require('./controller'); // Controllers
const { schemaValidator } = require('../../middleware/schemaValidator'); // Schema validator middleware

const { userActivityValidationSchema } = require('./schema'); // Validation schema

// Validations & permissions middleware
const { UserValidator } = require('../../middleware/UserValidator'); // User validation middleware
const { UserPermissions } = require('../../middleware/UserPermissions'); // User permissions middleware

/**
 * Fetch user activities.
 * @name GET /activities
 * @function
 * @memberof module:routes/userActivityRoute
 * @inner
 * @param {function} UserValidator - Middleware for user validation.
 * @param {function} UserActivityController.fetchActivities - Controller function for fetching activities.
 */
userActivityRoute.get('/activities', UserValidator(), UserActivityController.fetchActivities);

module.exports = userActivityRoute;
