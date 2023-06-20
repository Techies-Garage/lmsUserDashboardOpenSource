const mongoose = require('mongoose');

/**
 * @typedef {import('mongoose').Schema} MongooseSchema
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model<PreferenceDocument>} PreferenceModel
 * @typedef {import('mongoose').Document} MongooseDocument
 */

/**
 * @typedef {object} PreferenceDocument
 * @property {ObjectId} userId - User ID.
 * @property {object} general - General preferences.
 * @property {string} general.language - Language preference.
 * @property {string} general.theme - Theme preference.
 * @property {boolean} general.notifications - Notification preference.
 * @property {object} privacy - Privacy preferences.
 * @property {boolean} privacy.analytics - Analytics preference.
 * @property {boolean} privacy.targetedAds - Targeted ads preference.
 * @property {object} communication - Communication preferences.
 * @property {boolean} communication.emailNotifications - Email notification preference.
 * @property {boolean} communication.pushNotifications - Push notification preference.
 */

/**
 * Mongoose schema for categorized preferences.
 *
 * @type {MongooseSchema}
 */
const categorizedPreferencesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  general: {
    language: { type: String, default: 'English' },
    theme: { type: String, default: 'Light' },
    notifications: { type: Boolean, default: true }
  },
  privacy: {
    analytics: { type: Boolean, default: true },
    targetedAds: { type: Boolean, default: false }
  },
  communication: {
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: false }
  }
});

/**
 * Mongoose model for the Preference.
 *
 * @class Preference
 * @type {PreferenceModel}
 */
const Preference = mongoose.model('Preference', categorizedPreferencesSchema);

module.exports = Preference;
