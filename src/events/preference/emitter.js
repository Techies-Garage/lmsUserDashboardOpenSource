const EventEmitter = require('events');
const PreferenceEvents = new EventEmitter();
const PreferenceRepository = require('../../modules/preference/repository') // database

// set defualt user permissions from the database
PreferenceEvents.on('createPreference', async (data) => {
  try {
    const preferenceObject = {
      general: {
        language: 'English',
        theme: 'Light',
        notifications: true
      },
      privacy: {
        analytics: true,
        targetedAds: true
      },
      communication: {
        emailNotifications: true,
        pushNotifications: true
      }
    };
    await PreferenceRepository.createPreference(data.id, preferenceObject)
  } catch (error) {
    callback(error);
  }
});

module.exports = PreferenceEvents
