const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI

/**
 * Connects to the MongoDB database using the provided URI.
 *
 * @param {string} MONGODB_URI - The URI of the MongoDB database.
 * @returns {Promise<void>} - A promise that resolves when the connection is established.
 * @throws {Error} - If there's an error connecting to the database.
 */
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    log('Connected to MongoDB 🐝');
  })
  .catch((err) => {
    throw Error(err);
    log('🐞Error connecting to MongoDB:', err);
  });
