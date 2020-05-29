/* globals module require */

'use strict';

const characterEscaper = require('../utils/character-escaper');

module.exports = (data) => {
    return {
        getGalleryPage(req, res) {
            const page = +req.query.page || 1;
            let totalPagesCount;
            let pageSize = 12;

            data.getGalleryImagesByPage(page)
                .then(photosObj => {
                    totalPagesCount = Math.ceil(photosObj.count / pageSize);
                    res.render('gallery/gallery', { galleryImages: photosObj.photos, page, totalPagesCount, user: req.user });
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        },
        getAddGalleryPhotoPage(req, res) {
            if (req.isAuthenticated()) {
                res.render('gallery/add-photo', { user: req.user });
            }
            else {
                res.render('auth-not-authorised-page', { user: req.user });
            }
        },
        addGalleryPhoto(req, res) {
            Object.keys(req.body)
                .forEach(key => {
                    req.body[key] = characterEscaper(req.body[key]);
                });

            data.addGalleryPhoto(req.body.url, req.body.title, req.user.username, req.body.category)
                .then(success => {
                    let photo = {
                        url: req.body.url,
                        title: req.body.title,
                        date: success.createdOn,
                        category: success.category,
                        _id: success._id
                    };

                    let query = {
                        addedPhotos: req.user.addedPhotos || []
                    };

                    query.addedPhotos.push(photo);
                    data.updateUserInfo(req.user, query);

                    res.status(201).json(success);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        },
        deleteGalleryPhoto(req, res) {
            if (!req.isAuthenticated()) {
                res.render('auth-not-authorised-page');
                return;
            }
            
            let photoId = req.params.id;
            
            data.deleteGalleryPhoto(photoId)
                .then(() => {
                    res.redirect('/gallery');
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('/gallery');
                });
        },
        getSinglePhotoPage(req, res) {
            let imageId = req.params.id;

            data.getGalleryPhotoById(imageId)
                .then((image) => {
                    if (!image) {
                        res.status(404);
                        res.render('page-not-found');
                        return;
                    }

                    res.render('gallery/single-photo-page', { user: req.user, image });
                })
                .catch((err) => {
                    console.log(err);

                    res.status(404);
                    res.render('page-not-found');
                });
        },
        postGalleryPhotoComment(req, res) {
            if (!req.isAuthenticated()) {
                res.render('auth-not-authorised-page');
                return;
            }

            let imageId = req.params.id;

            if (!req.body.comment.trim() || req.body.comment.length > 100) {
                res.redirect('/photo/' + imageId);
                return;
            }

            data.postGalleryPhotoComment(imageId, req.user.username, req.body.comment)
                .then(() => {
                    res.redirect('/photo/' + imageId);
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('/photo/' + imageId);
                });
        },
        deleteGalleryPhotoComment(req, res) {
            if (!req.isAuthenticated()) {
                res.render('auth-not-authorised-page');
                return;
            }

            let imageId = req.params.id,
                commentId = req.params.commentId;

            data.deleteGalleryPhotoComment(imageId, commentId)
                .then(() => {
                    res.redirect('/photo/' + imageId);
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('/photo/' + imageId);
                });
        },
        likeOrDislikePhoto(req, res) {
            if (!req.isAuthenticated()) {
                res.render('auth-not-authorised-page', { user: req.user });
            }

            data.likeOrDislikePhoto(req.params.id, req.user)
                .then(() => {
                    res.redirect('/photo/' + req.params.id);
                });
        }
    };
};