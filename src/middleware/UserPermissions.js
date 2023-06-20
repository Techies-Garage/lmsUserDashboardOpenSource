const { decode } = require("../helpers/jwt");

const decodedUserToken = async (authHeader) => {
  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error("Authorization parameters not passed");
    }
    const token = authHeader.split(' ')[1];
    return decode(token);
  } catch (error) {
    throw Error(error.message)
  }
};

const getUserPermissions = async (email) => {
  try {
    return new Promise((resolve) => {
      Events.PermissionEvents.emit('getPermissions', email, (message) => {
        resolve(message.permissions || []);
      });
    });
  } catch (error) {
    throw Error(error.message)
  }
};

const UserPermissions = (permissions) => {
  return async function(req, res, next) {
    try {
      const { email } = await decodedUserToken(req.headers.authorization);

      const permissionList = await getUserPermissions(email);

      const checkPermissions = () => {
        for (const [key, requiredValues] of Object.entries(permissions)) {
          const permissionValues = permissionList[key] || [];
          if (!requiredValues.every(value => permissionValues.includes(value))) {
            return false;
          }
        }
        return true;
      };

      if (!checkPermissions()) {
        throw new Error("Insufficient Permissions");
      }

      next();
    } catch (error) {
      Response.error(res, error.message);
    }
  };
};


module.exports = {
  UserPermissions
};
