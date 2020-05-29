/* globals module */

'use strict';

module.exports = (string) => {
    return string
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;')
        .replace(/'/g, '&quot;')
        .replace(/'/g, '&#039;');
};