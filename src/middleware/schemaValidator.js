const { validator } = require('../utils/validator')
/**
 * Middleware for validating request body against a schema.
 *
 * @param {Object} schema - The schema object to validate against.
 * @returns {Function} - Express middleware function.
 */
exports.schemaValidator = (schema) => {
  return async function(req, res, next) {
    try {
      let data = await validator(req.body, schema);
      if (!data.isValid) {
        const error = new Error(data.error)
        error.statusCode = 442;
        throw error
      }
      next();
    } catch (error) {
      Response.error(res, error.message, error.statusCode);
      return;
    }
  };
};
