/**
 * Module dependencies.
 */
const enrollmentRoute = require('express').Router();
const { EnrollmentController } = require('./controller'); // controllers
const { schemaValidator } = require('../../middleware/schemaValidator'); // schema validator middleware

const { courseInputSchema, lessonInputSchema } = require('./schema'); // validation schema

// validations & permissions middleware
const { UserValidator } = require('../../middleware/UserValidator'); // user validation middleware
const { UserPermissions } = require('../../middleware/UserPermissions'); // user permissions middleware
const { CourseOwner } = require('../../middleware/CourseOwner'); // user owner middleware

/**
 * @route GET /enrollment
 * @description Get a list of enrollments.
 * @middleware UserValidator - Validates the user before accessing enrollments.
 * @controller EnrollmentController.enrollments - Retrieves a list of enrollments.
 */
enrollmentRoute.get('/enrollment', UserValidator(), EnrollmentController.enrollments);

/**
 * @route POST /enrollment
 * @description Enroll in a course or lesson.
 * @middleware UserValidator - Validates the user before enrolling.
 * @controller EnrollmentController.enroll - Enrolls the user in a course or lesson.
 */
enrollmentRoute.post('/enrollment', UserValidator(), EnrollmentController.enroll);

/**
 * @route DELETE /enrollment
 * @description Delete an enrollment.
 * @middleware UserValidator - Validates the user before deleting an enrollment.
 * @controller EnrollmentController.delete - Deletes the enrollment.
 */
enrollmentRoute.delete('/enrollment', UserValidator(), EnrollmentController.delete);

module.exports = enrollmentRoute;
