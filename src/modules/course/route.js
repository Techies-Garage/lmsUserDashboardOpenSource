/**
 * Express Router for course-related routes.
 * @module courseRoute
 */

const courseRoute = require('express').Router();
const { CourseController } = require('./controller'); // controllers
const { courseInputSchema, lessonInputSchema } = require('./schema'); // validation schema

// validations & permissions middleware
const { schemaValidator } = require('../../middleware/schemaValidator'); // schema validator middleware
const { UserValidator } = require('../../middleware/UserValidator'); // user validation middleware
const { UserPermissions } = require('../../middleware/UserPermissions'); // user permissions middleware
const { CourseOwner } = require('../../middleware/CourseOwner'); // user owner middleware

const { UserActivity } = require('../../middleware/UserActivity'); // UserActivity middleware

/**
 * Get all courses.
 *
 * @name GET /courses
 * @function
 * @memberof module:courseRoute
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
courseRoute.get('/courses', CourseController.courses);

/**
 * Get a specific course by ID.
 *
 * @name GET /courses/:courseId
 * @function
 * @memberof module:courseRoute
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
courseRoute.get('/courses/:courseId', CourseController.course);

/**
 * Create a new course.
 *
 * @name POST /courses
 * @function
 * @memberof module:courseRoute
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
courseRoute.post(
  '/courses',
  schemaValidator(courseInputSchema),
  UserValidator(),
  UserPermissions(
    {
      course: ['update', 'delete'],
    }
  ),
  UserActivity,
  CourseController.create,
);

/**
 * Update a specific course by ID.
 *
 * @name PUT /courses/:courseId
 * @function
 * @memberof module:courseRoute
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
courseRoute.put(
  '/courses/:courseId',
  UserValidator(),
  CourseOwner(),
  CourseController.update
);

/**
 * Delete a specific course by ID.
 *
 * @name DELETE /courses/:courseId
 * @function
 * @memberof module:courseRoute
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
courseRoute.delete(
  '/courses/:courseId',
  UserValidator(),
  CourseOwner(),
  CourseController.delete
);

/**
 * Add a lesson to a course.
 *
 * @name POST /courses/:courseId/lessons
 * @function
 * @memberof module:courseRoute
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
courseRoute.post('/courses/:courseId/lessons',
  UserValidator(),
  CourseOwner(),
  CourseController.addLesson);

/**
 * Update a lesson within a course.
 *
 * @name PUT /courses/:courseId/lessons/:lessonId
 * @function
 * @memberof module:courseRoute
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
courseRoute.put(
  '/courses/:courseId/lessons/:lessonId',
  UserValidator(),
  CourseOwner(),
  CourseController.updateLesson
);

/**
 * Delete a lesson from a course.
 *
 * @name DELETE /courses/:courseId/lessons/:lessonId
 * @function
 * @memberof module:courseRoute
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
courseRoute.delete(
  '/courses/:courseId/lessons/:lessonId',
  UserValidator(),
  CourseOwner(),
  CourseController.deleteLesson
);

module.exports = courseRoute;
