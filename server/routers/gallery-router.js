/* globals module require */

'use strict';

const express = require('express');

module.exports = function (app, data) {
    let router = new express.Router(),
        controllers = require('../controllers')(data);

    router
        .get('/gallery', controllers.getGalleryPage)
        .get('/add-photo', controllers.getAddGalleryPhotoPage)
        .post('/add-photo', controllers.addGalleryPhoto)
        .get('/photo/:id', controllers.getSinglePhotoPage)
        .post('/photo/:id/post-comment', controllers.postGalleryPhotoComment)
        .post('/photo/:id/delete-comment/:commentId', controllers.deleteGalleryPhotoComment)
        .post('/delete-photo/:id', controllers.deleteGalleryPhoto)
        .post('/photo/:id/like-or-dislike', controllers.likeOrDislikePhoto);

    app.use(router);
};