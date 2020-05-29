/* globals module require __dirname */

'use strict';

const fs = require('fs'),
    path = require('path');

module.exports = function (app, data) {
    fs.readdirSync('./server/routers')
        .filter(x => x.includes('-router'))
        .forEach(router => require(path.join(__dirname, router))(app, data));
};