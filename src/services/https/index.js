const https = require('https');
const path = require('path');
const fs = require('fs');

module.exports = (app) =>
  /* setup for https (self-signed certificate) */
  https.createServer(
    {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.cert')),
      requestCert: false,
      rejectUnauthorized: false,
    },
    app,
  );
