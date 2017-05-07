var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();

app.use(function (req, res, next) {
   res.locals = {
     recipe: {},
   };
   next();
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

var index = require('./routes/index');
var auth = require('./routes/auth');
var recipe = require('./routes/recipe');
var details = require('./routes/details');
var user = require('./routes/user');

app.use('/', auth);
app.use(function(req, res, next) {
	var cookie = req.cookies.token;

	if (cookie === undefined) {
		res.redirect('login');
	} else {
		next();
	}

})

app.use('/', index);
app.use('/recipe', recipe);
app.use('/details', details);
app.use('/user', user);

var port = 3000;
app.listen(port, function() {
	console.log('Server started on port ' + port);
});
