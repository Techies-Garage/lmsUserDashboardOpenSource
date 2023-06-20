const uploadRoute = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 52428800 } // Set maximum upload size to 50 MB (in bytes)
});

const UploadController = require('./controller');

// validations & permissions middleware
const { UserValidator } = require('../../middleware/UserValidator'); // user validation middleware
const { UserPermissions } = require('../../middleware/UserPermissions'); // user permissions middleware
const { CourseOwner } = require('../../middleware/CourseOwner'); // user owner middleware

/**
 * Custom error handler middleware for handling file size limit errors.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
function handleFileSizeLimitError(err, req, res, next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(400).json({ error: 'File size exceeds the maximum limit' });
  } else {
    next(err);
  }
}

uploadRoute.post(
  '/upload',
  UserValidator(),
  upload.single('file'),
  handleFileSizeLimitError,
  UploadController.upload
);

uploadRoute.get('/upload/space/', UserValidator(), UploadController.getFromSpace);
uploadRoute.get('/upload/s3/', UserValidator(), UploadController.getFromS3);

module.exports = uploadRoute;
