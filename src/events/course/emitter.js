const EventEmitter = require('events');
const CourseEvents = new EventEmitter();
const CourseRepository = require('../../modules/course/repository') // database

// set defualt user permissions from the database
CourseEvents.on('getCourse', async (courseId, callback) => {
  try {
    let response = await CourseRepository.getCourseById(courseId)
    callback(response)
  } catch (error) {
    callback(error);
  }
});

// check if course is paid
CourseEvents.on('checkPricing', async (courseId, callback) => {
  try {
    let response = await CourseRepository.getCourseById(courseId)
    const price = response.price
    callback(price)
  } catch (error) {
    callback(error);
  }
});

module.exports = CourseEvents
