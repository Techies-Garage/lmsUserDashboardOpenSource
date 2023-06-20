const mongoose = require('mongoose');

/**
 * User schema for storing user information.
 * @typedef {Object} UserSchema
 * @property {string} sub - The user's subject identifier.
 * @property {string} name - The user's name.
 * @property {string} given_name - The user's given name.
 * @property {string} family_name - The user's family name.
 * @property {string} picture - The URL of the user's picture.
 * @property {string} email - The user's email address.
 * @property {boolean} email_verified - Indicates if the user's email address is verified.
 * @property {string} locale - The user's locale.
 */

/**
 * Mongoose model for the User schema.
 * @type {import('mongoose').Model<UserSchema>}
 */
const User = mongoose.model('User', new mongoose.Schema({
  sub: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  given_name: {
    type: String
  },
  family_name: {
    type: String
  },
  picture: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  locale: {
    type: String
  }
}));

module.exports.User = User;
