/* globals require module */

'use strict';

const mongoose = require('mongoose'),
    commentSchema = require('./comment-model').CommentSchema(),    
    constants = require('../../../common/constants'),
    Schema = mongoose.Schema;

let schema = new Schema({
    title: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    hidden: {
        type: String,
        default: false
    },
    body: {
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
    pictureUrl: String,
    comments: [commentSchema],
    likes: [String]
});

mongoose.model('story', schema);
let Story = mongoose.model('story');

module.exports.Story = Story;