/* globals module require */

'use strict';

const express = require('express');
const passport = require('passport');

module.exports = function (app, data) {
    let router = new express.Router(),
        controllers = require('../controllers')(data);

    router
        .get('/login', controllers.getLoginPage)
        .post('/login', controllers.login)
        .get('/login/facebook', passport.authenticate('facebook'))
        .get('/login/facebook/callback', controllers.facebookLogin)
        .get('/register', controllers.getRegisterPage)
        .post('/register', controllers.register)
        .get('/logout', controllers.logout)
        .get('/not-authorised', controllers.notAuthorised);

    app.use(router);
};