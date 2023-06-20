const UserEvents = require('./user/emitter');
const PermissionEvents = require('./permission/emitter');
const CourseEvents = require('./course/emitter');
const PreferenceEvents = require('./preference/emitter');
const WalletEvents = require('./wallet/emitter');
const ActivityEvents = require('./activity/emitter');


const Events = {
  UserEvents,
  PermissionEvents,
  CourseEvents,
  PreferenceEvents,
  WalletEvents,
  ActivityEvents
};

module.exports = Events
