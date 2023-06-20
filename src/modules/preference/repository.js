const Preference = require('./schema');
const mongoose = require('mongoose');

/**
 * Repository for managing preferences.
 * @class PreferenceRepository
 */
class PreferenceRepository {
  /**
   * Create a new preference for a user.
   * @param {string} userId - The user ID.
   * @param {object} preferenceData - The preference data.
   * @returns {Promise<PreferenceDocument>} The created preference.
   * @throws {Error} If failed to create preference.
   */
  static async createPreference(userId, preferenceData) {
    try {
      // Check if preference already exists for the user
      const existingPreference = await Preference.findOne({ userId }).exec();
      if (existingPreference) {
        return existingPreference;
      }

      // Create new preference data
      const preference = new Preference({ userId, ...preferenceData });
      const createdPreference = await preference.save();
      return createdPreference;
    } catch (error) {
      throw new Error(`Failed to create preference: ${error.message}`);
    }
  }

  /**
   * Get a preference by user ID.
   * @param {string} userId - The user ID.
   * @returns {Promise<PreferenceDocument|null>} The retrieved preference or null if not found.
   * @throws {Error} If failed to retrieve preference.
   */
  static async getPreferenceByUserId(userId) {
    try {
      const parsedUserId = new mongoose.Types.ObjectId(userId);
      const preference = await Preference.findOne({ userId: parsedUserId }).exec();
      return preference;
    } catch (error) {
      throw new Error(`Failed to retrieve preference: ${error.message}`);
    }
  }

  /**
   * Update a preference by user ID.
   * @param {string} userId - The user ID.
   * @param {object} preferenceData - The updated preference data.
   * @returns {Promise<PreferenceDocument>} The updated preference.
   * @throws {Error} If failed to update preference.
   */
  static async updatePreferenceByUserId(userId, preferenceData) {
    try {
      const preference = await Preference.findOneAndUpdate(
        { userId },
        preferenceData,
        { new: true, upsert: true }
      ).exec();
      return preference;
    } catch (error) {
      throw new Error(`Failed to update preference: ${error.message}`);
    }
  }

  /**
   * Delete a preference by user ID.
   * @param {string} userId - The user ID.
   * @returns {Promise<boolean>} Indicating whether the deletion was successful.
   * @throws {Error} If failed to delete preference.
   */
  static async deletePreferenceByUserId(userId) {
    try {
      await Preference.findOneAndDelete({ userId }).exec();
      return true; // Indicate successful deletion
    } catch (error) {
      throw new Error(`Failed to delete preference: ${error.message}`);
    }
  }
}

module.exports = PreferenceRepository;
