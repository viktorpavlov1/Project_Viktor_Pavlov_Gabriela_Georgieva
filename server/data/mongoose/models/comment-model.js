/* globals require module */

'use strict';

const mongoose = require('mongoose');

let commentSchema = function () {
    let Schema = mongoose.Schema;

    let commentSchemaToReturn = new Schema({
        author: { type: String, required: true },
        body: { type: String, required: true },
        date: { type: Date, default: Date.now },
        hidden: { type: Boolean },
        meta: {
            like: Number
        }
    });

    return commentSchemaToReturn;
};

let commentModel = function () {
    let cS = commentSchema();
    let commentModelToReturn = mongoose.model('Comment', cS);

    return commentModelToReturn;
};

module.exports.CommentSchema = commentSchema;
module.exports.CommentModel = commentModel();
