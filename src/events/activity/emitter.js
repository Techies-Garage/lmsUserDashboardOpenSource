const EventEmitter = require('events');
const ActivityEvents = new EventEmitter();
const ActivityRepository = require('../../modules/activity/repository') // database

// track user activities
ActivityEvents.on('createActivity', async (userId, activity) => {
  try {
    await ActivityRepository.createUserActivity(userId, activity)
  } catch (error) {
    throw new Error(error.message)
  }
});

module.exports = ActivityEvents
