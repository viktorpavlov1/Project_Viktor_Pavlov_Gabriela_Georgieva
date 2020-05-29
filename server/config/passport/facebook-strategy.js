/* globals module require */

'use strict';

const LocalStrategy = require('passport-facebook'),
    data = require('../../data'),
    facebookAuth = {
        clientID: '788019178002659',
        clientSecret: 'e33f6659126baca5527c4bc2c5e20730',
        callbackURL: 'https://extreme-sports.herokuapp.com/login/facebook/callback',
        profileFields: ['id', 'first_name', 'last_name', 'displayName', 'picture.type(large)', 'email', 'gender']
    };

let strategy = new LocalStrategy({
    clientID: facebookAuth.clientID,
    clientSecret: facebookAuth.clientSecret,
    callbackURL: facebookAuth.callbackURL,
    profileFields: facebookAuth.profileFields
},
    (token, refreshToken, profile, done) => {
        data.findUserByFacebookId(profile.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                else {
                    let username = profile.displayName,
                        facebookId = profile.id,
                        facebookToken = token,
                        email = profile.email,
                        firstName = profile.name.givenName,
                        lastName = profile.name.familyName,
                        gender = profile.gender,
                        profilePicture = {
                            src: profile.photos[0].value
                        };

                    data.createFacebookUser(username, facebookId, facebookToken, email, firstName, lastName, gender, profilePicture)
                        .then((res) => {
                            return done(null, res);
                        })
                        .catch(err => {
                            done(err, null, { message: 'A server exception occured! Please try again!' });
                        });
                }

            })
            .catch(err => {
                done(err, null, { message: 'A server exception occured! Please try again!' });
            });

    });

module.exports = strategy;
