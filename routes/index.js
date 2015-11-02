var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    /*
    res.render('index', {
        title: 'Express'
    });*/
    if (Object.keys(req.cookies).length !== 0) {
        res.redirect('/users/login');
    } else {
        res.redirect('/login.html ');
    }
});









module.exports = router;