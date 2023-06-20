const mongoose = require('mongoose');
const Joi = require('joi');

/**
 * Mongoose schema for permission.
 *
 * @typedef {import('mongoose').Schema} MongooseSchema
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model<PermissionDocument>} PermissionModel
 * @typedef {import('mongoose').Document} MongooseDocument
 */

/**
 * @typedef {object} PermissionDocument
 * @property {ObjectId} userId - User ID.
 * @property {string} email - User email.
 * @property {PermissionModules} permissions - User permissions.
 */

/**
 * @typedef {object} PermissionModules
 * @property {object[]} permissions - Permissions modules as objects with properties.
 * ...
 */

/**
 * Mongoose schema for permission.
 *
 * @type {MongooseSchema}
 */
const permissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  email: { type: String, required: true, unique: true },
  permissions: {
    course: [{ type: String, enum: ['read', 'write', 'update', 'delete'] }],
    // Add more modules and their permissions as needed
  },
});

/**
 * Mongoose model for permission.
 *
 * @class Permission
 * @type {PermissionModel}
 */
const Permission = mongoose.model('Permission', permissionSchema);

/**
 * Joi input schema for permission.
 *
 * @constant {Joi.ObjectSchema}
 */
const permissionInputSchema = Joi.object({
  permissions: Joi.object(),
});

module.exports = {
  Permission,
  permissionInputSchema,
};
