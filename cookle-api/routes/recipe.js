const express = require('express');
const router = express.Router();
const model = require('../database/models');
const uuid = require('uuid4');
const jwt = require('express-jwt');

router.get('/recipe', function(req, res){

    model.Recipe.find({}, function (err, data) {
        if(err) {
            res.json({
                message: "Something is not ok"
            });
        }

        res.json({
            data: data
        });
    })
});

router.get('/recipe/:guid', function(req, res){

    model.Recipe.findOne({ guid: req.params.guid }, function (err, data) {
        if(err) {
            res.json({
                message: "Something is not ok"
            });
        }

        res.json({
            data: data
        });
    })
});

router.post('/recipe', function(req, res) {
    var recipe = new model.Recipe({
        guid: uuid(),
        title: req.body.title,
        user: req.body.user,
        description: req.body.description,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: req.body.image,
        video: req.body.video,
        reviews: []
    });
    recipe.save(function (err, data) {
        if (err) {
            res.json({
                message: "something is not ok"
            })
        }

        res.json({
            status: true,
            data: data
        })
    });
});

router.put('/recipe/:guid', function(req, res) {
    model.Recipe.findOneAndUpdate({ guid: req.params.guid }, {
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        image: req.body.image,
        video: req.body.video
    }, function (err, data) {
        if (err) {
            res.json({
                message: "something went wrong"
            })
        } else {
            res.json({
                data: data
            })
        }
    });
})

router.put('/recipe/:guid/review', function(req, res) {

    model.Recipe.findOne({ guid: req.params.guid }, function (err, data) {
        if(err) {
            res.json({
                message: "Something is not ok"
            });
        }

        var total = 0;
        var rated = 0;
        data.reviews.forEach(function (item) {
            if (item.rating !== undefined) {
                total += item.rating;
                rated++;
            }
        })
        total += req.body.rating;
        rated++;
        total = total / rated;

        model.Recipe.findOneAndUpdate({ guid: req.params.guid }, {
                rating: total,
                $push: { "reviews" : { user: req.body.user, text: req.body.review, rating: req.body.rating } }
            },
            {new: true},
            function (err, data){
                if(err){
                    console.log("Something wrong when updating data!");
                }

                res.json({
                    data: data
                });
            });
    })


});

router.delete('/recipe/:guid', function(req, res) {
    model.Recipe.find({ guid: req.params.guid }).remove(function (data) {
        res.json({
            status: true
        })
    });
})

// router.get('/protected', jwt({secret: 'shhhhhhared-secret'}), function(req, res) {
//     if (!req.user.admin) return res.sendStatus(401);
//     res.sendStatus(200);
// });

module.exports = router;
