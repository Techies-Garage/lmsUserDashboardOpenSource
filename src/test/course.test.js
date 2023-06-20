const mongoose = require('mongoose');

// Course model
const { Lesson, Course } = require('../modules/course/schema')

// Create dummy data
async function createDummyData() {
  try {
    // Create a course
    const course = new Course({
      userId: new mongoose.Types.ObjectId(),
      email: 'user1@example.com',
      name: 'Course 1',
      slug: 'course-1',
      description: 'This is Course 1',
      price: 99.99,
      thumbnail: 'https://example.com/thumbnail1.jpg',
      lessons: [
        {
          title: 'Lesson 1',
          description: 'This is Lesson 1',
          videoUrl: 'https://example.com/lesson1.mp4',
          duration: 60,
        },
        {
          title: 'Lesson 2',
          description: 'This is Lesson 2',
          videoUrl: 'https://example.com/lesson2.mp4',
          duration: 45,
        },
      ],
    });

    // Save the course
    await course.save();
    log('Course created:', course);

    // Update the course
    course.price = 79.99;
    await course.save();
    log('Course updated:', course);

    // Find the course
    const foundCourse = await Course.findById(course._id);
    log('Found course:', foundCourse);

    // Delete the course
    await Course.findByIdAndDelete(course._id);
    log('Course deleted');

  } catch (error) {
    console.error('Failed to perform CRUD operations', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Call the function to perform CRUD operations on dummy data
createDummyData();
