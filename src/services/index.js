
/**
 * Index file to access services in the application
 */
const db = require('../../aia-db-lib/index');
const https = require('./https/index.js');
const auth = require('./auth/index.js');
const redis = require('./redis/index')


module.exports = {
  db,
  https,
  auth,
  redis
};
