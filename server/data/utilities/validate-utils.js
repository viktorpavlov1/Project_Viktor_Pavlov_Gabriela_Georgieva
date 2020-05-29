/**
 * Created by admin on 3.12.2016 г..
 */
/* globals module Promise*/

'use strict';

var validateCategoryName = function(category) {
    const defaultCategory = 'ski';

    var _category = defaultCategory;

    if((category == undefined) || (category == null)){

        return _category;
    }
    if(!(category === '')){
        _category = category;
    }

    return _category;
};

var validatePictureObject = function(pictureObj, req) {

    // http://localhost:3001/res/images/default-image.png
    const defaultPicture = { src: 'http://' + req.headers.host + '/res/images/default-image.png' };
    var _picture = defaultPicture;

    if((pictureObj == undefined) || (pictureObj == null)){

        return _picture;
    }
    if(!pictureObj.hasOwnProperty('src')){

        return _picture;
    }
    if(!(pictureObj.src === '')){
        _picture.src = pictureObj.src;
    }

    return _picture;
};

var isValidCommentBodyString = function(commentBody) {

    if((commentBody == undefined) || (commentBody == null)){

        return Promise.resolve(false);
    }
    if(!(commentBody === '')){

        return Promise.resolve(false);
    }
    if(!(commentBody.length() > 200)){

        return Promise.resolve(false);
    }

    return Promise.resolve(true);
};

module.exports.validate = {
    categoryName: validateCategoryName,
    pictureObject: validatePictureObject,
    isValidCommentBodyString: isValidCommentBodyString
};

