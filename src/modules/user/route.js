/**
 * User routes for authentication and authorization.
 * @type {import('express').Router}
 */
const userRoute = require('express').Router();

const passport = require('passport');
const { UserController } = require('./controller'); // controllers
const { signupSchema } = require('./schema'); // validation schema

const { schemaValidator } = require('../../middleware/schemaValidator'); // middleware


/**
 * Route for Google authentication.
 * @name GET /auth/google
 * @function
 * @memberof userRoute
 * @param {string} path - The URL path.
 * @param {Function} middleware - Passport middleware for Google authentication.
 * @param {Array.<string>} scope - The scopes required for authentication.
 */
userRoute.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * Callback route for Google authentication.
 * @name GET /auth/google/callback
 * @function
 * @memberof userRoute
 * @param {string} path - The URL path.
 * @param {Function} middleware - Passport middleware for Google authentication.
 * @param {boolean} session - Flag indicating whether to use session.
 */
userRoute.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  UserController.auth
);

module.exports = userRoute;
