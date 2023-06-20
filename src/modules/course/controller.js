const CourseModel = require('./model');

/**
 * Controller for managing courses.
 */
class CourseController {
  /**
   * Create a new course.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} A Promise that resolves when the response is sent.
   */
  static async create(req, res) {
    try {
      let newCourse = req.body
      newCourse.userId = req.user.id
      const course = await CourseModel.createCourse(newCourse);

      // -----------------------------------------
      // track activity
      req.activity.event = "course-creation"
      req.activity.status = true
      log(req.activity)
      Tracker.track(req.user.id, req.activity)
      // -----------------------------------------


      Response.success(res, "New Course", course, 201);

    } catch (error) {
      Response.error(res, error.message, error.statusCode);
    }
  }

  /**
   * Get a paginated list of courses.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} A Promise that resolves when the response is sent.
   */
  static async courses(req, res) {
    const { page = 1, limit = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;
    try {
      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // calling the model
      const courses = await CourseModel.courses(page, limit, sortOptions);
      Response.success(res, "All courses", courses);
    } catch (error) {
      Response.error(res, "Error retrieving courses");
    }
  }

  /**
   * Get a course by its ID.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} A Promise that resolves when the response is sent.
   */
  static async course(req, res) {
    const { courseId } = req.params;
    try {
      const course = await CourseModel.course(courseId);
      Response.success(res, "Course data", course);
    } catch (error) {
      Response.error(res, "Error retrieving course");
    }
  }

  /**
   * Update a course by its ID.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} A Promise that resolves when the response is sent.
   */
  static async update(req, res) {
    const { courseId } = req.params;
    try {
      const course = await CourseModel.update(courseId, req.body);
      Response.success(res, "Course Updated", course);
    } catch (error) {
      Response.error(res, "Error updating course");
    }
  }

  /**
   * Delete a course by its ID.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} A Promise that resolves when the response is sent.
   */
  static async delete(req, res) {
    const { courseId } = req.params;
    try {
      await Course.findByIdAndDelete(courseId).exec();
      Response.success(res, "Course Deleted", {}, 204);
    } catch (error) {
      Response.error(res, "Error deleting course");
    }
  }

  /**
   * Add a lesson to a course.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} A Promise that resolves when the response is sent.
   */
  static async addLesson(req, res) {
    try {
      const { courseId } = req.params;
      const course = await CourseModel.addLesson(courseId, req.body);
      Response.success(res, "Lesson added to course", course);
    } catch (error) {
      Response.error(res, error.message);
    }
  }

  /**
   * Update a lesson within a course.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} A Promise that resolves when the response is sent.
   */
  static async updateLesson(req, res) {
    try {
      const { courseId, lessonId } = req.params;
      const lessonData = req.body;
      const course = await CourseModel.updateLesson(courseId, lessonId, lessonData);
      Response.success(res, "Lesson updated", course);
    } catch (error) {
      Response.error(res, error.message);
    }
  }

  /**
   * Delete a lesson from a course.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} A Promise that resolves when the response is sent.
   */
  static async deleteLesson(req, res) {
    const { courseId, lessonId } = req.params;
    try {
      await CourseModel.deleteLesson(courseId, lessonId);
      Response.success(res, "Lesson deleted", {}, 204);
    } catch (error) {
      Response.error(res, error.message);
    }
  }
}

module.exports = {
  CourseController
};
