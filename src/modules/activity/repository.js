const { UserActivity } = require('./schema');

class UserActivityRepository {
  static async createUserActivity(userId, activityData) {
    try {
      const userActivity = new UserActivity({
        userId: userId,
        activity: activityData
      });
      const savedActivity = await userActivity.save();
      return savedActivity;
    } catch (error) {
      throw new Error('Failed to create user activity');
    }
  }

  static async getUserActivities(userId) {
    try {
      const activities = await UserActivity.find({ userId: userId });
      return activities;
    } catch (error) {
      throw new Error('Failed to retrieve user activities');
    }
  }

}

module.exports = UserActivityRepository;
