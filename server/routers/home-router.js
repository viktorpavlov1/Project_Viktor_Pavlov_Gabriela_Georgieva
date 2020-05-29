/* globals module require */

'use strict';

const express = require('express');

module.exports = function (app, data) {
    let router = new express.Router(),
        controllers = require('../controllers')(data);

    router
        .get('/', controllers.getHomePage)
        .get('/home', controllers.getHomePage)
        .get('/contacts', controllers.getContactsPage);

    app.use(router);
};