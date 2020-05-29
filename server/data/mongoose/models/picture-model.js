/* globals require module */

'use strict';

const mongoose = require('mongoose');

let pictureSchema = function () {
    let Schema = mongoose.Schema;

    let pictureSchemaToReturn = new Schema({
        src: { type: String, required: true}
    });

    return pictureSchemaToReturn;
};

module.exports.PictureSchema =  pictureSchema;
