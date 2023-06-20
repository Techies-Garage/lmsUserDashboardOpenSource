/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Joi = require('joi');

/**
 * User Activity Schema
 */

/**
 * @typedef {import('mongoose').Model} Model
 * @typedef {import('mongoose').Schema} Schema
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 */

/**
 * @typedef {import('mongoose').Document} UserActivityDocument
 * @property {ObjectId} userId - The user's unique identifier.
 * @property {Date} timestamp - The date and time of the activity.
 * @property {string} event - The specific event or action that occurred.
 * @property {string} screen - The screen or page where the activity took place.
 * @property {string} deviceInfo - Information about the user's device.
 * @property {string} appVersion - The version of the app used.
 * @property {string} location - The geographical location of the user.
 * @property {string[]} interactions - An array of user interactions during the activity.
 * @property {boolean} conversion - Indicates if the activity resulted in a conversion or not.
 * @property {string} error - Any encountered errors or exceptions.
 * @property {string} referralSource - The source that referred the user.
 * @property {object} userPreferences - User-specific preferences or settings.
 * @property {object} sessionInfo - Information about the user's session.
 * @property {Date} sessionInfo.startTime - The start time of the session.
 * @property {Date} sessionInfo.endTime - The end time of the session.
 * @property {number} sessionInfo.duration - The duration of the session.
 * @property {object} engagementMetrics - Metrics related to user engagement.
 * @property {number} engagementMetrics.timeSpent - Time spent by the user.
 * @property {number} engagementMetrics.frequency - Frequency of app usage.
 * @property {object} engagementMetrics.featureUsage - Specific feature usage.
 */

/**
 * @type {Schema<UserActivityDocument>}
 */
const userActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activity: { type: Object }
});

/**
 * User Activity Model
 * @type {Model<UserActivityDocument>}
 */
const UserActivity = mongoose.model('UserActivity', userActivitySchema);

module.exports = {
  UserActivity
};
