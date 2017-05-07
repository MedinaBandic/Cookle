var express = require('express');
var router = express.Router();
var mongo = require('../database/connection');
var model = require('../database/models');
var bcrypt = require('bcrypt');
var uuid = require('uuid4');

const saltRounds = 10;

// edit recipe
router.get('/', function(req, res){

  res.render('pages/user', {
    user: req.cookies.user
  });
});

router.post('/', function(req, res) {

  model.User.findOne({guid: req.cookies.user.guid}, function(err, data) {
		if (err) {
      console.log(err)
    } else {
      console.log(data);
      bcrypt.compare(req.body.oldpass, data.password, function(err, dt) {
  			if (dt) {
          bcrypt.genSalt(saltRounds, function(err, salt) {
              bcrypt.hash(req.body.newpass, salt, function(err, hash) {
                model.User.findOneAndUpdate({ guid: req.cookies.user.guid }, { username: req.body.username, password: hash }, function (err, data) {
              		if (err) {
              			console.log(err);
              		} else {
              			console.log('User updated');
                    var randomNumber = Math.random().toString();
                    randomNumber = randomNumber.substring(2, randomNumber.length);
                    res.cookie('token', randomNumber, { maxAge: 900000, httpOnly: true });
                    res.cookie('user', { username: data.username, guid: data.guid }, { maxAge: 900000, httpOnly: true });
                    console.log('cookie created successfully');
              			res.redirect('/');
              		}
              	});
              });
          });
  			}
  		});
    }
	})

})

module.exports = router;
