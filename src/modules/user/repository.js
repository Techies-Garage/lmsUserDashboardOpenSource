const { User } = require('./schema');

/**
 * Repository for managing user data.
 */
class UserRepository {
  /**
   * Creates a new user.
   *
   * @param {Object} data - The user data.
   * @returns {Promise<User>} - A promise that resolves to the newly created user.
   */
  static async create(data) {
    try {
      const user = new User(data);
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        return existingUser; // If user already exists, simply return without saving
      }

      let newUser = await user.save(); // Save the new user
      return newUser;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  /**
   * Retrieves a user by email.
   *
   * @param {string} email - The email of the user.
   * @returns {Promise<User>} - A promise that resolves to the found user.
   */
  static async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  /**
   * Updates a user by email.
   *
   * @param {string} email - The email of the user to update.
   * @param {Object} newData - The updated user data.
   * @returns {Promise<User>} - A promise that resolves to the updated user.
   */
  static async updateUserByEmail(email, newData) {
    return await User.findOneAndUpdate({ email }, newData, { new: true });
  }

  /**
   * Deletes a user by email.
   *
   * @param {string} email - The email of the user to delete.
   * @returns {Promise<User>} - A promise that resolves to the deleted user.
   */
  static async deleteUserByEmail(email) {
    return await User.findOneAndDelete({ email });
  }

  /**
   * Retrieves all users with pagination and sorting.
   *
   * @param {number} page - The page number.
   * @param {number} limit - The number of users per page.
   * @param {string} sortBy - The field to sort the users by.
   * @param {string} sortOrder - The sort order ('asc' for ascending, 'desc' for descending).
   * @returns {Promise<Object>} - A promise that resolves to an object containing users, page information, and total user count.
   */
  static async getAllUsers(page, limit, sortBy, sortOrder) {
    const startIndex = (page - 1) * limit;
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const users = await User.find()
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit);

    return {
      users,
      page,
      totalPages,
      totalUsers,
    };
  }
}

module.exports = {
  UserRepository,
};
