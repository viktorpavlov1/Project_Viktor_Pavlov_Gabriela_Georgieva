/* globals module */

'use strict';

module.exports = (models) => {
    let Story = models.Story;

    function updateUserInfo(story) { 
        models.UserModel.findOne({username: story.author}, (err, user) => {
            for(let i = 0; i < user.addedStories.length; i += 1) {
                let storyId = String(story._id);
                let arrayStoryId = String(user.addedStories[i]._id);
                if (arrayStoryId == storyId) {
                    user.addedStories.splice(i, 1);
                    break;
                }
            }

            user.save();
        });
    }

    return {
        addStory(author, title, body, category, pictureUrl) {
            let story = new Story({
                author,
                title,
                body,
                category,
                pictureUrl
            });

            return new Promise((resolve, reject) => {
                story.save((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        getAllStories() {
            return new Promise((resolve, reject) => {
                Story.find((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        getStoriesByPage(page) {
            page = page || 1;
            const pageSize = 8;

            return new Promise((resolve, reject) => {
                Story.find({ hidden: false })
                    .skip((page - 1) * pageSize)
                    .sort({ 'createdOn': -1 })
                    .limit(pageSize)
                    .exec((err, res) => {
                        if (err) {
                            return reject(err);
                        }

                        Story.count({ hidden: false }, (err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            let result = {
                                stories: res,
                                count
                            };

                            return resolve(result);
                        });
                    });
            });
        },
        getStoryById(storyId) {
            return new Promise((resolve, reject) => {
                Story.findOne({ _id: storyId, hidden: false }, (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        },
        likeOrDislikeStory(storyId, user) {
            return new Promise((resolve, reject) => {
                Story.findOne({ _id: storyId }, (error, story) => {
                    if (error) {
                        return reject(error);
                    }

                    if (!story.likes.includes(user.username)) {
                        story.likes.push(user.username);
                    }
                    else {
                        let index = story.likes.indexOf(user.username);
                        story.likes.splice(index, 1);
                    }

                    story.save((err, res) => {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }

                        return resolve(res);
                    });
                });
            });
        },
        deleteStory(storyId) {
            return new Promise((resolve, reject) => {
                Story.findOne({ _id: storyId }, (err, story) => {
                    story.hidden = true;
                    story.save((error, res) => {
                        if (error) {
                            return reject(error);
                        }
                        
                        updateUserInfo(story);
                        return resolve(res);
                    });
                });
            });
        }
    };
};