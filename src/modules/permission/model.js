const PermissionRepository = require("./repository");

/**
 * Represents a Permission model.
 */
class PermissionModel {
  /**
   * Creates a new permission for a user.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} email - The email of the user.
   * @param {Array<string>} permissions - The permissions to assign to the user.
   * @returns {Promise<object>} - The created permission object.
   * @throws {Error} - If an error occurs while creating the permission.
   */
  static async createPermission(userId, email, permissions) {
    try {
      return await PermissionRepository.createPermission(userId, email, permissions);
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Retrieves the permission of a user by user ID.
   *
   * @param {string} userId - The ID of the user.
   * @returns {Promise<object>} - The permission object.
   * @throws {Error} - If an error occurs while retrieving the permission.
   */
  static async getPermission(email) {
    try {
      return await PermissionRepository.getPermissionByUserEmail(email);
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Updates the permission of a user by user ID.
   *
   * @param {string} userId - The ID of the user.
   * @param {Array<string>} updatedPermissions - The updated permissions to assign to the user.
   * @returns {Promise<object>} - The updated permission object.
   * @throws {Error} - If an error occurs while updating the permission.
   */
  static async updatePermission(userId, updatedPermissions) {
    try {
      return await PermissionRepository.updatePermissionByUserId(userId, updatedPermissions);
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Deletes the permission of a user by user ID.
   *
   * @param {string} userId - The ID of the user.
   * @returns {Promise<void>}
   * @throws {Error} - If an error occurs while deleting the permission.
   */
  static async deletePermission(userId) {
    try {
      return await PermissionRepository.deletePermissionByUserId(userId);
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = PermissionModel;
