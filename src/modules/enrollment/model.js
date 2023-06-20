const EnrollmentRepository = require("./repository");

/**
 * Represents the Enrollment model.
 */
class EnrollmentModel {
  /**
   * Retrieves enrollments for a given user.
   * @param {string} userId - The user ID.
   * @returns {Promise<Array>} - A promise that resolves to an array of enrollments.
   * @throws {Error} - If there's an error retrieving the enrollments.
   */
  static async enrollments(userId) {
    try {
      return await EnrollmentRepository.getEnrollmentsByUserId(userId);
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Enrolls a user in a course.
   * @param {Object} enrollmentObject - The enrollment object.
   * @param {string} enrollmentObject.userId - The user ID.
   * @param {string} enrollmentObject.courseId - The course ID.
   * @returns {Promise<Object>} - A promise that resolves to the enrollment object.
   * @throws {Error} - If there's an error enrolling the user.
   */
  static async enroll(enrollmentObject) {
    try {
      let { userId, courseId } = { ...enrollmentObject };
      let coursePrice = null
      await new Promise((resolve, reject) => {
        Events.CourseEvents.emit('checkPricing', courseId, (price) => {
          coursePrice = price
          resolve();
        });
      });

      if (coursePrice) {
        let paymentStatus = await this.processCoursePayment(coursePrice)
      }

      return await EnrollmentRepository.createOrUpdateEnrollment(userId, courseId);
    } catch (error) {
      throw Error(error.message);
    }
  }

  static async processCoursePayment(price) {
    let accountCredits = 60000
    if (accountCredits <= parseInt(price)) {
      throw new Error("You don't have enough credits to purchase this course")
    } else {
      return "You can successfully purchase this course"
    }
  }

  /**
   * Deletes a course from a user's enrollment.
   * @param {string} userId - The user ID.
   * @param {string} courseId - The course ID.
   * @returns {Promise} - A promise that resolves when the course is deleted from the enrollment.
   * @throws {Error} - If there's an error deleting the course from the enrollment.
   */
  static async delete(userId, courseId) {
    try {
      return await EnrollmentRepository.deleteCourseFromEnrollment(userId, courseId);
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = EnrollmentModel;
