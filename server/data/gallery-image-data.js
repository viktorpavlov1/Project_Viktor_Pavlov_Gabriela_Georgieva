/* globals module */

'use strict';

module.exports = (models) => {
    let GalleryImage = models.GalleryImage;

    function updateUserInfo(photo) { 
        models.UserModel.findOne({username: photo.author}, (err, user) => {
            for(let i = 0; i < user.addedPhotos.length; i += 1) {
                let photoId = String(photo._id);
                let arrayPhotoId = String(user.addedPhotos[i]._id);
                if (arrayPhotoId == photoId) {
                    user.addedPhotos.splice(i, 1);
                    break;
                }
            }

            user.save();
        });
    }

    return {
        getGalleryImagesByPage(page) {
            page = page || 1;
            const pageSize = 12;

            return new Promise((resolve, reject) => {
                GalleryImage.find({ hidden: false })
                    .skip((page - 1) * pageSize)
                    .sort({ 'createdOn': -1 })
                    .limit(pageSize)
                    .exec((err, res) => {
                        if (err) {
                            return reject(err);
                        }

                        GalleryImage.count({ hidden: false }, (err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            let result = {
                                photos: res,
                                count
                            };

                            return resolve(result);
                        });
                    });
            });
        },
        getAllGalleryImages() {
            return new Promise((resolve, reject) => {
                GalleryImage.find((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        addGalleryPhoto(url, title, author, category) {
            return new Promise((resolve, reject) => {
                let image = new GalleryImage({
                    url,
                    title,
                    author,
                    category
                });

                image.save((err, res) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        deleteGalleryPhoto(photoId) {
            return new Promise((resolve, reject) => {
                GalleryImage.findOne({ _id: photoId }, (err, photo) => {
                    photo.hidden = true;
                    photo.save((error, res) => {
                        if (error) {
                            return reject(error);
                        }

                        updateUserInfo(photo);
                        return resolve(res);
                    });
                });
            });
        },
        getGalleryPhotoById(id) {
            return new Promise((resolve, reject) => {
                GalleryImage.findOne({ _id: id, hidden: false }, (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        postGalleryPhotoComment(photoId, author, body) {
            return new Promise((resolve, reject) => {
                GalleryImage.findOne({ _id: photoId }, (error, photo) => {
                    if (error) {
                        return reject(error);
                    }

                    let comment = new models.CommentModel({
                        author,
                        body,
                        hidden: false
                    });

                    photo.comments.push(comment);
                    photo.save((err, res) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(res);
                    });
                });
            });
        },
        deleteGalleryPhotoComment(photoId, commentId) {
            return new Promise((resolve, reject) => {
                GalleryImage.findOne({ _id: photoId }, (error, photo) => {
                    if (error) {
                        return reject(error);
                    }

                    var comment = photo.comments.id(commentId);
                    comment.hidden = true;

                    photo.save((err, res) => {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }

                        return resolve(res);
                    });
                });
            });
        },
        likeOrDislikePhoto(photoId, user) {
            return new Promise((resolve, reject) => {
                GalleryImage.findOne({ _id: photoId }, (error, photo) => {
                    if (error) {
                        return reject(error);
                    }
                    
                    if (!photo.likes.includes(user.username)) {
                        photo.likes.push(user.username);
                    }
                    else {                        
                        let index = photo.likes.indexOf(user.username);
                        photo.likes.splice(index, 1);
                    }                    

                    photo.save((err, res) => {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }

                        return resolve(res);
                    });
                });
            });
        }
    };
};