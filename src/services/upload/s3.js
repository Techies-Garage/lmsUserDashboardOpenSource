const AWS = require('aws-sdk');
const { v4 } = require('uuid');


// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

// Create an instance of the AWS.S3 class to interact with S3
const s3 = new AWS.S3();


/**
 * Service for uploading files to AWS S3.
 */
class S3UploadService {
  /**
   * Uploads a file to the AWS S3 bucket.
   *
   * @param {Object} file - The file object to upload.
   * @returns {Promise<Object>} - A promise that resolves to the uploaded file data.
   */
  static uploadFile(file) {
    return new Promise((resolve, reject) => {
      // Configure single upload parameter
      const uploadParameters = {
        Bucket: process.env.AWS_BUCKET_NAME,
        ContentType: file.mimetype,
        Body: file.buffer,
        Key: `${file.mimetype}/${v4().replaceAll('-', '')}` // Organize files into folders based on file type
      };

      // Upload file to S3 bucket
      s3.upload(uploadParameters, function (error, data) {
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

module.exports = {s3, S3UploadService};
