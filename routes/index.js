var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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

router.route('/test')
    .all(function(req, res) {

        var test = [{
            content: 'this is a test message',
            sender: 'Siri'
        }, {
            content: 'this is a test message2',
            sender: 'Siri2'
        }, {
            content: 'this is a test message3',
            sender: 'Siri3'
        }];
        res.send(JSON.stringify(test.map(function(o) {
            o.date = Date.now();
            return o;
        })));


    });



router.route('/test2')
    .all(function(req, res) {

        var test = '234e32w424324';
        res.send(JSON.stringify(test));


    });









module.exports = router;
