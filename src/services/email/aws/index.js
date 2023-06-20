const AWS = require("aws-sdk");

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

class AWSEmail {
  /**
   * Send an email.
   *
   * @param {string} recipient - Email recipient.
   * @param {string} name - Name of the recipient.
   * @param {string} message - Email message.
   * @returns {Promise<Object>} - Promise resolving to the result of the sendEmail operation.
   */
  static send(recipient, subject, name, message) {
    const params = {
      Source: "Faith @Top Universe <noreply@topuniverse.org>",
      Destination: {
        ToAddresses: [recipient],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: message,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
    };
    return AWS_SES.sendEmail(params).promise();
  }

  /**
   * Send an email using a predefined template.
   *
   * @param {string} template - Template name.
   * @param {string} recipient - Email recipient.
   * @param {Object} data - Template data.
   * @returns {Promise<Object>} - Promise resolving to the result of the sendTemplatedEmail operation.
   */
  static sendWithTemplate(template, recipient, data) {
    const params = {
      Source: "Faith @Top Universe <noreply@topuniverse.org>",
      Template: template,
      Destination: {
        ToAddresses: [recipient],
      },
      TemplateData: JSON.stringify(data),
    };
    return AWS_SES.sendTemplatedEmail(params).promise();
  }
}

module.exports = {
  AWSEmail,
};
