/* globals require module */

'use strict';

const mongoose = require('mongoose'),
    commentSchema = require('./comment-model').CommentSchema(),
    constants = require('../../../common/constants'),
    Schema = mongoose.Schema;

let schema = new Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: constants.categories
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    comments: [commentSchema],
    hidden: {
        type: Boolean,
        default: false
    },
    likes: {
        type: [String]
    }
});

mongoose.model('gallery-image', schema);
let galleryImage = mongoose.model('gallery-image');

module.exports.GalleryImage = galleryImage;