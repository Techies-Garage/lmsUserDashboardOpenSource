/**
 * Module dependencies.
 */
const permissionRoute = require('express').Router();

const { PermissionController } = require('./controller'); // controllers
const { schemaValidator } = require('../../middleware/schemaValidator'); // schema validator middleware

// validations & permissions middleware
const { UserValidator } = require('../../middleware/UserValidator'); // user validation middleware
const { UserPermissions } = require('../../middleware/UserPermissions'); // user permissions middleware

/**
 * Route to get the permission.
 *
 * @name GET /permission
 * @function
 * @memberof permissionRoute
 * @inner
 * @param {Function} UserValidator - User validation middleware.
 * @param {Function} PermissionController.getPermission - Controller function to get the permission.
 */
permissionRoute.get('/permission', UserValidator(), PermissionController.getPermission);

/**
 * Route to create a permission.
 *
 * @name POST /permission
 * @function
 * @memberof permissionRoute
 * @inner
 * @param {Function} UserValidator - User validation middleware.
 * @param {Function} PermissionController.createPermission - Controller function to create a permission.
 */
permissionRoute.post('/permission', UserValidator(), PermissionController.createPermission);

/**
 * Route to update a permission.
 *
 * @name PATCH /permission
 * @function
 * @memberof permissionRoute
 * @inner
 * @param {Function} UserValidator - User validation middleware.
 * @param {Function} PermissionController.updatePermission - Controller function to update a permission.
 */
permissionRoute.patch('/permission', UserValidator(), PermissionController.updatePermission);

/**
 * Route to delete a permission.
 *
 * @name DELETE /permission
 * @function
 * @memberof permissionRoute
 * @inner
 * @param {Function} UserValidator - User validation middleware.
 * @param {Function} PermissionController.deletePermission - Controller function to delete a permission.
 */
permissionRoute.delete('/permission', UserValidator(), PermissionController.deletePermission);

module.exports = permissionRoute;
