var express = require('express');
var router = express.Router();
var mongo = require('../database/connection');
var model = require('../database/models');
var bcrypt = require('bcrypt');
var uuid = require('uuid4');

// edit recipe
router.get('/:guid', function(req, res){

  model.Recipe.findOne({ guid: req.params.guid }, function (err, data) {
    if(err) {
      console.log(err);
    }

    res.render('pages/recipe', {
      recipe: data
    });
  })
});

router.post('/', function(req, res) {
	var recipe = new model.Recipe({ guid: uuid(), title: req.body.title, user: "user", description: req.body.description, ingridients: req.body.ingridients, reviews: [] });
	recipe.save().then(function (data) {
	  res.redirect('/');
	});
})

router.post('/:guid', function(req, res) {
	model.Recipe.findOneAndUpdate({ guid: req.params.guid }, { title: req.body.title, description: req.body.description, ingridients: req.body.ingridients }, function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log('model.Recipe updated');
			res.recipes = data;
			res.redirect('/');
		}
	});
})

router.get('/:guid/delete', function(req, res) {
	model.Recipe.find({ guid: req.params.guid }).remove(function (data) {
	  res.redirect('/');
	});
})

module.exports = router;
