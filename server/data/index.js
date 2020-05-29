/* globals require module __dirname */

'use strict';

const fs = require('fs'),
    path = require('path'),
    models = require('./mongoose/models');

let dataExport = {};

fs.readdirSync(__dirname)
    .filter(x => x.includes('-data.js'))
    .forEach(data => {
        let dataModule = require(path.join(__dirname, data))(models);

        Object.keys(dataModule)
            .forEach(key => {
                dataExport[key] = dataModule[key];
            });
    });

module.exports = dataExport;