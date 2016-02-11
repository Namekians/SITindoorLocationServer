var express = require('express');
var router = express.Router();
var DAO = require('../DAO');
var path = require("path");

var fs = require('fs');

router.route('/login')
.all(function (req, res, next) {

	var user_name = req.body.user_name || req.cookies.user_name;
	var user_pwd = req.body.user_pwd || req.cookies.user_pwd;
	console.log('You login to the system successfully');
	// Database operation here to see the user name and pwd matches or not
	var query = {
		user_name : user_name
	};

	DAO.quickFind('users', query, function (docs) {
		if (docs.length > 0 && user_pwd == docs[0].user_pwd) {
			console.log('login successfully')
			res.cookie('user_name', user_name);
			res.cookie('user_pwd', user_pwd)
			res.redirect("/main.html");
		} else {
			res.redirect('/login.html ');
		}
	})
});

router.route('/upload')
.post(function (req, res, next) {
	var file = path.resolve('G:/Github_Projects/SITindoorLocationService/Server/public/resources/1004418', 'upload.html');
	console.log('file path: '+file);
	fs.stat(file, function (err, stats) {
		if (err==null) {
			fs.unlink(file, function (err) {
				if (err) {
					return console.error(err);
				}
				console.log("File deleted successfully!");
			});
		}

		console.log(req.body);
		fs.writeFile(file, JSON.stringify(req.body), function (err) {
			if (err) {
				return console.log(err);
			}

			console.log("The file was saved!");
		});

		res.send("saved")

	})
});

module.exports = router;
