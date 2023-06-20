class Tracker {
  static async track(userId, activity) {
    log(activity)
    Events.ActivityEvents.emit('createActivity', userId, activity)
  }
}
module.exports = Tracker
