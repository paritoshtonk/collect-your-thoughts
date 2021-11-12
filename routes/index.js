var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("Testing");
    res.json({ message: "Testing Success" });;
    //res.render('index', { title: 'Express is the best' });
});

module.exports = router;