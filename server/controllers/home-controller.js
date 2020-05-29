/* globals module */

'use strict';

module.exports = function (data) {
    return {
        getHomePage(req, res) {
            res.render('home-page', { user: req.user });
        },

        getContactsPage(req, res) {
            res.render('contacts-page', { user: req.user });
        }
    };
};