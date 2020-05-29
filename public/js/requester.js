/* globals $ */

var requester = (function () {
    return {
        get(url) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: url,
                    method: 'GET'
                })
                    .done(resolve)
                    .fail(reject);
            });
        },
        getJSON(url, headers = {}) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: url,
                    method: 'GET',
                    contentType: 'application/json',
                    headers: headers
                })
                    .done(resolve)
                    .fail(reject);
            });
        },
        postJSON(url, body, headers = {}) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: url,
                    method: 'POST',
                    contentType: 'application/json',
                    headers: headers,
                    data: JSON.stringify(body)
                })
                    .done(resolve)
                    .fail(reject);
            });
        },
        putJSON(url, body, headers = {}) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: url,
                    method: 'PUT',
                    contentType: 'application/json',
                    headers: headers,
                    data: JSON.stringify(body)
                })
                    .done(resolve)
                    .fail(reject);
            });
        }
    };
}());