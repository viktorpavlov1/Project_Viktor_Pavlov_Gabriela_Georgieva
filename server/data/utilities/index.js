/* globals require module __dirname */
'use strict';

const fs = require('fs'),
    path = require('path');

let dataExport = {};

fs.readdirSync(__dirname)
    .filter(x => x.includes('-utils.js'))
    .forEach(data => {
        let dataModule = require(path.join(__dirname, data));

        Object.keys(dataModule)
            .forEach(key => {
                dataExport[key] = dataModule[key];
            });
    });

module.exports = dataExport;