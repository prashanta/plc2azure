var express = require('express');
var router = express.Router();

module.exports = function (app) {
    app.use('/', router);
};

// Root
router.get('/', function(req, res) {
    var list = ["item1", "item2", "item3"];
    res.json(list);
});
