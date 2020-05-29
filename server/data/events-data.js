/**
 * Created by admin on 1.12.2016 г..
 */
/* globals module Promise*/

'use strict';

const validate  = require('./utilities').validate;
const updateUserInfoFromData = require('./users-data');

module.exports = (models) => {
    var EventModel = models.EventModel;

    return {
        createAndSaveEvent(title, category, picture, author, body, date, hidden = false, req){

            var _category = validate.categoryName(category);
            var _picture = validate.pictureObject(picture, req);

            var eventObject = {
                title: title,
                category: _category,
                pictures: [_picture],
                author: author,
                body: body,
                date: date,
                hidden: hidden
            };
            var event = new EventModel(eventObject);

            return new Promise(function (resolve, reject) {
                event.save(function (error, dbEvent) {
                    if(error){
                        return reject(error);
                    }

                    return resolve(dbEvent);
                });
            });
        },

        putEventInUsersEvents(event, user, updateUserInfoFunction) {

            let eventToAdd = {
                _id: event._id,
                category: event.category,
                date: event.date,
                photo: event.pictures[0].src,
                title: event.title
            };

            let query = {
                addedEvents: user.addedEvents || []
            };
            query.addedEvents.push(eventToAdd);

            return new Promise(function (resolve, reject) {
                updateUserInfoFunction (user, query)
                    .then((userRes)=>{
                        return resolve(userRes);
                    })
                    .catch((error) => {
                        return reject(error);
                    });
            });
        },

        addUsernameToEventPropertyArray(event, username, propertyArrayName) {

            var valueIsContained = (event[propertyArrayName].indexOf(username) > -1);
            if(!valueIsContained){
                event[propertyArrayName].push(username);
            }

            return new Promise(function (resolve, reject) {
                if(!valueIsContained){
                    event.save((error, result) => {
                        if (error) {
                            return reject(error);
                        }

                        return resolve(result);
                    });
                } else {

                    return resolve(event);
                }
            });
        },

        createCommentAndAddToEvent(event, data, author, commentBody, nowDt, commentIsHidden, meta){

            return new Promise(function (resolve, reject) {
                validate.isValidCommentBodyString(commentBody)
                    .then(() => {
                        return data.commentCreate(author.username, commentBody, nowDt, commentIsHidden, meta)
                    })
                    .then((comment)=>{
                        return data.commentAddToEvent(event, comment);
                    })
                    .then((dbEventUpdated)=>{
                        return resolve (dbEventUpdated);
                    })
                    .catch((error) => {
                        return reject(error);
                    });
            });
        },

        getAllEvents(){
            return new Promise(function (resolve, reject) {
                EventModel
                    .find()
                    .limit(300)
                    .sort('-date')
                    .exec(function (error, events) {
                        if(error){
                            return reject(error);
                        }

                        return resolve(events);
                    });
            });
        },

        getEventByCategoryName(categoryName) {
            return new Promise((resolve, reject) => {
                EventModel
                    .find()
                    .where('category').equals(categoryName)
                    .limit(300)
                    .sort('-date')
                    .exec(function (error, events) {
                        if(error){
                            return reject(error);
                        }

                        return resolve(events);
                    });
            });
        },

        getEventByCategoryAndId(categoryName, eventId) {
            return new Promise((resolve, reject) => {
                EventModel
                    .findOne()
                    .where('_id').equals(eventId)
                    .where('category').equals(categoryName)
                    .limit(300)
                    .sort('-date')
                    .exec(function (error, events) {
                        if(error){
                            return reject(error);
                        }

                        return resolve(events);
                    });
            });
        },

        getEventById(eventId) {
            return new Promise((resolve, reject) => {
                EventModel
                    .findOne()
                    .where('_id').equals(eventId)
                    .exec(function (error, events) {
                        if(error){
                            return reject(error);
                        }

                        return resolve(events);
                    });
            });
        }
    };
};