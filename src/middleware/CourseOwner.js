const { decode } = require("../helpers/jwt");

/**
 * Decode the user token and retrieve the email.
 *
 * @param {string} authHeader - Authorization header containing the token.
 * @returns {Promise<string>} - The decoded email.
 * @throws {Error} - If authorization parameters are not passed.
 */
const decodedUserToken = async (authHeader) => {
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Collect & decode jwt
    const token = authHeader.split(' ')[1];
    const decoded = decode(token);
    return decoded.email;
  } else {
    const error = new Error("Authorization parameters not passed");
    error.statusCode = 401;
    throw error
  }
};

/**
 * Get the email of the course creator based on the courseId.
 *
 * @param {string} courseId - ID of the course.
 * @returns {Promise<string>} - The email of the course creator.
 * @throws {Error} - If the course is not found.
 */
const getCourseCreator = async (courseId) => {
  try {
    // Retrieve user permissions from the database
    let course = null;
    await new Promise((resolve, reject) => {
      Events.CourseEvents.emit('getCourse', courseId, (message) => {
        course = message;
        resolve();
      });
    });

    if (!course) {
      const error = new Error('Course was not found');
      error.statusCode = 404;
      throw error
    }

    // Access the email
    return course.email;
  } catch (error) {
    const err = new Error(error.message);
    error.statusCode = 404;
    throw err
  }
};

/**
 * Middleware to check if the authenticated user is the owner of the course.
 *
 * @param {Array<string>} permissions - User permissions.
 * @returns {Function} - Express middleware function.
 */
const CourseOwner = (permissions) => {
  return async function(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const { courseId } = req.params;
      const email = await decodedUserToken(authHeader);
      const courseCreator = await getCourseCreator(courseId);

      if (courseCreator !== email) {
        const error = new Error("You cannot perform this action");
        error.statusCode = 401;
        throw error
      }
      next();
    } catch (error) {
      Response.error(res, error.message);
    }
  };
};

module.exports = {
  CourseOwner
};
