const { PreferenceController } = require('./controller'); // controllers
const { schemaValidator } = require('../../middleware/schemaValidator'); // schema validator middleware

// validations & permissions middleware
const { UserValidator } = require('../../middleware/UserValidator'); // user validation middleware
const { UserPermissions } = require('../../middleware/UserPermissions'); // user permissions middleware

/**
 * Express router for preference routes.
 *
 * @type {import('express').Router}
 */
const preferenceRoute = require('express').Router();

/**
 * Create a new preference.
 *
 * @name POST /preference
 * @memberof preferenceRoute
 * @function
 * @inner
 * @param {Function} UserValidator - User validation middleware.
 * @param {Function} PreferenceController.createPreference - Create preference controller.
 * @returns {undefined}
 */
preferenceRoute.post('/preference', UserValidator(), PreferenceController.createPreference);

/**
 * Get preference.
 *
 * @name GET /preference
 * @memberof preferenceRoute
 * @function
 * @inner
 * @param {Function} UserValidator - User validation middleware.
 * @param {Function} PreferenceController.getPreference - Get preference controller.
 * @returns {undefined}
 */
preferenceRoute.get('/preference', UserValidator(), PreferenceController.getPreference);

/**
 * Update preference.
 *
 * @name PATCH /preference
 * @memberof preferenceRoute
 * @function
 * @inner
 * @param {Function} UserValidator - User validation middleware.
 * @param {Function} PreferenceController.updatePreference - Update preference controller.
 * @returns {undefined}
 */
preferenceRoute.patch('/preference', UserValidator(), PreferenceController.updatePreference);

/**
 * Delete preference.
 *
 * @name DELETE /preference
 * @memberof preferenceRoute
 * @function
 * @inner
 * @param {Function} UserValidator - User validation middleware.
 * @param {Function} PreferenceController.deletePreference - Delete preference controller.
 * @returns {undefined}
 */
preferenceRoute.delete('/preference', UserValidator(), PreferenceController.deletePreference);

module.exports = preferenceRoute;
