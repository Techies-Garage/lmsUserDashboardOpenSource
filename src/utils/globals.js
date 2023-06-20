/**
 * Import required modules and setup global variables.
 */

/**
 * @typedef {Object} ResponseObject
 * @property {Function} success - Success response function.
 * @property {Function} error - Error response function.
 */

const { success, error } = require('./response');

// services
const Email = require('../services/email');
const Payment = require('../services/payment');
const Tracker = require('../services/tracker');

/**
 * Global Emitters.
 *
 * @global
 * @type {Object}
 * @property {UserEvents} UserEvents - User events emitter.
 * @property {PermissionEvents} PermissionEvents - Permission events emitter.
 * @property {CourseEvents} CourseEvents - Course events emitter.
 * @property {PreferenceEvents} PreferenceEvents - Preference events emitter.
 */

// events
const Events = require('../events');

global.Events = Events

/**
 * Global logging function.
 *
 * @global
 * @type {Function}
 */
global.log = console.log;

/**
 * Available services.
 *
 * @global
 * @type {Object}
 * @property {Email} Email - Email service.
 * @property {Payment} Payment - Payment service.
 */
global.Services = { Email, Payment };

/**
 * Response objects.
 *
 * @global
 * @type {ResponseObject}
 * @property {Function} success - Success response function.
 * @property {Function} error - Error response function.
 */
global.Response = { success, error };

/**
 * Honeybadger for error tracking and logging.
 *
 * @global
 * @param {string} message - Error message to notify.
 */
global.Notify = function(message) {
  Honeybadger.notify(message);
};

global.Tracker = Tracker
