/* globals module require */

'use strict';

const express = require('express');

module.exports = function (app, data) {
    let router = new express.Router(),
        controllers = require('../controllers')(data);

    router
        .get('/stories', controllers.getStoriesPage)
        .get('/add-story', controllers.getAddStoryPage)
        .post('/add-story', controllers.addStory)
        .get('/stories/:id', controllers.getSingleStoryPage)
        .post('/stories/:id/like-or-dislike', controllers.likeOrDislikeStory)
        .post('/stories/:id/delete-story', controllers.deleteStory);

    app.use(router);
};