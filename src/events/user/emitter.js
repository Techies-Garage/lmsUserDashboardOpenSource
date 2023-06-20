const EventEmitter = require('events');
const UserEvents = new EventEmitter();
const database = require('./database') // database

// check if email exists
UserEvents.on('getUserByEmail', async (email, callback) => {
  try {
    const data = await database.getUserByEmail(email)
    callback(data);
  } catch (error) {
    callback(error);
  }
});

// check if account is verified
UserEvents.on('accountVerified', (data, callback) => {
  try {
    callback(data);
  } catch (error) {
    callback(error);
  }
});

module.exports = UserEvents
