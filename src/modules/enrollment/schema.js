/**
 * Mongoose model representing a user's enrollment in courses.
 * @typedef {import('mongoose').Model} MongooseModel
 * @typedef {import('mongoose').Schema} MongooseSchema
 */

const mongoose = require('mongoose');

/**
 * Schema definition for user enrollments.
 * @type {MongooseSchema}
 */
const enrollmentSchema = new mongoose.Schema({
  /**
   * The ID of the user associated with the enrollment.
   * @type {import('mongoose').Schema.Types.ObjectId}
   * @required
   * @ref 'User'
   * @unique
   */
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },

  /**
   * An array of course IDs representing the courses the user is enrolled in.
   * @type {Array<import('mongoose').Schema.Types.ObjectId>}
   * @required
   * @ref 'Course'
   */
  courses: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' }]
});

/**
 * The Enrollment model.
 * @type {MongooseModel}
 */
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = {
  Enrollment
};
