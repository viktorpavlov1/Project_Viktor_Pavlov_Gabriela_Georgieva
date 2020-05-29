/**
 * Created by admin on 1.12.2016 г..
 */
/* globals module require */

'use strict';

const express = require('express');

module.exports = function (app, data) {
    let router = new express.Router();
    let eventsController = require('../controllers/events-controller')(data);

    router
        .get('/events/', eventsController.getEventsPage)
        .get('/events/add-event', eventsController.getCreateEventPage )
        .get('/events/add-event/:categoryName', eventsController.getCreateEventPage )
        .post('/events/add-event/:categoryName', eventsController.createEvent )
        .post('/comments/post-comment-to-event/:id', eventsController.createCommentToEventButtonAction )
        .post('/comments/:commentId/delete-comment/:eventId', eventsController.deleteCommentButtonAction )
        .get('/events/:category', eventsController.getEventsPage)
        .get('/events/:category/:id', eventsController.getEventsPage)
        .get('/events/:category/sure-participate/:id', eventsController.getIncreaseParticipatingInEventButtonAction)
        .get('/events/:category/interested/:id', eventsController.getIncreaseInterestedInEventButtonAction)
        .get('/events/:category/:id', eventsController.getIncreaseInterestedInEventButtonAction);

    app.use(router);
};