/**
 * Main application file
 */

'use strict';

import express from 'express';
import busboy from 'connect-busboy';
import mongoose from 'mongoose';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';

var fileUpload = require('express-fileupload');

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
//if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
app.use(busboy());
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

app.use(fileUpload());

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
