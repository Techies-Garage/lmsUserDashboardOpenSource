const { generateJwt, verifyJwt } = require('../../helpers/jwt');
const { UserModel } = require("./model");

/**
 * Controller class for handling user-related operations.
 */
class UserController {
  /**
   * Authenticates the user and generates a JWT token.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves once the authentication is completed.
   */
  static async auth(req, res) {
    try {
      await UserModel.create(req.user);
      const { email } = req.user;

      await new Promise((resolve, reject) => {
        Events.UserEvents.emit('getUserByEmail', email, (message) => {
          const id = message._id.toString()
          const TOKEN = generateJwt({ email, id });
          Response.success(res, "Generated Token", { token: `Bearer ${TOKEN}` }, 200);
          resolve();
        });
      });
    } catch (err) {
      Response.error(res, err.message);
    }
  }
}

module.exports = {
  UserController
};
