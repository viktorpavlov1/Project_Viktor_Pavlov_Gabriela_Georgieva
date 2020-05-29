/* globals require */

'use strict';

const config = require('./server/config'),
    app = require('./server/config/express'),
    data = require('./server/data');

// connecting to mongoDb, attaching auth and routes
require('./server/config/mongoose')(config);
require('./server/config/passport')(app, data);
require('./server/routers')(app, data);

app.listen(config.port, () => console.log('Server now up and running at http://localhost:3001'));