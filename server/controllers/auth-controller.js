/* globals module require */

'use strict';

const passport = require('passport'),
    characterEscaper = require('../utils/character-escaper');


module.exports = (data) => {
    return {
        login(req, res, next) {
            passport.authenticate('local', (error, user) => {
                if (error) {
                    next(error);
                    return res.status(500).json('Server error! Please try again!');
                }

                if (!user) {
                    res.status(400).json('Invalid username or password!');
                }

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return res.status(500).json('Server error! Please try again!');
                    }

                    res.status(200).json('Login successful!');
                });
            })(req, res, next);
        },

        facebookLogin(req, res, next) {
            passport.authenticate('facebook', (error, user) => {
                if (error) {
                    next(error);
                    return;
                }

                if (!user) {
                    res.redirect('/login');
                }

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    res.redirect('/profile/' + req.user.username);
                });
            })(req, res, next);
        },

        logout(req, res) {
            req.logout();
            res.redirect('/home');
        },

        register(req, res) {
            Object.keys(req.body)
                .forEach(key => req.body[key] = characterEscaper(req.body[key]));

            data.userCreateAndSave(req.body.firstName, req.body.lastName, req.body.age, req.body.gender, req.body.username, req.body.password, req.body.email, { src: req.body.avatar })
                .then(() => {
                    passport.authenticate('local')(req, res, function () {
                        res.redirect('/profile/' + req.user.username);
                    });
                })
                .catch((err) => {
                    res.status(400).send(err);
                    res.redirect('/register');
                });
        },

        notAuthorised(req, res) {
            res.render('auth-not-authorised-page');
        }

    };
};