const UserActivityRepository = require("./repository");

/**
 * UserActivityModel represents the model for managing user activities.
 */
class UserActivityModel {
  /**
   * Retrieves user activities for a specific user.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<Array>} - A promise that resolves to an array of user activities.
   * @throws {Error} - If there was an error retrieving user activities.
   */
  static async get(userId) {
    try {
      return await UserActivityRepository.getUserActivities(userId);
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = UserActivityModel;
