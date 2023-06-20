const PreferenceModel = require('./model');

/**
 * Controller class for handling preference-related operations.
 */
class PreferenceController {
  /**
   * Create a new preference for a user.
   * @param {import('express').Request} req - The Express request object.
   * @param {import('express').Response} res - The Express response object.
   */
  static async createPreference(req, res) {
    try {
      const preference = await PreferenceModel.createPreference(req.user.id, req.body);
      Response.success(res, "Created", preference, 201);
    } catch (error) {
      Response.error(res, "Error creating preference data");
    }
  }

  /**
   * Get the preference for a user.
   * @param {import('express').Request} req - The Express request object.
   * @param {import('express').Response} res - The Express response object.
   */
  static async getPreference(req, res) {
    try {
      const preference = await PreferenceModel.getPreference(req.user.id);
      Response.success(res, "Success", preference, 201);
    } catch (error) {
      Response.error(res, "Error retrieving user preference");
    }
  }

  /**
   * Update the preference for a user.
   * @param {import('express').Request} req - The Express request object.
   * @param {import('express').Response} res - The Express response object.
   */
  static async updatePreference(req, res) {
    try {
      const updatedPreference = await PreferenceModel.updatePreference(req.user.id, req.body)
      Response.success(res, "Updated", updatedPreference, 200);
    } catch (error) {
      Response.error(res, "Failed to update preference");
    }
  }

  /**
   * Delete the preference for a user.
   * @param {import('express').Request} req - The Express request object.
   * @param {import('express').Response} res - The Express response object.
   */
  static async deletePreference(req, res) {
    try {
      await PreferenceModel.deletePreference(req.user.id);
      Response.success(res, "Deleted", [], 200);
    } catch (error) {
      Response.error(res, "Failed to delete preference");
    }
  }
}

module.exports = { PreferenceController };
