const express = require('express');
const router = express.Router();
const model = require('../database/models');
const uuid = require('uuid4');


// view recipe
router.get('/description/:guid', function(req, res){

    model.Recipe.findOne({ guid: req.params.guid }, function (err, data) {
        if(err) {
            res.json({
                message: "Someting is not ok"
            });
        }

        res.json({
            recipe: data
        });
    })
});

router.post('/description/:guid', function(req, res) {
    model.Recipe.findOneAndUpdate({ guid: req.params.guid }, {
            $push: { "reviews" : { user: "reviewUser", text: req.body.review } }
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
});

module.exports = router;
