var express = require('express');
var app = express();
var config = require('./config');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

// Setup views
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static(config.root + '/public'));

// Register routes
require('./routes')(app);

app.listen(config.port, function () {
   console.log('Starting  ... ');
   console.log('Server listening on port ' + config.port);
});
