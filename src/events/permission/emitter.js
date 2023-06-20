const EventEmitter = require('events');
const PermissionEvents = new EventEmitter();
const PermissionRepository = require('../../modules/permission/repository') // database

// set defualt user permissions from the database
PermissionEvents.on('createPermissions', async (data) => {
  try {
    let { _id, email } = data

    let permissions = {
      course: ['read', 'write', 'update', 'delete'],
    }

    await PermissionRepository.createPermission(_id, email, permissions)
  } catch (error) {
    callback(error)
  }
});

// get user permissions from the database
PermissionEvents.on('getPermissions', async (email, callback) => {
  try {
    const permissions = await PermissionRepository.getPermissionByUserEmail(email);
    if (!permissions) {
      throw new Error("User Permissions not found");
    }
    callback(permissions);
  } catch (error) {
    callback(error);
  }
});

module.exports = PermissionEvents
