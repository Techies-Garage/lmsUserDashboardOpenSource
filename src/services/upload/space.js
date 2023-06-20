const AWS = require('aws-sdk');
const { v4 } = require('uuid');

/**
 * The name of the DigitalOcean Spaces bucket.
 * @type {string}
 */
const bucketName = process.env.DO_BUCKET_NAME;

/**
 * The instance of AWS.S3 class to interact with DigitalOcean Spaces.
 * @type {AWS.S3}
 */
const space = new AWS.S3({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  useAccelerateEndpoint: false,
  credentials: new AWS.Credentials(
    process.env.DO_SPACES_KEY,
    process.env.DO_SPACES_SECRET,
    null
  )
});

/**
 * Service for uploading files to DigitalOcean Spaces using AWS SDK.
 */
class SpaceUploadService {
  /**
   * Uploads a file to the DigitalOcean Space.
   *
   * @param {Object} file - The file object to upload.
   * @param {string} acl - The access control level for the file.
   * @returns {Promise<Object>} - A promise that resolves to the uploaded file data.
   */
  static uploadFile(file, acl) {
    return new Promise((resolve, reject) => {
      /**
       * The upload parameters for the file.
       * @type {Object}
       */
      const uploadParameters = {
        Bucket: bucketName,
        ContentType: file.mimetype,
        Body: file.buffer,
        ACL: acl,
        Key: `${file.mimetype}/${v4().replaceAll('-', '')}` // Organize files into folders based on file type
      };

      // Upload file to space
      space.upload(uploadParameters, function (error, data) {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = { space, SpaceUploadService };
