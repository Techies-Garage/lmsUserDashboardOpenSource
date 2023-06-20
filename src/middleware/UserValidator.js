const { verifyJwt, decode } = require("../helpers/jwt");

/**
 * Middleware to validate user authentication using JWT.
 *
 * @returns {Function} - Express middleware function.
 */
const UserValidator = () => {
  return async function(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const tokenStatus = verifyJwt(token);

        if (!tokenStatus) {
          const error = new Error("Unauthorized");
          error.statusCode = 403;
          throw error
        }

        const user = decode(token);
        req.user = user

        next();
      } else {
        const error = new Error("Invalid Authorization Parameters");
        error.statusCode = 401;
        throw error
      }
    } catch (error) {
      Response.error(res, error.message, error.statusCode);
    }
  };
};

module.exports = {
  UserValidator
};
