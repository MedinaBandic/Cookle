const express = require('express');
const router = express.Router();
const model = require('../database/models');
const uuid = require('uuid4');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicKey = fs.readFileSync('./public.pub');
const helper = require('../helpers/auth');

router.post('/login', function(req, res) {
    var token;

    model.User.findOne({ username: req.body.username }, function (err, data) {
        if (err) {
            res.json({
                message: "User does not exist"
            })
        }

        if (data) {
            helper.comparePass(req.body.password, data.password, function (isMatch) {

                if (isMatch) {
                    token = jwt.sign(data.username, publicKey);
                    res.json({
                        status: true,
                        data: {
                            username: data.username,
                            email: data.email
                        },
                        token: token
                    })
                } else {
                    res.json({
                        message: "Password is incorrect",
                        status: false
                    })
                }
            })
        }

    })

})

router.post('/signup', function (req, res) {
    var token = '123';
    helper.generatePass(req.body.password, function (password) {
        var user = new model.User({
            guid: uuid(),
            email: req.body.email,
            password: password,
            username: req.body.username
        });

        user.save(function (err, data) {
            if (err) {
                res.json({
                    message: "Usarname already exists"
                });
            } else {
                token = jwt.sign(data.username, publicKey);
                res.json({
                    status: true,
                    data: {
                        username: data.username,
                        email: data.email
                    },
                    token: token
                })
            }
        });
    });
})

router.post('/changepass', function (req, res) {
    var token = '123';

    model.User.findOne({ username: req.body.username }, function (err, data) {
        if (err) {
            res.json({
                message: "User does not exist"
            })
        }

        if (data) {
            helper.comparePass(req.body.oldPass, data.password, function (isMatch) {

                if (isMatch) {

                    helper.generatePass(req.body.newPass, function (password) {

                        model.User.findOneAndUpdate({ username: req.body.username }, { password: password }, {new: true}, function (err, data) {
                            if (err) {
                                res.json({
                                    message: "Problem with update-ing password"
                                });
                            } else {
                                // token = jwt.sign(user, app.get(publicKey), {
                                //     expiresInMinutes: 1440 // expires in 24 hours
                                // });
                                res.json({
                                    status: true,
                                    data: {
                                        username: data.username,
                                        email: data.email
                                    },
                                    token: token
                                })
                            }
                        });
                    });
                } else {
                  res.json({
                      status: false,
                      message: "Your old password is not correct"
                  });
                }
            })
        }
    })
})

module.exports = router;
