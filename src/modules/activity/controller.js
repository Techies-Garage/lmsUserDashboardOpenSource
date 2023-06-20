const UserActivityModel = require('./model');

/**
 * UserActivityController handles CRUD operations for user activities.
 */
class UserActivityController {

  /**
   * Fetch user activities for a specific user.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  static async fetchActivities(req, res) {
    try {
      const userId = req.user.id;
      const activities = await UserActivityModel.get(userId);
      activities
        ? Response.success(res, "My activities", activities)
        : Response.error(res, "There are no activity records yet", 404);
    } catch (error) {
      Response.error(res, "Error retrieving activities");
    }
  }
}

module.exports = {
  UserActivityController,
};
