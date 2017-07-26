const child_process = require('child_process');

child_process.fork('node_modules/.bin/nodemon', ['api/app.js'])
