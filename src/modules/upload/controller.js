const { space, SpaceUploadService } = require('../../services/upload/space');
const { s3, S3UploadService } = require('../../services/upload/s3');

const DEFAULT_ACL = 'public-read';

/**
 * Controller for handling file uploads.
 */
class UploadController {
  /**
   * Handles the file upload.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>} A Promise that resolves when the upload is complete.
   */
  static async upload(req, res) {
    try {
      const acl = DEFAULT_ACL; // for DigitalOcean Spaces only

      // Upload file using UploadService
      const uploadResult = await S3UploadService.uploadFile(req.file, acl);

      res.status(200).json(uploadResult);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  /**
   * Retrieves an object item as binary from the Space.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {void}
   */
  static async getFromSpace(req, res) {
    // Configure download parameters
    const downloadParameters = {
      Bucket: bucketName,
      Key: req.params.fileName,
    };

    // Get space object item as binary object
    space.getObject(downloadParameters, function(error, data) {
      if (error) {
        console.error(error);
        res.sendStatus(500);
      } else {
        res.contentType(data.ContentType);
        res.end(data.Body, 'binary');
      }
    });
  }

  /**
   * Retrieves an object item as binary from S3.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @returns {Promise<void>} A Promise that resolves when the retrieval is complete.
   */
  static async getFromS3(req, res) {
    try {
      const { fileName } = req.query;
      const bucketName = process.env.AWS_BUCKET_NAME;

      // Configure download parameters
      const downloadParameters = {
        Bucket: bucketName,
        Key: fileName,
      };

      // Get S3 object as binary data
      const data = await s3.getObject(downloadParameters).promise();

      // Set the appropriate response headers
      res.contentType(data.ContentType);
      res.end(data.Body, 'binary');
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}

module.exports = UploadController;
