/* globals require module __dirname */

'use strict';

const fs = require('fs'),
    path = require('path'),
        passport = require('passport');

    module.exports = (app, data) => {
        fs.readdirSync('./server/config/passport')
            .filter(x => x.includes('-strategy'))
            .forEach(strategy => passport.use(require(path.join(__dirname, strategy))));

        passport.serializeUser((user, done) => {
            if (user) {
                done(null, user._id);
            }
        });

    passport.deserializeUser((userId, done) => {
        data
            .findUserById(userId)
            .then(user => done(null, user || false))
            .catch(error => done(error, false));
    });

    app.use(passport.initialize());
    app.use(passport.session());
};