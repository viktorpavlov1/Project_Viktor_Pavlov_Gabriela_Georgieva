/* globals require module */

const express = require('express'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

let app = express();
app.set('view engine', 'pug');
app.set('views', './server/views');
app.use('/res', express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: 'RussianStandard',
    resave: true,
    saveUninitialized: true
}));

module.exports = app;