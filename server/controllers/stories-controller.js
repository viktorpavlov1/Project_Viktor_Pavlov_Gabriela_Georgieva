/* globals module require */

'use strict';

const characterEscaper = require('../utils/character-escaper');

module.exports = (data) => {
    return {
        getStoriesPage(req, res) {
            const page = +req.query.page || 1,
                pageSize = 8;

            data.getStoriesByPage(page)
                .then(storiesObj => {
                    let totalPagesCount = Math.ceil(storiesObj.count / pageSize);
                    res.render('stories/stories-main', { stories: storiesObj.stories, page, totalPagesCount, user: req.user });
                })
                .catch((err) => {
                    res.render('error-page', { user: req.user });
                    res.status(500).send(err);
                });
        },
        getAddStoryPage(req, res) {
            if (!req.isAuthenticated()) {
                res.render('auth-not-authorised-page');
            }

            res.render('stories/add-story', { user: req.user });
        },
        addStory(req, res) {
            if (!req.isAuthenticated()) {
                res.render('auth-not-authorised-page');
            }

            Object.keys(req.body)
                .forEach(key => {
                    req.body[key] = characterEscaper(req.body[key]);
                });

            data.addStory(req.user.username, req.body.title, req.body.body, req.body.category, req.body.picture)
                .then(success => {
                    let story = {
                        pictureUrl: req.body.picture,
                        title: req.body.title,                        
                        date: success.createdOn,
                        category: success.category,
                        _id: success._id
                    };

                    let query = {
                        addedStories: req.user.addedStories || []
                    };

                    query.addedStories.push(story);
                    data.updateUserInfo(req.user, query);

                    return res.status(201).json(success);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
        },
        getSingleStoryPage(req, res) {
            let storyId = req.params.id;

            data.getStoryById(storyId)
                .then((story) => {
                    if (!story) {
                        res.status(404);
                        res.render('page-not-found', { user: req.user });
                        return;
                    }

                    res.render('stories/single-story', { user: req.user, story });
                })
                .catch((err) => {
                    console.log(err);

                    res.status(404);
                    res.render('page-not-found', { user: req.user });
                });
        },
        likeOrDislikeStory(req, res) {
            if (!req.isAuthenticated()) {
                res.render('auth-not-authorised-page', { user: req.user });
            }

            data.likeOrDislikeStory(req.params.id, req.user)
                .then(() => {
                    res.redirect('/stories/' + req.params.id);
                });
        },
        deleteStory(req, res) {
            if (!req.isAuthenticated()) {
                res.render('auth-not-authorised-page', { user: req.user });
                return;
            }

            let storyId = req.params.id;
            
            data.deleteStory(storyId)
                .then(() => {
                    res.redirect('/stories');
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('/stories');
                });
        }
    };
};