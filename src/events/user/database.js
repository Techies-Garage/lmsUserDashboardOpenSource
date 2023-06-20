const mongoose = require('mongoose');
const { User } = require('../../modules/user/schema')

// CRUD operations
const database = {
  // Create a new user
  createUser: async (userData) => {
    try {
      const user = new User(userData);
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Read a user by email
  getUserByEmail: async (email) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error;
    }
  },

  // Update a user by email (using upsert)
  updateUserByEmail: async (email, updatedData) => {
    try {
      const options = { upsert: true, new: true };
      const user = await User.findOneAndUpdate({ email }, updatedData, options);
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete a user by email
  deleteUserByEmail: async (email) => {
    try {
      const deletedUser = await User.findOneAndDelete({ email });
      return deletedUser;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};

module.exports = database;
