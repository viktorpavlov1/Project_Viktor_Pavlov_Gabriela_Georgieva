/* globals module */

'use strict';

module.exports = (data) => {
    return {
        getSearchResults(req, res) {
            let query = req.body.query;

            data.getAllEvents()
                .then((events) => {
                    let targetEvents = [];

                    events.forEach(event => {
                        if (event.title.indexOf(query) > 0 || event.body.indexOf(query) > 0) {
                            targetEvents.push(event);
                        }
                    });

                    res.render('search/search', { user: req.user, query, results: targetEvents});
                });     
        }
    };
};