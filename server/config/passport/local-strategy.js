/* globals module require */

'use strict';

const LocalStrategy = require('passport-local');
const data = require('../../data');

let strategy = new LocalStrategy(
    (username, password, done) => {
        data.findUserByCredentials(username)
            .then(user => {
                if (user && user.authenticate(password)) {
                    return done(null, user);
                }

                return done(null, false, { message: 'Incorrect username or password!' });
            })
            .catch(err => done(err, null, { message: 'A server exception occured! Please try again!' }));
    });

module.exports = strategy;