const mongoose = require('mongoose');
const Joi = require('joi');

/**
 * Mongoose schema for a lesson.
 * @typedef {import('mongoose').Schema} MongooseSchema
 */
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String },
  duration: { type: Number },
});

/**
 * Mongoose model for a course.
 * @typedef {import('mongoose').Model} MongooseModel
 */
const courseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  discount: { type: Number },
  thumbnail: { type: String },
  lessons: [lessonSchema]
});

/**
 * Course model based on the courseSchema.
 * @type {MongooseModel}
 */
const Course = mongoose.model('Course', courseSchema);

/**
 * Joi schema for validating course input.
 * @typedef {import('joi').ObjectSchema} JoiObjectSchema
 */
const courseInputSchema = Joi.object({
  userId: Joi.string(),
  email: Joi.string().required().email().messages({
    'string.email': 'Invalid email format',
    'any.required': 'email is required',
  }),
  name: Joi.string().required().messages({
    'any.required': 'name is required',
  }),
  description: Joi.string(),
  price: Joi.number(),
  discount: Joi.number(),
  thumbnail: Joi.string(),
});

/**
 * Joi schema for validating lesson input.
 * @type {JoiObjectSchema}
 */
const lessonInputSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'title is required',
  }),
  description: Joi.string(),
  videoUrl: Joi.string(),
  duration: Joi.number(),
});

module.exports = {
  Course,
  courseInputSchema,
  lessonInputSchema,
};
