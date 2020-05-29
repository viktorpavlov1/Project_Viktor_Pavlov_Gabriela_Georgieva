/**
 * Created by admin on 1.12.2016 г..
 */
/* globals module Promise*/

'use strict';

module.exports = (models) => {
    var CommentModel = models.CommentModel;
    var GalleryImage = models.GalleryImage;
    var EventModel = models.EventModel;

    return {
        commentCreate(author, body, date, hidden = false, meta){
            var commentObject = {
                author: author,
                body: body,
                date: date,
                hidden: hidden ,
                meta: meta
            };

            return new Promise((resolve, reject) => {
                try {
                    var comment = new CommentModel(commentObject);
                    return resolve(comment);
                }
                catch (error) {
                    return reject(error);
                }
            });
        },

        // TODO do not use this function ;) Check for usage later
        commentCreateAndSave(author, body, date, hidden = false){
            return new Promise(function (resolve, reject) {
                commentCreate(author, body, date, hidden)
                    .then((comment)=>{
                        comment.save(function (error, result) {
                            if(error){
                                return reject(error);
                            }

                            return resolve(result);
                        })
                    })
                    .catch((error) => {
                        return reject(error);
                    });
            });
        },

        commentAddToEvent(event, comment) {
            event.comments.push(comment);

            return new Promise((resolve, reject) => {
                event.save(function (error, result) {
                    if (error) {
                        return reject(error);
                    }

                    return resolve(result);
                });
            });
        },

        commentFindById(commentId) {
            return new Promise((resolve, reject) => {
                CommentModel.findOne({ _id: commentId }, (error, comment) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log('Single comment in with _id ' + commentId + ' is found.');

                    return resolve(comment);
                });
            });
        },

        deleteSingleComment(eventId, commentId) {
            return new Promise((resolve, reject) => {
                EventModel
                    .findOne()
                    .where('_id').equals(eventId)
                    .exec(function (error, event) {
                        if (error) {
                            return reject(error);
                        }

                        var comment = event.comments.id(commentId);
                        comment.hidden = true;

                        event.save((error, dbEvent) => {
                            if (error) {
                                console.log(error);
                                return reject(error);
                            }

                            return resolve(dbEvent);
                        });
                    })
                });
        },

        getLatestPicturesByCategory(categoryName, picturesCount) {

            return new Promise((resolve, reject) => {

                var categoryNameCapitalised = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

                // TODO refactor later if time
                if(categoryNameCapitalised === '' || categoryNameCapitalised == undefined){
                    GalleryImage
                        .find()
                        .limit(picturesCount)
                        .sort({ 'createdOn': -1 })
                        .exec(function (error, pictures) {
                            if(error){
                                return reject(error);
                            }

                            return resolve(pictures);
                        });
                } else {
                    GalleryImage
                        .find()
                        .where('category').equals(categoryNameCapitalised)
                        .limit(picturesCount)
                        .sort({ 'createdOn': -1 })
                        .exec(function (error, pictures) {
                            if(error){
                                return reject(error);
                            }

                            return resolve(pictures);
                        });
                }


            });


            return new Promise((resolve, reject) => {
                GalleryImage.find({ _id: commentId }, (error, comment) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log('Single comment in with _id ' + commentId + ' is found.');

                    return resolve(comment);
                });
            });
        }
    };
};