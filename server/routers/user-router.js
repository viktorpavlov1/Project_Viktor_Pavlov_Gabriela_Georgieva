/* globals module require */

'use strict';

const express = require('express');

module.exports = function (app, data) {
    let router = new express.Router(),
        controllers = require('../controllers')(data);

    router
        .get('/profile', controllers.getMyProfile)
        .get('/profile/:username', controllers.getUserProfilePage)
        .get('/update-info', controllers.getUpdateInfoPage)
        .post('/update-info', controllers.updateUserInfo)
        .post('/profile/:username/update-user-status', controllers.createAdmin);

    app.use(router);
};