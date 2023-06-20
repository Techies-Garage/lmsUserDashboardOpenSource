const CourseRepository = require("./repository");

/**
 * CourseModel class representing the business logic for courses.
 */
class CourseModel {
  /**
   * Create a new course with the course Data passed in.
   *
   * @param {number} course Data - Course Object.
   * @returns {Promise<Course>} - A new course object.
   * @throws {Error} - If there's an error creating the course.
   */
  static async createCourse(courseData) {
    try {
      return await CourseRepository.createCourse(courseData);
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Get courses with pagination and sorting options.
   *
   * @param {number} page - Page number.
   * @param {number} limit - Number of courses per page.
   * @param {Object} sortOptions - Sorting options for courses.
   * @returns {Promise<Array<Course>>} - Array of courses.
   * @throws {Error} - If there's an error retrieving the courses.
   */
  static async courses(page, limit, sortOptions) {
    try {
      return await CourseRepository.getCourses(page, limit, sortOptions);
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Get a course by its ID.
   *
   * @param {string} courseId - ID of the course.
   * @returns {Promise<Course>} - The course.
   * @throws {Error} - If the course is not found.
   */
  static async course(courseId) {
    try {
      return await CourseRepository.getCourseById(courseId);
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Update a course by its ID.
   *
   * @param {string} courseId - ID of the course to update.
   * @param {Object} body - Updated data for the course.
   * @returns {Promise<Course>} - The updated course.
   * @throws {Error} - If there's an error updating the course.
   */
  static async update(courseId, body) {
    try {
      return await CourseRepository.updateCourse(courseId, body);
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Add a lesson to a course.
   *
   * @param {string} courseId - ID of the course.
   * @param {Object} lessonData - Data for the new lesson.
   * @returns {Promise<Course>} - The updated course.
   * @throws {Error} - If there's an error adding the lesson or the course is not found.
   */
  static async addLesson(courseId, lessonData) {
    try {
      return await CourseRepository.addLessonToCourse(courseId, lessonData);
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Update a lesson within a course.
   *
   * @param {string} courseId - ID of the course.
   * @param {string} lessonId - ID of the lesson to update.
   * @param {Object} lessonData - Updated data for the lesson.
   * @returns {Promise<Course>} - The updated course.
   * @throws {Error} - If there's an error updating the lesson or the course/lesson is not found.
   */
  static async updateLesson(courseId, lessonId, lessonData) {
    try {
      return await CourseRepository.updateLesson(courseId, lessonId, lessonData);
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Delete a lesson from a course.
   *
   * @param {string} courseId - ID of the course.
   * @param {string} lessonId - ID of the lesson to delete.
   * @returns {Promise<void>}
   * @throws {Error} - If there's an error deleting the lesson or the course/lesson is not found.
   */
  static async deleteLesson(courseId, lessonId) {
    try {
      return await CourseRepository.deleteLesson(courseId, lessonId);
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = CourseModel;
