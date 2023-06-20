const { Course, Lesson } = require("./schema");

/**
 * Repository class for performing database operations related to courses.
 */
class CourseRepository {
  /**
     * Create a new course.
     *
     * @param {Object} courseData - Data for the new course.
     * @returns {Promise<Course>} - The created course.
     * @throws {Error} - If there's an error creating the course.
     */
  static async createCourse(courseData) {
    try {
      return await Course.create(courseData);
    } catch (error) {
      throw Error("Could not create a new course");
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
  static async getCourses(page, limit, sortOptions) {
    try {
      return await Course.find()
        .select('-lessons.videoUrl') // Exclude the 'videoUrl' field in lessons
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sortOptions)
        .exec();
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
  static async getCourseById(courseId) {
    const course = await Course.findById(courseId).exec();
    if (!course) {
      const error = new Error("Course not found");
      error.statusCode = 404;
      throw error;
    }
    return course;
  }

  /**
   * Update a course by its ID.
   *
   * @param {string} courseId - ID of the course to update.
   * @param {Object} data - Updated data for the course.
   * @returns {Promise<Course>} - The updated course.
   * @throws {Error} - If there's an error updating the course.
   */
  static async updateCourse(courseId, data) {
    try {
      return await Course.findByIdAndUpdate(courseId, data, {
        new: true,
        upsert: true,
      }).exec();
    } catch (error) {
      throw Error("Error updating course");
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
  static async addLessonToCourse(courseId, lessonData) {
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
      }
      course.lessons.push(lessonData);
      await course.save();
      return course;
    } catch (error) {
      throw Error("Could not add new lesson");
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
    const updatedLessonData = { ...lessonData, _id: lessonId };
    return Course.findOneAndUpdate(
      { _id: courseId, "lessons._id": lessonId },
      { $set: { "lessons.$": updatedLessonData } },
      { new: true }
    )
      .then((course) => {
        if (!course) {
          const error = new Error("Course or lesson not found");
          error.statusCode = 404;
          throw error;
        }
        return course;
      })
      .catch((error) => {
        throw Error(error.message);
      });
  }

  /**
   * Delete a lesson from a course.
   *
   * @param {string} courseId - ID of the course.
   * @param {string} lessonId - ID of the lesson to delete.
   * @throws {Error} - If there's an error deleting the lesson or the course/lesson is not found.
   */
  static async deleteLesson(courseId, lessonId) {
    try {
      const course = await Course.findById(courseId);

      if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
      }

      const lesson = course.lessons.find(
        (lesson) => lesson._id.toString() === lessonId
      );

      if (!lesson) {
        const error = new Error("Lesson not found");
        error.statusCode = 404;
        throw error;
      }

      course.lessons.pull(lessonId);
      await course.save();
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = CourseRepository;
