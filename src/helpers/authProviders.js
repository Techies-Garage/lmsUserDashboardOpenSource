const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

/**
 * Configure and use Google OAuth 2.0 authentication strategy.
 *
 * @param {string} clientID - Google OAuth client ID.
 * @param {string} clientSecret - Google OAuth client secret.
 * @param {string} callbackURL - URL to redirect after Google authentication.
 * @param {Function} verifyCallback - Callback function to handle successful authentication.
 */
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  callbackURL: '/auth/google/callback'
},
  /**
   * Verify callback function to handle successful authentication.
   *
   * @param {string} accessToken - Google OAuth access token.
   * @param {string} refreshToken - Google OAuth refresh token.
   * @param {Object} profile - User profile returned by Google.
   * @param {Function} done - Callback function to indicate authentication success or failure.
   */
  (accessToken, refreshToken, profile, done) => {
    const payload = profile._json;
    done(null, payload);
  }
));
