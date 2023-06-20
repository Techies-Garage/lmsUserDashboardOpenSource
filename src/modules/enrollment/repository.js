const { Enrollment } = require("./schema");
const mongoose = require('mongoose');

/**
 * Repository class for handling enrollment operations.
 */
class EnrollmentRepository {
  /**
   * Creates or updates an enrollment for a user.
   * @param {string} userId - The user ID.
   * @param {string} courseId - The course ID.
   * @returns {Promise<object>} The updated or created enrollment.
   * @throws {Error} If there is an error creating or updating the enrollment.
   */
  static async createOrUpdateEnrollment(userId, courseId) {
    try {
      const parsedUserId = new mongoose.Types.ObjectId(userId);
      const parsedCourseId = new mongoose.Types.ObjectId(courseId);

      const existingEnrollment = await Enrollment.findOne({ userId: parsedUserId });
      if (existingEnrollment) {
        // Update existing enrollment
        if (!existingEnrollment.courses.includes(parsedCourseId)) {
          existingEnrollment.courses.push(parsedCourseId);
          const updatedEnrollment = await existingEnrollment.save();
          return updatedEnrollment;
        } else {
          throw new Error('Course already exists in enrollment');
        }
      } else {
        // Create new enrollment
        const enrollment = new Enrollment({ userId: parsedUserId, courses: [parsedCourseId] });
        const savedEnrollment = await enrollment.save();
        return savedEnrollment;
      }
    } catch (error) {
      throw new Error(`Failed to create or update enrollment: ${error.message}`);
    }
  }

  /**
   * Deletes a course from a user's enrollment.
   * @param {string} userId - The user ID.
   * @param {string} courseId - The course ID.
   * @returns {Promise<object>} The updated enrollment after removing the course.
   * @throws {Error} If there is an error deleting the course from the enrollment.
   */
  static async deleteCourseFromEnrollment(userId, courseId) {
    try {
      const parsedUserId = new mongoose.Types.ObjectId(userId);
      const parsedCourseId = new mongoose.Types.ObjectId(courseId);

      const existingEnrollment = await Enrollment.findOne({ userId: parsedUserId });
      if (existingEnrollment) {
        const courses = existingEnrollment.courses;
        const courseIndex = courses.indexOf(parsedCourseId);
        if (courseIndex !== -1) {
          courses.splice(courseIndex, 1);
          await existingEnrollment.save();
          return existingEnrollment;
        } else {
          throw new Error('Course not found in enrollment');
        }
      } else {
        throw new Error('Enrollment not found');
      }
    } catch (error) {
      throw new Error(`Failed to delete course from enrollment: ${error.message}`);
    }
  }

  /**
   * Retrieves enrollments for a user by user ID.
   * @param {string} userId - The user ID.
   * @returns {Promise<object[]>} The list of enrollments for the user.
   * @throws {Error} If there is an error retrieving the enrollments.
   */
  static async getEnrollmentsByUserId(userId) {
    try {
      const parsedUserId = new mongoose.Types.ObjectId(userId);
      const enrollments = await Enrollment.find({ userId: parsedUserId }).populate('courses');
      return enrollments;
    } catch (error) {
      throw new Error(`Failed to get enrollments by user ID: ${error.message}`);
    }
  }
}

module.exports = EnrollmentRepository;
