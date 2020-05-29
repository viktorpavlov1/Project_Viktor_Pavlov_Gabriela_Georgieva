/* globals require module global */
'use strict';

const mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('We are now connected to connected to: ' + config.connectionString));
};