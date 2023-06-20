require('dotenv').config();

const express = require('express');
const helmet = require('helmet');

require('./src/utils/database');
require('./src/helpers/authProviders');
require('./src/utils/globals');

/**
 * Express application.
 * @type {express.Application}
 */
const app = express();

app.use(express.json());

const passport = require('passport');
// Configure Passport.js middleware
app.use(passport.initialize());

// const Honeybadger = require('@honeybadger-io/js');
// Honeybadger.configure({
//   apiKey: process.env.HONEYBADGER,
//   environment: process.env.HONEYBADGER_ENV
// });

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is active 🚀')
})

/**
 * Middleware for handling errors.
 * @param {Error} err - The error object.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {express.NextFunction} next - The next function.
 */
app.use((err, req, res, next) => {
  return errorResponse(res, 'Internal server error');
});

// Swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/apidocs.json');
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Import base routes
const baseRoutes = require('./base_routes');

// Use base routes
app.use(baseRoutes);

/**
 * The port number the application will listen on.
 * @type {number|string}
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  log(`Server listening on port ${port} 🚀`);
});
