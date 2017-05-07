var express = require('express');
var router = express.Router();
var mongo = require('../database/connection');
var model = require('../database/models');
var bcrypt = require('bcrypt');
var uuid = require('uuid4');


// view recipe
router.get('/:guid', function(req, res){

  model.Recipe.findOne({ guid: req.params.guid }, function (err, data) {
    if(err) {
      console.log(err);
    }

    res.render('pages/details', {
      recipe: data
    });
  })
});

router.post('/:guid', function(req, res) {
	console.log("REVIEW")
	model.Recipe.findOneAndUpdate({ guid: req.params.guid }, { $push: { "reviews" : { user: "reviewUser", text: req.body.review } } }, {new: true}, function(err, doc){
	    if(err){
	        console.log("Something wrong when updating data!");
	    }

	    console.log(doc);
			res.redirect('/details/' + req.params.guid);
	});
})

module.exports = router;
