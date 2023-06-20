const EnrollmentModel = require('./model');

/**
 * Controller for handling enrollment operations.
 */
class EnrollmentController {
  /**
   * Retrieve enrollments for a user.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  static async enrollments(req, res) {
    try {
      const userId = req.user.id;
      const enrollments = await EnrollmentModel.enrollments(userId);
      enrollments
        ? Response.success(res, "My enrollments", enrollments)
        : Response.error(res, "You don't have any enrollment", 404);
    } catch (error) {
      Response.error(res, "Error retrieving enrollments");
    }
  }

  /**
   * Enroll a user in a course.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  static async enroll(req, res) {
    try {
      const enrollmentObject = { userId: req.user.id, courseId: req.body.courseId };
      const response = await EnrollmentModel.enroll(enrollmentObject);
      Response.success(res, "Successful", response, 201)
    } catch (error) {
      Response.error(res, error.message);
    }
  }

  /**
   * Delete a user's enrollment from a course.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  static async delete(req, res) {
    try {
      await EnrollmentModel.delete(req.user.id, req.body.courseId);
      Response.success(res, "Deleted", 200);
    } catch (error) {
      Response.error(res, error.message);
    }
  }
}

module.exports = {
  EnrollmentController
};
