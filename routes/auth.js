var express = require('express');
var router = express.Router();
var mongo = require('../database/connection');
var model = require('../database/models');
var bcrypt = require('bcrypt');
var uuid = require('uuid4');

const saltRounds = 10;

// logout
router.get('/logout', function(req, res){
	res.clearCookie('token');
	res.clearCookie('user');
	res.redirect('/');
});

// login
router.get('/login', function(req, res){
	res.render('pages/login');
});

router.post('/login', function(req, res){
	var cookie = req.cookies.token;
	console.log('hepek');

	model.User.findOne({email: req.body.email}, function(err, data) {
		if (err) {
			console.log('BIO JE ERROR');
			console.log(err);
			res.redirect('/');
		} else {
			if (data) {
				// bcrypt.compare(req.body.password, data.password, function(err, dt) {
				// 	if (dt) {
				if (req.body.password === data.password) {
						if (cookie === undefined) {
							// set new cookie (just anything for now)
						    var randomNumber = Math.random().toString();
						    randomNumber = randomNumber.substring(2, randomNumber.length);
								res.cookie('token', randomNumber, { maxAge: 900000, httpOnly: true });
						    res.cookie('user', { username: data.username, guid: data.guid }, { maxAge: 900000, httpOnly: true });
						    console.log('cookie created successfully');

							res.redirect('/');
						} else {
							// maybe we should remove token
							res.redirect('/');
						}
					} else {
						console.log('Credentials are invalid');
						res.redirect('login');
					}
				// });
			} else {
				res.redirect('login');
			}
		}
	})
});

// signup
router.get('/signup', function(req, res){
	res.render('pages/signup');
});

router.post('/signup', function(req, res){
	bcrypt.genSalt(saltRounds, function(err, salt) {
	    bcrypt.hash(req.body.password, salt, function(err, hash) {
				/// NOTE: USER'S PASSWORD IS SAVED WITHOUT BCRYPT
        var cookle = new model.User({ guid: uuid(), email: req.body.email, password: req.body.password, username: req.body.username, phone: req.body.phone });
				cookle.save(function (err, data) {
				  if (err) {
				    console.log(err);
				  } else {
				    console.log('new user created');
					res.redirect('login');
				  }
				});
	    });
	});
});

module.exports = router;
