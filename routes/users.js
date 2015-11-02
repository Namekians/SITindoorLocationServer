var express = require('express');
var router = express.Router();

router.route('/login')
    .all(function (req, res, next) {

        var user_name = req.body.user_name || req.cookies.user_name;
        var user_pwd = req.body.user_pwd || req.cookies.user_pwd;
        console.log('You login to the system successfully');
        // Database operation here to see the user name and pwd matches or not

        if (user_name === 'vesendor@gmail.com' && user_pwd === 'ibeacon') {
            res.cookie('user_name', user_name);
            res.cookie('user_pwd', user_pwd)
            res.redirect("/main.html");
        }
    });

module.exports = router;