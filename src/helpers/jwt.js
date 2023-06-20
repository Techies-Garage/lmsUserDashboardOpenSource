const jwt = require('jsonwebtoken');

/**
 * Secret key used for JWT token generation and verification.
 * @type {string}
 */
const SECRETKEY = process.env.APP_SECRET_KEY;

/**
 * Generate a JWT token with the provided payload.
 *
 * @param {Object} payload - Payload to be included in the token.
 * @returns {string} - Generated JWT token.
 */
const generateJwt = function(payload) {
  const expiresIn = '7d'; // Set the expiration time, e.g., 1 hour
  return jwt.sign(payload, SECRETKEY, { expiresIn });
}

/**
 * Verify the authenticity of a JWT token.
 *
 * @param {string} token - JWT token to verify.
 * @returns {Object} - Decoded payload if the token is valid.
 * @throws {Error} - If the token is invalid or has expired.
 */
const verifyJwt = function(token) {
  return jwt.verify(token, SECRETKEY);
}

/**
 * Decode a JWT token without verifying its authenticity.
 *
 * @param {string} token - JWT token to decode.
 * @returns {Object|null} - Decoded payload if the token is valid, null if the token is invalid.
 */
const decode = function(token) {
  return jwt.decode(token, SECRETKEY, (err, decoded) => {
    if (err) {
      throw err.message;
    }
  });
}

module.exports = {
  generateJwt,
  verifyJwt,
  decode
}
