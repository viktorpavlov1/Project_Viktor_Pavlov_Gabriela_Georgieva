/**
 * Created by admin on 1.12.2016 г..
 */
/* globals require module String Date Boolean*/
"use strict";

const mongoose = require('mongoose'),
    userSchema = require('./user-model').UserSchema,
    pictureSchema = require('./picture-model').PictureSchema,
    commentSchema = require('./comment-model').CommentSchema;


// TODO extract function to other file
var validateTitle = function (title) {
    title = '' + title;
    var isValidTitle = (title.length > 1) && (title.length < 200);
    if(!isValidTitle){
        return false;
    }

    return true;
};

var validateCategory = function (category) {
    category = '' + category.toLowerCase();
    var isValidCategory = (category === 'ski' || category === 'bike' || category === 'snowboard');
    if(!isValidCategory){
        return false;
    }

    return true;
};

var eventSchema = function () {
    var Schema = mongoose.Schema;

    //TODO put all validations here
    var titleValidation = [validateTitle, 'Title length is out of range!'];
    var categoryValidation = [validateCategory, 'Category is not valid!'];

    let UserSchema = userSchema();
    let PictureSchema = pictureSchema();
    let CommentSchema = commentSchema();

    let eventSchemaToReturn = new Schema({
        title: { type: String, required: true, validate: titleValidation },
        category: { type: String, required: true, validate: categoryValidation },
        pictures: {
            type: [PictureSchema],
            index: false,
            unique: false
        },
        author: {
            type: UserSchema,
            index: false,
            unique: false
        },
        body: { type: String, required: true },
        date: { type: Date, default: Date.now },
        createdOn: { type: Date },
        comments: {
            type: [CommentSchema],
            index: false,
            unique: false
        },
        hidden: {type: Boolean },
        interestedIn: [{type: String}],
        participatingIn: [{type: String}],
        meta: {
            seen: Number
        }
    });

    eventSchemaToReturn.method({
        hideUnhide: function() {
            if (this.hidden) {
                this.hidden = false;
            }
            else {
                this.hidden = true;
            }
        }
    });

    return eventSchemaToReturn
};

var eventModel = function () {
    var eS = eventSchema();
    var eventModelToReturn = mongoose.model('Event', eS);

    return eventModelToReturn;
};

module.exports.EventModel = eventModel();