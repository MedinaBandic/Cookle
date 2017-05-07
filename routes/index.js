var express = require('express');
var mongo = require('../database/connection');
var model = require('../database/models');
var router = express.Router();

var recipes = [];

router.get('/', function(req, res) {

	model.Recipe.find({}, function (err, data) {
		if(err) {
			console.log(err);
		}

		recipes = data;
		res.recipes = recipes[0];

		res.render('pages/index', {
			recipes: recipes
		});
	})
});

module.exports = router;
