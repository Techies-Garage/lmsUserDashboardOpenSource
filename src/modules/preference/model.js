const PreferenceRepository = require('./repository');

/**
 * Model class for interacting with preference data.
 * @class
 */
class PreferenceModel {
  /**
   * Create a new preference for a user.
   * @static
   * @async
   * @param {string} userId - The ID of the user.
   * @param {object} preferenceData - The preference data to be created.
   * @returns {Promise<object>} The created preference.
   * @throws {Error} If failed to create the preference.
   */
  static async createPreference(userId, preferenceData) {
    try {
      const createdPreference = await PreferenceRepository.createPreference(userId, preferenceData);
      return createdPreference;
    } catch (error) {
      throw new Error(`Failed to create preference: ${error.message}`);
    }
  }

  /**
   * Get the preference for a user.
   * @static
   * @async
   * @param {string} userId - The ID of the user.
   * @returns {Promise<object>} The retrieved preference.
   * @throws {Error} If failed to retrieve the preference.
   */
  static async getPreference(userId) {
    try {
      const preference = await PreferenceRepository.getPreferenceByUserId(userId);
      return preference;
    } catch (error) {
      throw new Error(`Failed to retrieve preference: ${error.message}`);
    }
  }

  /**
   * Update the preference for a user.
   * @static
   * @async
   * @param {string} userId - The ID of the user.
   * @param {object} preferenceData - The updated preference data.
   * @returns {Promise<object>} The updated preference.
   * @throws {Error} If failed to update the preference.
   */
  static async updatePreference(userId, preferenceData) {
    try {
      const updatedPreference = await PreferenceRepository.updatePreferenceByUserId(userId, preferenceData);
      return updatedPreference;
    } catch (error) {
      throw new Error(`Failed to update preference: ${error.message}`);
    }
  }

  /**
   * Delete the preference for a user.
   * @static
   * @async
   * @param {string} userId - The ID of the user.
   * @returns {Promise<boolean>} A boolean indicating if the deletion was successful.
   * @throws {Error} If failed to delete the preference.
   */
  static async deletePreference(userId) {
    try {
      const deleted = await PreferenceRepository.deletePreferenceByUserId(userId);
      return deleted;
    } catch (error) {
      throw new Error(`Failed to delete preference: ${error.message}`);
    }
  }
}

module.exports = PreferenceModel;
