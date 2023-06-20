const PermissionModel = require('./model');

/**
 * Controller for handling permission operations.
 */
class PermissionController {
  /**
   * Creates a permission for the user.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  static async createPermission(req, res) {
    try {
      const userId = req.user.id;
      const permission = await PermissionModel.createPermission(userId);
      Response.success(res, "Created", permission, 201);
    } catch (error) {
      Response.error(res, "Error retrieving enrollments");
    }
  }

  /**
   * Retrieves the permission for the user.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  static async getPermission(req, res) {
    try {
      const email = req.user.email;
      const response = await PermissionModel.getPermission(email);
      response
        ? Response.success(res, "Successful", response, 200)
        : Response.error(res, "You do not have any saved permissions", 404);
    } catch (error) {
      Response.error(res, error.message);
    }
  }

  /**
   * Updates the permission for the user.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  static async updatePermission(req, res) {
    try {
      const userId = req.user.id;
      await PermissionModel.updatePermission(userId, req.body);
      Response.success(res, "Updated", 200);
    } catch (error) {
      Response.error(res, error.message);
    }
  }

  /**
   * Deletes the permission for the user.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  static async deletePermission(req, res) {
    try {
      const userId = req.user.id;
      await PermissionModel.deletePermission(userId);
      Response.success(res, "Deleted", 200);
    } catch (error) {
      Response.error(res, error.message);
    }
  }
}

module.exports = {
  PermissionController
};
