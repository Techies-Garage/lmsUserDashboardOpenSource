const { Permission } = require('./schema');

/**
 * Repository for managing permissions.
 */
class PermissionsRepository {
  /**
   * Creates a permission for a user.
   *
   * @param {string} userId - User ID.
   * @param {string} email - User email.
   * @param {Array<string>} permissions - User permissions.
   * @returns {Promise<object>} - Created permission object.
   * @throws {Error} - If an error occurs during permission creation.
   */
  static async createPermission(userId, email, permissions) {
    try {
      const existingPermission = await Permission.findOne({ email: email });

      if (existingPermission) {
        return existingPermission; // Permission already exists, return it
      }

      const permission = new Permission({
        userId: userId,
        email: email,
        permissions: permissions,
      });

      const createdPermission = await permission.save();
      return createdPermission;
    } catch (error) {
      throw Error(error.message);
    }
  }

  /**
   * Retrieves a permission by user ID.
   *
   * @param {string} userId - User ID.
   * @returns {Promise<object>} - Retrieved permission object.
   * @throws {Error} - If an error occurs while retrieving the permission.
   */
  static async getPermissionByUserEmail(email) {
    try {
      const permission = await Permission.findOne({ email: email });
      return permission;
    } catch (error) {
      throw new Error('Failed to retrieve permission');
    }
  }

  /**
   * Updates a permission by user ID (upsert).
   *
   * @param {string} userId - User ID.
   * @param {Array<string>} updatedPermissions - Updated permissions.
   * @returns {Promise<object>} - Updated permission object.
   * @throws {Error} - If an error occurs while updating the permission.
   */
  static async updatePermissionByUserId(userId, updatedPermissions) {
    try {
      const updatedPermission = await Permission.findOneAndUpdate(
        { userId: userId },
        { permissions: updatedPermissions.permissions },
        { new: true, upsert: true }
      );
      return updatedPermission;
    } catch (error) {
      throw new Error('Failed to update permission');
    }
  }

  /**
   * Deletes a permission by user ID.
   *
   * @param {string} userId - User ID.
   * @throws {Error} - If an error occurs while deleting the permission.
   */
  static async deletePermissionByUserId(userId) {
    try {
      await Permission.deleteOne({ userId: userId });
    } catch (error) {
      throw new Error('Failed to delete permission');
    }
  }
}

module.exports = PermissionsRepository;
