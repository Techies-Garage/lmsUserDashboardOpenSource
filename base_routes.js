const express = require('express');

const router = express.Router();

// Import routes
const userRoute = require('./src/modules/user/route');
const courseRoute = require('./src/modules/course/route');
const uploadRoute = require('./src/modules/upload/route');
const enrollmentRoute = require('./src/modules/enrollment/route');
const userActivityRoute = require('./src/modules/activity/route');
const permissionRoute = require('./src/modules/permission/route');
const preferenceRoute = require('./src/modules/preference/route');
const paymentRoute = require('./src/modules/payment/route');
const walletRoute = require('./src/modules/wallet/route');

// Mount routes
router.use(
  userRoute,
  courseRoute,
  uploadRoute,
  enrollmentRoute,
  userActivityRoute,
  permissionRoute,
  preferenceRoute,
  paymentRoute,
  walletRoute
);

module.exports = router;
